import { useEffect } from 'react'
import useSWR from 'swr'
import { providers } from 'ethers'

export const handler = (provider: providers.Web3Provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (provider ? 'accounts' : null),
    async () => {
      const accounts = await provider.listAccounts()
      const account = accounts[0]

      if (!account) {
        throw new Error('Cannot retreive an account. Please refresh the browser.')
      }

      return account
    },
  )

  useEffect(() => {
    const mutator = (accounts: string[]) => mutate(accounts[0] ?? null)
    provider?.on('accountsChanged', mutator)

    return () => {
      provider?.removeListener('accountsChanged', mutator)
    }
  }, [mutate])

  return {
    data,
    mutate,
    ...rest,
  }
}
