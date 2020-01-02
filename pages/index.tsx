import React from 'react'
import { NextPage } from 'next'
import { Button } from 'semantic-ui-react'

import { Link } from '../server/routes'
import { getFactory } from '../blockchain'
import { Layout, Campaigns } from '../components'

interface Props {
  campaigns: any
}

const Index: NextPage<Props> = ({ campaigns }) => (
  <Layout>
    <div>
      <h3>Open Campaigns</h3>

      <Link route="/campaigns/new">
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
  const factory = await getFactory()
  const campaigns = await factory.methods.getDeployedCampaigns().call()

  return { campaigns }
}

export default Index
