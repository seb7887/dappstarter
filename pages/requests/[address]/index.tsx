import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Button, Table } from 'semantic-ui-react'

import { campaign, web3 } from '../../../blockchain'
import { Layout, RequestRow } from '../../../components'

interface StateType {
  address: any
  requests: any
  requestCount: any
  approversCount: any
}

const RequestIndex: NextPage = () => {
  const router = useRouter()
  const { address } = router.query
  const [state, setState] = useState<StateType>({
    address: '',
    requests: [],
    requestCount: '',
    approversCount: ''
  })

  useEffect(() => {
    const load = async () => {
      const currentCampaign = campaign(web3, address as string)
      const requestCount = await currentCampaign.methods.getRequestsCount().call()
      const approversCount = await currentCampaign.methods.approversCount().call()

      const requests = await Promise.all(
        Array(parseInt(requestCount))
          .fill(0)
          // @ts-ignore
          .map((element: any, index: any) => currentCampaign.methods.requests(index).call())
      )

      setState({
        address,
        requests,
        requestCount,
        approversCount
      })
    }

    load()
  }, [])
  
  const renderRows = () => {
    return state.requests.map((request: any, index: any) => (
      <RequestRow
        key={index}
        id={index}
        request={request}
        address={state.address}
        approversCount={state.approversCount}
      />
    ))
  }

  return (
    <Layout title={`Request ${state.address}`}>
      <h3>Requests</h3>
      <Link href='/requests/[address]/new' as={`/requests/${state.address}/new`}>
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
        <div>Found {state.requestCount} requests.</div>
      </Table>
    </Layout>
  )
}

export default RequestIndex
