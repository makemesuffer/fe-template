import { useHooks } from 'providers/web3Provider'

export const useAccount = () => {
  const hooks = useHooks()
  const swrRes = hooks.useAccount()

  return {
    account: swrRes,
  }
}

export const useNetwork = () => {
  const hooks = useHooks()
  const swrRes = hooks.useNetwork()

  return {
    network: swrRes,
  }
}
