import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, Grid, Button } from 'semantic-ui-react'

import { campaign, web3 } from '../../../blockchain'
import { Layout, ContributeForm } from '../../../components'

interface StateType {
  address: any
  minimumContribution: any
  balance: any
  requestsCount: any
  approversCount: any
  manager: any
}

const CampaignShow: NextPage = () => {
  const router = useRouter()
  const { address } = router.query
  const [state, setState] = useState<StateType>({
    address: '',
    minimumContribution: '',
    balance: '',
    requestsCount: '',
    approversCount: '',
    manager: ''
  })

  useEffect(() => {
    const load = async () => {
      const currentCampaign = campaign(web3, address as string)
      const summary = await currentCampaign.methods.getSummary().call()

      setState({
        address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
      })
    }

    load()
  }, [])

  const renderCards = () => {
    const items = [
      {
        header: state.manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: state.minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become an approver'
      },
      {
        header: state.requestsCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers'
      },
      {
        header: state.approversCount,
        meta: 'Number of Approvers',
        description:
          'Number of people who have already donated to this campaign'
      },
      {
        header: web3.utils.fromWei(state.balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this campaign has left to spend.'
      }
    ]
    return <Card.Group items={items} />
  }
  
  return (
    <Layout title={`${state.address}`}>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={state.address} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Link href='/requests/[address]' as={`/requests/${state.address}`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default CampaignShow
