import React from 'react'
import { Table, Button } from 'semantic-ui-react'

import { campaign, web3 } from '../blockchain'

interface Props {
  address: any
  id: any
  request: any
  approversCount: any
}

export const RequestRow: React.FC<Props> = props => {
  const onApprove = async () => {
    const currentCampaign = campaign(web3, props.address)
    const accounts = await web3.eth.getAccounts()
    await currentCampaign.methods.approveRequest(props.id).send({
      from: accounts[0]
    })
  }

  const onFinalize = async () => {
    const currentCampaign = campaign(web3, props.address)
    const accounts = await web3.eth.getAccounts()
    await currentCampaign.methods.finalizeRequest(props.id).send({
      from: accounts[0]
    })
  }

  const { Row, Cell } = Table
  const readyToFinalize = props.request.approvalCount > props.approversCount / 2

  return (
    <Row
      disabled={props.request.complete}
      positive={readyToFinalize && !props.request.complete}
    >
      <Cell>{props.id}</Cell>
      <Cell>{props.request.description}</Cell>
      <Cell>{web3.utils.fromWei(props.request.value, 'ether')}</Cell>
      <Cell>{props.request.recipient}</Cell>
      <Cell>
        {props.request.approvalCount}/{props.approversCount}
      </Cell>
      <Cell>
        {props.request.complete ? null : (
          <Button color="green" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {props.request.complete ? null : (
          <Button color="teal" basic onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  )
}
