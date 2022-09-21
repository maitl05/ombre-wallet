import WalletLayout from 'components/WalletLayout'
import Modal from 'components/Modal'
import { useState } from 'react'
import Button from 'components/Button'

export default function WalletReceive() {
  const [open, setOpen] = useState(false)

  return (
    <WalletLayout title="Receive">
      <div>
        <h2>My primary address: </h2>
        <h2>Unused addresses: </h2>
        {/* //TODO debug this is for test remove later */}
        <Button
          job={() => {
            setOpen(true)
          }}>
          open modal
        </Button>
        <Modal title="QR code" open={open} onClose={() => setOpen(false)}>
          hello from modal
        </Modal>
      </div>
    </WalletLayout>
  )
}
