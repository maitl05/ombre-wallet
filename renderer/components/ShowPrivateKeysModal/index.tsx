import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'components/Button'
import Input from 'components/Input'
import Modal from 'components/Modal'
import WalletPhrases from 'components/WalletCreate/phrases'
import { Dialog } from 'contexts/dialog'
import { Store } from 'contexts/store'
import { Gateway } from 'gateway'
import { walletStatusChange } from 'helpers/expect-wallet-status'
import { useStore } from 'hooks/observe-store'
import { useRecordData } from 'hooks/record-data'
import React, { useEffect, useMemo, useState } from 'react'

export const ShowPrivateKeysModal: React.FC<{
  open: boolean
  onSettle: (value: boolean) => void
}> = ({ open, onSettle }) => {
  const [pageData, setPageData] = useRecordData<{
    old_password: string
    new_password: string
    new_password_confirm: string
  }>({
    old_password: '',
    new_password: '',
    new_password_confirm: '',
  })

  const wallet = useStore('wallet')

  useEffect(() => {
    Dialog.open({
      message: 'Enter your password to continue',
      title: 'Unlock your wallet',
      cancel: 'cancel',
      ok: 'proceed',
      prompt: {
        type: 'password',
      },
    })
    Dialog.on('settle', ({ result, value }) => {
      if (result && value?.length) {
        Gateway.i.send('wallet', 'get_private_keys', { password: value })
      } else {
        onSettle(false)
      }
    })
    return () => {
      Store.update({
        wallet: {
          secret: {
            mnemonic: '',
            spend_key: '',
            view_key: '',
          },
        },
      })
    }
  }, [])

  useEffect(() => {
    if (wallet.secret.mnemonic === 'Invalid password') {
      Gateway.i.receive({
        event: 'show_notification',
        data: {
          type: 'negative',
          message: 'Invalid password',
          timeout: 1000,
        },
      })
      onSettle(false)
    }
  }, [wallet])

  return (
    <Modal
      open={open}
      onClose={() => {}}
      title="Your wallet private keys"
      className={'flex flex-col gap-6'}>
      {wallet.secret.mnemonic.length > 0 && (
        <div>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Mnemonic phrases</h2>
            <WalletPhrases phrases={wallet.secret.mnemonic.split(' ')} />
            <Button
              className="!py-2 !px-3 !rounded-xl justify-center flex gap-3 items-center"
              btnType="primary"
              job={() => {
                navigator.clipboard.writeText(wallet.secret.mnemonic)
                Gateway.i.receive({
                  event: 'show_notification',
                  data: {
                    message: 'address copied to clipboard',
                    timeout: 1000,
                  },
                })
              }}>
              <span>Copy</span>
              <FontAwesomeIcon className="text-xl" icon={faClipboard} />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Here is your view key</h2>
            <div className="scale-x-95 origin-left">
              {wallet.secret.view_key}
            </div>
            <Button
              className="!py-2 !px-3 !rounded-xl justify-center flex gap-3 items-center"
              btnType="primary"
              job={() => {
                navigator.clipboard.writeText(wallet.secret.view_key)
                Gateway.i.receive({
                  event: 'show_notification',
                  data: {
                    message: 'address copied to clipboard',
                    timeout: 1000,
                  },
                })
              }}>
              <span>Copy</span>
              <FontAwesomeIcon className="text-xl" icon={faClipboard} />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Here is your spend key</h2>
            <div className="scale-x-95 origin-left">
              {wallet.secret.spend_key}
            </div>
            <Button
              className="!py-2 !px-3 !rounded-xl justify-center flex gap-3 items-center"
              btnType="primary"
              job={() => {
                navigator.clipboard.writeText(wallet.secret.spend_key)
                Gateway.i.receive({
                  event: 'show_notification',
                  data: {
                    message: 'address copied to clipboard',
                    timeout: 1000,
                  },
                })
              }}>
              <span>Copy</span>
              <FontAwesomeIcon className="text-xl" icon={faClipboard} />
            </Button>
          </div>
          {/* <div className="flex justify-between"> */}
        </div>
      )}
      <div className="">
        <Button
          className={'ml-auto'}
          btnType="primary"
          job={() => onSettle(true)}>
          close
        </Button>
      </div>
    </Modal>
  )
}
