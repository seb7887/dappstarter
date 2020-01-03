import React, { useState } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'

import { Router } from '../server/routes'
import { campaign, web3 } from '../blockchain'

interface Props {
  address: any
}

export const ContributeForm: React.FC<Props> = ({ address }) => {
  const [value, setValue] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const currentCampaign = campaign(web3, address)
    setLoading(true)
    setErrorMessage('')

    try {
      const accounts = await web3.eth.getAccounts()
      await currentCampaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      })

      Router.replaceRoute(`/campaigns/${address}`)
    } catch (err) {
      setErrorMessage(err.message)
    }

    setLoading(false)
  }

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={value}
          onChange={handleChange}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>

      <Message error header="Oops!" content={errorMessage} />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  )
}