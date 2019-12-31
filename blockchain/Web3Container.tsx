import React, { useEffect, useState } from 'react'

import { getContract } from './contracts'
import { getWeb3 } from './web3'
import FactoryAbi from '../abis/CampaignFactory.json'

interface Props {
  renderLoading: () => any
  render: (data: any) => any
}

export const Web3Container: React.FC<Props> = ({ render, renderLoading }) => {
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [factory, setFactory] = useState(null)

  useEffect(() => {
    const load = async () => {
      const web3: any = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const factory = await getContract(web3, FactoryAbi)

      setWeb3(web3)
      setAccounts(accounts)
      setFactory(factory)
    }

    load()
  }, [])

  return web3 && accounts
    ? render({ web3, accounts, factory })
    : renderLoading()
}
