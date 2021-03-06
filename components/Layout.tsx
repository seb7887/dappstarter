import React from 'react'
import { Container } from 'semantic-ui-react'
import Head from 'next/head'

import { Header } from './Header'

interface Props {
  title?: string
}

export const Layout: React.FC<Props> = props => (
  <Container>
    <Head>
      <title>{props.title ? `Dappstarter | ${props.title}` : 'Dappstarter'}</title>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
      />
    </Head>

    <Header />
    {props.children}
  </Container>
)
