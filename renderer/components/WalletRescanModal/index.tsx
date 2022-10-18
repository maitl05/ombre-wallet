import Button from 'components/Button'
import Input from 'components/Input'
import Modal from 'components/Modal'
import SelectOption from 'components/SelectOption'
import { Dialog } from 'contexts/dialog'
import { Store } from 'contexts/store'
import { Gateway } from 'gateway'
import { walletStatusChange } from 'helpers/expect-wallet-status'
import { useRecordData } from 'hooks/record-data'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'

export const WalletRescanModal: React.FC<{
  open: boolean
  onSettle: (value: boolean) => void
}> = ({ open, onSettle }) => {
  const [pageData, setPageData] = useRecordData<{
    type: 'full' | 'spent'
  }>({
    type: 'full',
  })

  const router = useRouter()

  const logout = useMemo(
    () => () => {
      router.replace('/wallet-select')
      Gateway.i.send('wallet', 'close_wallet')
      setTimeout(() => {
        Store.resetWalletData()
      }, 250)
    },
    [router],
  )

  const handleSubmit = useMemo(
    () => () => {
      if (pageData.type === 'full') {
        Dialog.open({
          message:
            "Warning: Some information about previous transactions\nsuch as the recipient's address will be lost",
          title: 'Rescan wallet',
          ok: 'RESCAN',
          cancel: 'cancel',
        })
        Dialog.once('settle', (value) => {
          if (value.result) {
            Gateway.i.send('wallet', 'rescan_blockchain')
            logout()
          }
          onSettle(value.result)
        })
      } else {
        Gateway.i.send('wallet', 'rescan_spent')
        onSettle(true)
        logout()
      }
    },
    [pageData, logout],
  )

  return (
    <Modal
      open={open}
      onClose={() => {}}
      title="Rescan wallet"
      className={'flex flex-col gap-6 w-screen max-w-md'}>
      <div>Select full rescan or rescan of spent outputs only</div>
      <SelectOption
        label="rescan type"
        options={[
          { value: 'full', label: 'full' },
          { value: 'spent', label: 'spent' },
        ]}
        defaultValue={{ value: 'full', label: 'full' }}
        onChange={setPageData('type')}
      />
      <div className="flex justify-between">
        <Button btnType="primary" job={() => onSettle(false)}>
          cancel
        </Button>
        <Button btnType="secondary" job={handleSubmit}>
          proceed
        </Button>
      </div>
    </Modal>
  )
}
