const Campaign = artifacts.require('./Campaign')

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Campaign, 100, accounts[0], { gas: '1000000' })
}