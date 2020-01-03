import React from 'react'
import { NextPage } from 'next'
import { Card, Grid, Button } from 'semantic-ui-react'

import { Link } from '../../server/routes'
import { campaign, web3 } from '../../blockchain'
import { Layout, ContributeForm } from '../../components'

interface Props {
  address: any
  minimumContribution: any
  balance: any
  requestsCount: any
  approversCount: any
  manager: any
}

const CampaignShow: NextPage<Props> = props => {
  const renderCards = () => {
    const items = [
      {
        header: props.manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: props.minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become an approver'
      },
      {
        header: props.requestsCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers'
      },
      {
        header: props.approversCount,
        meta: 'Number of Approvers',
        description:
          'Number of people who have already donated to this campaign'
      },
      {
        header: web3.utils.fromWei(props.balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this campaign has left to spend.'
      }
    ]
    return <Card.Group items={items} />
  }
  
  return (
    <Layout title={`${props.address}`}>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${props.address}/requests`}>
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

CampaignShow.getInitialProps = async props => {
  const currentCampaign = campaign(web3, props.query.address as string)
  const summary = await currentCampaign.methods.getSummary().call()

  return {
    address: props.query.address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4]
  }
}

export default CampaignShow
