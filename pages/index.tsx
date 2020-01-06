import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { Button } from 'semantic-ui-react'

import { getFactory, web3 } from '../blockchain'
import { Layout, Campaigns } from '../components'

interface Props {
  campaigns?: any
}

const Index: NextPage<Props> = ({ campaigns }) => (
  <Layout>
    <div>
      <h3>Open Campaigns</h3>

      <Link href="/new-campaign">
        <a>
          <Button 
            floated="right"
            content="Create Campaign"
            icon="add circle"
            primary
          />
        </a>
      </Link>

      <Campaigns campaigns={campaigns} />
    </div>
  </Layout>
)

Index.getInitialProps = async () => {
  let factory

  if (typeof window !== 'undefined') {
    const res = await fetch('/api/factory')
    const { options } = await res.json()
    factory = new web3.eth.Contract(options.jsonInterface, options.address)
  } else {
    factory = await getFactory()
  }

  const campaigns = await factory.methods.getDeployedCampaigns().call()

  return { campaigns }
}

export default Index
