import { SWRResponse } from 'swr'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { Contract, providers } from 'ethers'

import { Web3Hooks } from 'hooks/web3/setupHooks'
import { Nullable } from './global'

export type Web3State = {
  isLoading: boolean
  hooks: Web3Hooks
} & Nullable<Web3Dependencies>

export type Web3Dependencies = {
  provider: providers.Web3Provider
  contract: Contract
  ethereum: MetaMaskInpageProvider
  isLoading: boolean
}

export type CryptoHookFactory<D = unknown, R = unknown, P = unknown> = {
  (d: Partial<Web3Dependencies>): CryptoHandlerHook<D, R, P>
}

export type CryptoHandlerHook<D = unknown, R = unknown, P = unknown> = (
  params?: P,
) => CryptoSWRResponse<D, R>

export type CryptoSWRResponse<D = unknown, R = unknown> = SWRResponse<D> & R
