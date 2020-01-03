import React from 'react'
import { NextPage } from 'next'
import { Button, Table } from 'semantic-ui-react'

import { Link } from '../../../server/routes'
import { campaign, web3 } from '../../../blockchain'
import { Layout } from '../../../components'

interface Props {
  address: any
  requests: any
  requestCount: any
  approversCount: any
}

// @ts-ignore
const RequestIndex: NextPage<Props> = ({ address, requests, requestCount, approversCount }) => {
  const renderRows = () => {
    // @ts-ignore
    return requests.map((request: any, index: any) => <div key={index}>Replace me</div>)
  }

  return (
    <Layout title={`Request ${address}`}>
      <h3>Requests</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Recipient</Table.HeaderCell>
            <Table.HeaderCell>Approval Count</Table.HeaderCell>
            <Table.HeaderCell>Approver</Table.HeaderCell>
            <Table.HeaderCell>Finalize</Table.HeaderCell>
          </Table.Row>
          <Table.Body>{renderRows()}</Table.Body>
        </Table.Header>
        <div>Found {requestCount} requests.</div>
      </Table>
    </Layout>
  )
}

RequestIndex.getInitialProps = async props => {
  const { address } = props.query
  const currentCampaign = campaign(web3, address as string)
  const requestCount = await currentCampaign.methods.getRequestsCount().call()
  const approversCount = await currentCampaign.methods.approversCount().call()

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill(0)
      // @ts-ignore
      .map((element: any, index: any) => currentCampaign.methods.requests(index).call())
  )

  return {
    address,
    requests,
    requestCount,
    approversCount
  }
}

export default RequestIndex
