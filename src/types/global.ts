import { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null
}
