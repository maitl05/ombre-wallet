import React, { useEffect, useMemo, useRef, useState } from 'react'
import { NextPage } from 'next'
import { useStore } from 'hooks/observe-store'
import Button from 'components/Button'
import { Gateway } from 'gateway'
import { useRouter } from 'next/router'
import WalletHeader from 'components/WalletLayout/Header'
import { Dialog } from 'contexts/dialog'
import Address from 'components/Address'
import { Store } from 'contexts/store'
import _ from 'lodash'
import Card from 'components/Card'
import WalletCreate from 'components/WalletCreate'
import { walletStatusChange } from 'helpers/expect-wallet-status'

//TODO: add this https://www.npmjs.com/package/password-meter
const WalletSelect: NextPage = () => {
  const wallets = useStore('wallets')
  const router = useRouter()

  const [addWalletStatus, setAddWalletStatus] = useState<
    undefined | 'doing' | 'done'
  >(undefined)

  useEffect(() => {
    const shouldContinue = { current: true }
    function listen() {
      walletStatusChange.expect().catch((msg) => {
        Gateway.i.receive({
          event: 'show_notification',
          data: {
            message: msg,
            type: 'negative',
          },
        })
        if (shouldContinue.current) {
          listen()
        }
      })
    }
    listen()
    return () => {
      shouldContinue.current = false
    }
  }, [])

  useEffect(() => {
    if (addWalletStatus === 'done') {
      router.push('/wallet/info')
    }
  }, [addWalletStatus, router])

  return (
    <div className="flex flex-col w-full h-full px-5">
      <WalletCreate
        open={addWalletStatus === 'doing'}
        onSettle={(res) => setAddWalletStatus(res ? 'done' : undefined)}
      />
      <WalletHeader title="Wallet Manager">
        <Button
          btnType="primary"
          onClick={() => {
            throw 'not implemented'
          }}>
          Recover Wallet
        </Button>
        <Button btnType="primary" onClick={() => setAddWalletStatus('doing')}>
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
                    walletStatusChange.prepare()
                    Gateway.i.send('wallet', 'open_wallet', {
                      name: wallet.name,
                      password: value,
                    })
                    walletStatusChange
                      .expect()
                      .then(() => router.push('/wallet/info'))
                      .catch(_.noop)
                  }
                })
              } else {
                walletStatusChange.prepare()
                Gateway.i.send('wallet', 'open_wallet', {
                  name: wallet.name,
                  password: '',
                })
                walletStatusChange
                  .expect()
                  .then(() => router.push('/wallet/info'))
                  .catch(_.noop)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default WalletSelect
