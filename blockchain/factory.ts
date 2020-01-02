import web3 from './web3'
import { getContract } from './contracts'
import CampaignFactory from '../abis/CampaignFactory.json'

export const getFactory = async () => {
  return getContract(web3, CampaignFactory)
}
