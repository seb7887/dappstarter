import CampaignAbi from '../abis/Campaign.json'

export const campaign = (web3: any, address: string) => {
  return new web3.eth.Contract(CampaignAbi.abi, address)
}
