import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { MetaMaskInpageProvider } from '@metamask/providers'

import { Web3Dependencies, Web3State } from 'types/hooks'
import { createDefaultState, createWeb3State } from 'utils/createState'
import { loadContract } from 'utils/loadContract'

const pageReload = () => {
  window.location.reload()
}

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
  const isLocked = !(await ethereum._metamask.isUnlocked())
  if (isLocked) {
    pageReload()
  }
}

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum.on('chainChanged', pageReload)
  ethereum.on('accountsChanged', handleAccount(ethereum))
}

const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum?.removeListener('chainChanged', pageReload)
  ethereum?.removeListener('accountsChanged', handleAccount)
}

const Web3Context = createContext<Web3State>(createDefaultState())

const Web3Provider: FC<{ children: React.ReactElement }> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState())

  useEffect(() => {
    async function initWeb3() {
      try {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as unknown as
            | ethers.providers.ExternalProvider
            | ethers.providers.JsonRpcFetchFunc,
        )
        const contract = await loadContract('NftMarket', provider)

        setGlobalListeners(window.ethereum)
        setWeb3Api(
          createWeb3State({
            ethereum: window.ethereum,
            provider,
            contract,
            isLoading: false,
          }),
        )
      } catch (e: unknown) {
        setWeb3Api((api) =>
          createWeb3State({
            ...(api as Web3Dependencies),
            isLoading: false,
          }),
        )
      }
    }

    initWeb3()
    return () => removeGlobalListeners(window.ethereum)
  }, [])

  return <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
}

export function useWeb3() {
  return useContext(Web3Context)
}

export function useHooks() {
  const { hooks } = useWeb3()
  return hooks
}

export default Web3Provider
