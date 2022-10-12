import React, { useEffect, useMemo, useRef } from 'react'
import { NextPage } from 'next'
import { useStore } from 'hooks/observe-store'
import Button from 'components/Button'
import { Gateway } from 'gateway'
import { useRouter } from 'next/router'
import AddressPhoto from 'components/AddressPhoto'
import WalletHeader from 'components/WalletLayout/Header'
import { writeFileSync } from 'fs'
import { Dialog } from 'contexts/dialog'
import Address from 'components/Address'
import { Store } from 'contexts/store'
import { storeDefaultState } from 'static/store-defaults'
import _ from 'lodash'
import Card from 'components/Card'

//TODO: add this https://www.npmjs.com/package/password-meter
const WalletSelect: NextPage = () => {
  const wallets = useStore('wallets')
  const router = useRouter()

  const handleAddWallet = () => {
    throw 'not implemented'
    Gateway.i.send('wallet', 'create_wallet', {
      name: 'test99',
      password: 'test',
      password_confirm: 'test',
      language: 'English',
      type: 'long',
    })
  }

  useEffect(() => {
    return Store.on('wallet', (currentWallet) => {
      if (currentWallet.status.code !== 0 && currentWallet.status.code !== 1) {
        Gateway.i.receive({
          event: 'show_notification',
          data: {
            message: currentWallet.status.message,
            type: 'negative',
          },
        })
      }
    })
  }, [])

  const expectWalletOpen = useMemo(
    () => () => {
      const unsub = Store.on('wallet', (walletData) => {
        if (walletData.status.code === 1) {
          return
        }
        if (walletData.status.code === 0) {
          router.push('/wallet/info')
        }
        unsub()
      })
    },
    [router],
  )

  return (
    <div className="flex flex-col w-full h-full px-5">
      <WalletHeader title="Wallet Manager">
        <Button
          btnType="primary"
          onClick={() => {
            throw 'not implemented'
            Store.resetWalletData()
            //
            expectWalletOpen()
          }}>
          Recover Wallet
        </Button>
        <Button btnType="primary" onClick={handleAddWallet}>
          Add Wallet
        </Button>
      </WalletHeader>
      <div className="flex flex-col gap-3 p-3">
        {_.isEmpty(wallets.list) && (
          <Card className={'flex items-center justify-center'}>
            No wallets are present...
          </Card>
        )}
        {wallets.list.map((wallet) => (
          <Address
            address={wallet.address}
            name={wallet.name}
            key={`wallet-${wallet.address}`}
            onClick={() => {
              if (wallet.password_protected !== false) {
                Dialog.open({
                  title: 'Password',
                  message: 'Enter wallet password to continue.',
                  prompt: { type: 'password' },
                  ok: 'ok',
                  cancel: 'cancel',
                })
                Dialog.once('settle', ({ result, value }) => {
                  if (result) {
                    Store.resetWalletData()
                    Gateway.i.send('wallet', 'open_wallet', {
                      name: wallet.name,
                      password: value,
                    })
                    expectWalletOpen()
                  }
                })
              } else {
                Store.resetWalletData()
                Gateway.i.send('wallet', 'open_wallet', {
                  name: wallet.name,
                  password: '',
                })
                expectWalletOpen()
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default WalletSelect
