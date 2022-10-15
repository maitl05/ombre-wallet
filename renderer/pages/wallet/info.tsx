import WalletLayout from 'components/WalletLayout'
import AddressPhoto from 'components/AddressPhoto'
import Card from 'components/Card'
import SelectOption from 'components/SelectOption'
import { useStore } from 'hooks/observe-store'

export default function WalletInfo() {
  const wallet = useStore('wallet')

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
          <span>{wallet?.info.balance}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl">UNLOCKED BALANCE</span>
          <span>{wallet?.info.unlocked_balance}</span>
        </div>
        <SelectOption
          className={{ container: 'w-48' }}
          label="wallet actions"
          options={[{ value: 'change_password', label: 'change password' }]}
          onChange={(value) => {
            console.log('doing the action', value)
          }}
        />
      </div>

      <span className="text-2xl font-bold pb-0">Recent transactions:</span>

      <div className="flex flex-col gap-2 w-full">
        {wallet?.transactions.tx_list.length > 0 ? (
          wallet?.transactions.tx_list.map((tx, index) => (
            <Card className={'flex flex-col break-all'} key={index}>
              <span className="break-all">From: {tx.from}</span>
              <span>To: {tx.to}</span>
              <span>Amount: {tx.amount}</span>
            </Card>
          ))
        ) : (
          <Card className={'flex items-center justify-center'}>
            No transactions...
          </Card>
        )}
      </div>
    </WalletLayout>
  )
}
