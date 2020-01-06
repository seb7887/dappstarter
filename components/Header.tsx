import React from 'react'
import Link from 'next/link'
import { Menu } from 'semantic-ui-react'

export const Header: React.FC = () => (
  <Menu style={{ marginTop: '10px' }}>
    <Link href='/'>
      <a className='item'>Dappstarter</a>
    </Link>

    <Menu.Menu position="right">
      <Link href="/">
        <a className="item">Campaigns</a>
      </Link>

      <Link href="/new-campaign">
        <a className="item">+</a>
      </Link>
    </Menu.Menu>
  </Menu>
)