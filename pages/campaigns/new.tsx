import React, { useState } from 'react'
import { NextPage } from 'next'
import { Form, Button, Input, Message } from 'semantic-ui-react'

import { Router } from '../../server/routes'
import { web3, getFactory } from '../../blockchain'
import { Layout } from '../../components'

interface Props {
  factory: any
}

const CampaignNew: NextPage<Props> = ({ factory }) => {
  const [minimumContribution, setMinimum] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: any) => {
    setMinimum(e.target.value)
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    setLoading(true)
    setErrorMessage('')

    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods
        .createCampaign(minimumContribution)
        .send({ from: accounts[0] })

      Router.pushRoute('/')
    } catch (err) {
      setErrorMessage(err.message)
    }

    setLoading(false)
  }

  return (
    <Layout title="New Campaign">
      <h3>Create Campaign</h3>

      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={handleChange}
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  )
}

CampaignNew.getInitialProps = async () => {
  const factory = await getFactory()

  return { factory }
}

export default CampaignNew
