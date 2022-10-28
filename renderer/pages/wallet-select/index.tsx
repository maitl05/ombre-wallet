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
import WalletRecover from 'components/WalletRecover'
import Modal from 'components/Modal'
import LoadingOverlay from 'components/LoadingOverlay'

//TODO: add this https://www.npmjs.com/package/password-meter
const WalletSelect: NextPage = () => {
  const wallets = useStore('wallets')
  const router = useRouter()

  const [addWalletStatus, setAddWalletStatus] = useState<
    undefined | 'doing' | 'done'
  >(undefined)

  const [recoverWalletStatus, setRecoverWalletStatus] = useState<
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
    if (addWalletStatus === 'done' || recoverWalletStatus === 'done') {
      router.replace('/wallet/info')
    }
  }, [addWalletStatus, recoverWalletStatus, router])

  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex flex-col w-full h-full px-5">
      <WalletCreate
        open={addWalletStatus === 'doing'}
        onSettle={(res) => setAddWalletStatus(res ? 'done' : undefined)}
      />
      <WalletRecover
        open={recoverWalletStatus === 'doing'}
        onSettle={(res) => setRecoverWalletStatus(res ? 'done' : undefined)}
      />
      <WalletHeader title="Wallet Manager">
        <Button
          btnType="primary"
          onClick={() => setRecoverWalletStatus('doing')}>
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
                    setIsLoading(true)
                    walletStatusChange
                      .expect()
                      .then(() => router.replace('/wallet/info'))
                      .catch(_.noop)
                      .finally(() => setIsLoading(false))
                  }
                })
              } else {
                walletStatusChange.prepare()
                Gateway.i.send('wallet', 'open_wallet', {
                  name: wallet.name,
                  password: '',
                })
                setIsLoading(true)
                walletStatusChange
                  .expect()
                  .then(() => router.replace('/wallet/info'))
                  .catch(_.noop)
                  .finally(() => setIsLoading(false))
              }
            }}
          />
        ))}
      </div>
      <Modal open={isLoading} title="Loading wallet data..." onClose={_.noop}>
        <LoadingOverlay visible />
      </Modal>
    </div>
  )
}

export default WalletSelect
