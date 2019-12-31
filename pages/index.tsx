import React from 'react'

import { Web3Container } from '../blockchain'
import { Layout } from '../components'

const Index: React.FC = () => {
  return (
    <Web3Container 
      renderLoading={() => <div>Loading...</div>}
      render={props => (
        
      )}
    >
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
      </div>
    </Layout>
    </Web3Container>
  )
}

export default Index
