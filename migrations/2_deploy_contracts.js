const CampaignFactory = artifacts.require('./CampaignFactory')

module.exports = function(deployer, network, accounts) {
  deployer.deploy(CampaignFactory, 100, { from: accounts[0], gas: '1000000' })
}
