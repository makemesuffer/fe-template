import { setupHooks } from 'hooks/web3/setupHooks'
import { Web3Dependencies } from 'types/hooks'

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks({ isLoading: true } as Web3Dependencies),
  }
}

export const createWeb3State = ({ ethereum, provider, contract, isLoading }: Web3Dependencies) => {
  return {
    ethereum,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ ethereum, provider, contract, isLoading }),
  }
}
