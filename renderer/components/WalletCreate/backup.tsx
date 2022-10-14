import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'components/Button'
import Modal from 'components/Modal'
import WalletLayout from 'components/WalletLayout'
import { Gateway } from 'gateway'
import { useStore } from 'hooks/observe-store'
import { useState } from 'react'
import WalletPhrases from './phrases'

export type WalletCreateProps = {
  onSettle: (result: boolean) => void
}

export default function WalletCreateBackup({
  onSettle,
}: WalletCreateProps): React.ReactElement | null {
  const wallet = useStore('wallet')

  return (
    <Modal title="Backup your new wallet" open onClose={() => {}}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Here are your mnemonic phrases</h2>
          <div>
            Keep them safe, never loose them. Anyone with access to your keys
            will be able to take control of your wallet.
          </div>
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
          <div className="scale-x-95 origin-left">{wallet.secret.view_key}</div>
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
        <Button
          btnType="secondary"
          className={'ml-auto'}
          job={() => onSettle(true)}>
          proceed
        </Button>
      </div>
      {/* </div> */}
    </Modal>
  )
}
