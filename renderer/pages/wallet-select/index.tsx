import React from 'react'
import { NextPage } from 'next'
import { useStore } from 'hooks/observe-store'

const WalletSelect: NextPage = () => {
  const wallets = useStore('wallets')

  return (
    <div>
      <span>wallet stuff here</span>
      {wallets.list.map((x) => (
        <div>JSON.stringify(x)</div>
      ))}
    </div>
  )
}

export default WalletSelect
