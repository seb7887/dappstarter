import React, { useState } from 'react'
import { NextPage } from 'next'
import { Form, Input, Message, Button } from 'semantic-ui-react'

import { Link, Router } from '../../../server/routes'
import { campaign, web3 } from '../../../blockchain'
import { Layout } from '../../../components'

interface Props {
  address: any
}

const NewRequest: NextPage<Props> = props => {
  const [value, setValue] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [recipient, setRecipient] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const currentCampaign = campaign(web3, props.address)
    setLoading(true)
    setErrorMessage('')

    try {
      const accounts = await web3.eth.getAccounts()
      await currentCampaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] })

      Router.push(`/campaigns/${props.address}/requests`)
    } catch (err) {
      setErrorMessage(err.message)
    }

    setLoading(false)
  }

  const handleChangeDescription = (e: any) => {
    setDescription(e.target.value)
  }

  const handleChangeValue = (e: any) => {
    setValue(e.target.value)
  }

  const handleChangeRecipient = (e: any) => {
    setRecipient(e.target.value)
  }

  return (
    <Layout>
      <Link route={`/campaigns/${props.address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={handleChangeDescription}
          />
        </Form.Field>

        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={handleChangeValue}
          />
        </Form.Field>

        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={handleChangeRecipient}
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading}>
          Create!
        </Button>
      </Form>
    </Layout>
  )
}

NewRequest.getInitialProps = async props => {
  const { address } = props.query

  return {
    address
  }
}

export default NewRequest
