import Button from 'components/Button'
import LoadingOverlay from 'components/LoadingOverlay'
import Modal from 'components/Modal'
import WalletLayout from 'components/WalletLayout'
import { Gateway } from 'gateway'
import { walletStatusChange } from 'helpers/expect-wallet-status'
import _ from 'lodash'
import { useEffect, useState } from 'react'

export type WalletCreateProps = {
  onSettle: (result: boolean) => void
}

export default function WalletCreateGenerating({
  onSettle,
}: WalletCreateProps): React.ReactElement | null {
  useEffect(() => {
    walletStatusChange
      .expect()
      .then(() => {
        onSettle(true)
      })
      .catch(() => {
        onSettle(false)
      })
  }, [])
  return (
    <Modal title="Generating your wallet" open onClose={() => {}}>
      <LoadingOverlay visible />
    </Modal>
  )
}
