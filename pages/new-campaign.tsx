import React, { useState } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import { Form, Button, Input, Message, Loader } from 'semantic-ui-react'

import { web3, getFactory } from '../blockchain'
import { Layout } from '../components'

interface Props {
  factory?: any
}

const NewCampaign: NextPage<Props> = ({ factory }) => {
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

      Router.push('/')
    } catch (err) {
      setErrorMessage(err.message)
    }

    setLoading(false)
  }

  console.log(factory)

  return (
    <Layout title="New Campaign">
      <h3>Create Campaign</h3>

      {factory ? (
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
      ) : (
        <Loader />
      )}
      
    </Layout>
  )
}

NewCampaign.getInitialProps = async () => {
  let factory

  if (typeof window !== 'undefined') {
    const res = await fetch('/api/factory')
    const { options } = await res.json()
    factory = new web3.eth.Contract(options.jsonInterface, options.address)
  } else {
    factory = await getFactory()
  }

  return { factory }
}

export default NewCampaign
