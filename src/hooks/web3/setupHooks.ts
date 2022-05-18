import { providers } from 'ethers'

import { handler as createAccountHook } from './useAccount'
import { handler as createNetworkHook } from './useNetwork'

export const setupHooks = (provider: providers.Web3Provider) => {
  return {
    useAccount: createAccountHook(provider),
    useNetwork: createNetworkHook(provider),
  }
}
