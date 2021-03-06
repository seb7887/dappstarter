import React from 'react'
import Link from 'next/link'
import { Card } from 'semantic-ui-react'

interface Props {
  campaigns: any
}

export const Campaigns: React.FC<Props> = ({ campaigns }) => {
  const items =  campaigns ? campaigns.map((address: string) => ({
    header: address,
    description: (
      <Link href='/campaign/[address]' as={`/campaign/${address}`}>
        <a>View Campaign</a>
      </Link>
    ),
    fluid: true
  })) : []
  
  return  items.length ? <Card.Group items={items} /> : <h4>No campaigns available</h4>
}