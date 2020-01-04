import Web3 from 'web3'

const localProvider = process.env.NODE_ENV !== 'production' ? 
  'http://localhost:7545' : 'https://rinkeby.infura.io/v3/2e03a2df2ad44957947e21f25ce9b152' 
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
