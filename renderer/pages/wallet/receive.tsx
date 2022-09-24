import WalletLayout from 'components/WalletLayout'
import Modal from 'components/Modal'
import { useContext, useState } from 'react'
import { WalletCtx } from 'contexts/wallet'
import Card from 'components/Card'
import AddressPhoto from 'components/AddressPhoto'

export default function WalletReceive() {
  const { wallet } = useContext(WalletCtx)
  const [open, setOpen] = useState(false)

  return (
    <WalletLayout title="Receive">
      <div className="flex flex-col gap-3 p-2 w-full break-all">
        <span className="text-2xl">My primary address: </span>
        <Card className={'w-full flex gap-3'}>
          <AddressPhoto address={wallet?.info.address} dimensions="4rem" />
          <div className="flex flex-col">
            <span>{wallet?.info.address}</span>
            <span>Primary address</span>
          </div>
        </Card>

        {wallet?.addressList.used ?? (
          <div>
            <span className="text-2xl">My unused addresses: </span>
            {wallet?.addressList.used.map((add, index) => (
              <Card key={index} className={'w-full flex gap-3'}>
                <AddressPhoto address={add} dimensions="4rem" />
                <div className="flex flex-col">
                  <span>{add}</span>
                  <span>Primary address</span>
                </div>
              </Card>
            ))}
          </div>
        )}

        <span className="text-2xl">My unused addresses: </span>
        {wallet?.addressList.unused.map((add, index) => (
          <Card key={index} className={'w-full flex gap-3'}>
            <AddressPhoto address={add} dimensions="4rem" />
            <div className="flex flex-col">
              <span>{add}</span>
              <span>Sub address</span>
            </div>
          </Card>
        ))}

        <Modal title="QR code" open={open} onClose={() => setOpen(false)}>
          hello from modal
        </Modal>
      </div>
    </WalletLayout>
  )
}
