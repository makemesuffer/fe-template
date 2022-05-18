import { providers, ethers } from 'ethers'

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID as string

export const loadContract = async (name: string, provider: providers.Web3Provider) => {
  const res = await fetch(`/contracts/${name}.json`)
  const Artifact = await res.json()
  let contract = null

  // TODO: check if
  try {
    contract = new ethers.Contract(Artifact.networks[NETWORK_ID].address, Artifact.abi, provider)
  } catch {
    console.log(`Contract ${name} cannot be loaded`)
  }

  return contract
}
