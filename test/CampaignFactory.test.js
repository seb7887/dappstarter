const CampaignFactory = artifacts.require('./CampaignFactory')

contract('CampaignFactory', accounts => {
  let factory

  beforeEach(async () => {
    factory = await CampaignFactory.deployed()
  })

  it('creates a new campaign', async () => {
    await factory.createCampaign('100', { from: accounts[0], gas: '1000000' })

    const campaigns = await factory.getDeployedCampaigns()

    assert.equal(campaigns.length, 1, 'Incorrect array length')
  })
})
