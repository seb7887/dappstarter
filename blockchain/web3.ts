import Web3 from 'web3'

let { web3 } = window as any
const localProvider = process.env.PROVIDER_URL || 'http://localhost:7545'

if (typeof web3 !== 'undefined') {
  // We are in the browser and metamask is running.
  web3 = new Web3(web3.currentProvider)
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(localProvider)
  web3 = new Web3(provider)
}

export default web3
