import WalletLayout from 'components/WalletLayout'
import { useContext } from 'react'
import AddressPhoto from 'components/AddressPhoto'
import { WalletCtx } from 'contexts/wallet'

export default function WalletInfo() {
  const { wallet } = useContext(WalletCtx)

  return (
    <WalletLayout title="Account info">
      <div className="flex flex-1 gap-3 p-2">
        <AddressPhoto address={wallet?.info.address} />
        <div className="break-all">
          <p className="font-semibold text-2xl">{wallet?.info.name}</p>
          <p className="text-lg">{wallet?.info.address}</p>
        </div>
      </div>
    </WalletLayout>
  )
}
