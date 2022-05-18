import useSWR from 'swr'
import { providers } from 'ethers'

const NETWORKS = [
  {
    id: 1,
    name: 'Ethereum Main Network',
  },
  {
    id: 3,
    name: 'Ropsten Test Network',
  },
  {
    id: 4,
    name: 'Rinkeby Test Network',
  },
  {
    id: 5,
    name: 'Goerli Test Network',
  },
  {
    id: 42,
    name: 'Kovan Test Network',
  },
  {
    id: 56,
    name: 'Binance Smart Chain',
  },
  {
    id: 1337,
    name: 'Ganache',
  },
]

const targetNetwork = NETWORKS.filter(
  (network) => network.id === Number(process.env.NEXT_PUBLIC_TARGET_CHAIN_ID),
)[0]

export const handler = (provider: providers.Web3Provider) => () => {
  const { data, ...rest } = useSWR(
    () => (provider ? 'network' : null),
    async () => {
      const network = await provider.getNetwork()
      const chainId = network.chainId

      if (!chainId) {
        throw new Error('Cannot retreive network. Please refresh the browser.')
      }

      return NETWORKS.filter((network) => network.id === chainId)[0]
    },
  )

  return {
    data,
    target: targetNetwork,
    isSupported: data === targetNetwork,
    ...rest,
  }
}
