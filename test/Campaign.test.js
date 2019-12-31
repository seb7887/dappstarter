const Campaign = artifacts.require('./Campaign')

contract('Campaign', accounts => {
  let campaign

  beforeEach(async () => {
    campaign = await Campaign.deployed()
  })

  it('marks caller as campaign manager', async () => {
    const manager = await campaign.manager()
    assert.equal(accounts[0], manager)
  })

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.contribute({ from: accounts[1], value: '200' })
    const isContributor = await campaign.approvers(accounts[1])

    assert(isContributor)
  })

  it('requires a minimum contribution', async () => {
    try {
      await campaign.contribute({ from: accounts[1], value: '1' })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })

  it('allows a manager to make a payment request', async () => {
    await campaign.createRequest('Buy batteries', '100', accounts[1], {
      from: accounts[0],
      gas: '1000000'
    })
    const request = await campaign.requests(0)

    assert.equal('Buy batteries', request.description)
  })

  it('processes requests', async () => {
    await campaign.contribute({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    })
    await campaign.createRequest(
      'A',
      web3.utils.toWei('5', 'ether'),
      accounts[1],
      {
        from: accounts[0],
        gas: '1000000'
      }
    )

    await campaign.approveRequest(0, { from: accounts[0], gas: '1000000' })
    await campaign.approveRequest(0, { from: accounts[1], gas: '1000000' })
    await campaign.finalizeRequest(0, { from: accounts[0], gas: '1000000' })

    let balance = await web3.eth.getBalance(accounts[1])
    balance = web3.utils.fromWei(balance, 'ether')
    balance = parseFloat(balance)
    assert(balance > 99.98702836, 'Incorrect balance')
  })
})
