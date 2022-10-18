import WalletLayout from 'components/WalletLayout'
import AddressPhoto from 'components/AddressPhoto'
import Card from 'components/Card'
import SelectOption from 'components/SelectOption'
import { useStore } from 'hooks/observe-store'
import Transaction from 'components/Transaction'
import { ChangePasswordModal } from 'components/ChangePasswordModal'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Gateway } from 'gateway'
import { Store } from 'contexts/store'

export default function WalletInfo() {
  const wallet = useStore('wallet')
  const [action, setAction] = useState<
    'change_password' | 'logout' | undefined
  >(undefined)
  const router = useRouter()

  useEffect(() => {
    switch (action) {
      case 'logout':
        router.replace('/wallet-select')
        Gateway.i.send('wallet', 'close_wallet')
        setTimeout(() => {
          Store.resetWalletData()
        }, 250)
        return
    }
  }, [action, router])

  return (
    <WalletLayout title="Account info">
      <div className="flex gap-3 p-2 pb-0">
        <AddressPhoto address={wallet?.info.address} />
        <div className="break-all">
          <p className="font-semibold text-2xl">{wallet?.info.name}</p>
          <p className="text-lg">{wallet?.info.address}</p>
        </div>
      </div>

      <div className="flex justify-between w-full p-3 pt-0">
        <div className="flex flex-col">
          <span className="text-xl">BALANCE</span>
          <span>{(wallet?.info.balance / 1e9).toFixed(3)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl">UNLOCKED BALANCE</span>
          <span>{(wallet?.info.unlocked_balance / 1e9).toFixed(3)}</span>
        </div>
        <SelectOption
          className={{ container: 'w-48' }}
          label="wallet actions"
          options={[
            { value: 'change_password', label: 'change password' },
            { value: 'logout', label: 'logout' },
          ]}
          onChange={setAction}
        />
      </div>

      <span className="text-2xl font-bold pb-0">Recent transactions:</span>

      <div className="flex flex-col gap-2 w-full">
        {wallet?.transactions.tx_list.length > 0 ? (
          wallet?.transactions.tx_list
            .slice(0, 9)
            .map((tx, index) => <Transaction tx={tx} key={index} />)
        ) : (
          <Card className={'flex items-center justify-center'}>
            No transactions...
          </Card>
        )}
      </div>
      {action === 'change_password' && (
        <ChangePasswordModal open onSettle={(value) => setAction(undefined)} />
      )}
    </WalletLayout>
  )
}
