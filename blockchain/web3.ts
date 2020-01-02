import Web3 from 'web3'

const localProvider = process.env.PROVIDER_URL || 'http://localhost:7545'
let web3Instance

if (typeof window !== 'undefined') {
  const { web3 } = window as any
  // We are in the browser and metamask is running.
  web3Instance = new Web3(web3.currentProvider)
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(localProvider)
  web3Instance = new Web3(provider)
}


export default web3Instance as any
