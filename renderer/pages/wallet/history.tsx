import Card from 'components/Card'
import Transaction from 'components/Transaction'
import TransactionDetailModal from 'components/TransactionDetailModal'
import WalletLayout from 'components/WalletLayout'
import { useStore } from 'hooks/observe-store'
import { useState } from 'react'
import { SingleTransaction } from 'types/Store'

export default function WalletHistory() {
  const transactions = useStore('wallet', (e) => e.transactions)
  const [txDetail, setTxDetail] = useState<SingleTransaction | null>(null)

  return (
    <WalletLayout title="History">
      <div className="flex flex-col gap-3 w-full">
        {transactions?.tx_list.length > 0 ? (
          transactions?.tx_list.map((tx, index) => (
            <Transaction onClick={() => setTxDetail(tx)} tx={tx} key={index} />
          ))
        ) : (
          <Card className={'flex items-center justify-center'}>
            No transactions...
          </Card>
        )}
      </div>

      <TransactionDetailModal
        txDetail={txDetail}
        closeHandler={() => setTxDetail(null)}
      />
    </WalletLayout>
  )
}
