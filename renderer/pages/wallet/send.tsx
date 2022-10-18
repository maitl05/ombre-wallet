import Button from 'components/Button'
import Input from 'components/Input'
import SelectOption from 'components/SelectOption'
import WalletLayout from 'components/WalletLayout'
import { Dialog } from 'contexts/dialog'
import { Store } from 'contexts/store'
import { Gateway } from 'gateway'
import { txStatusChange } from 'helpers/expect-tx-status'
import {
  addressValidator,
  amountValidator,
  paymentIdValidator,
} from 'helpers/validators'
import { useRecordData } from 'hooks/record-data'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

type WalletSendPageData = {
  address: string
  amount: number
  payment_id: string
  ringsize: 25 | 100
  priority: 0 | 1 | 2 | 3 | 4
}

export default function WalletSend() {
  const [pageData, setPageData, reset] = useRecordData<WalletSendPageData>({
    address: '',
    amount: 0,
    payment_id: '',
    ringsize: 25,
    priority: 0,
  })
  const [hasError, setHasError] = useRecordData<[boolean, boolean, boolean]>([
    true,
    true,
    false,
  ])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = useMemo(
    () => () => {
      setIsLoading(true)
      Dialog.open({
        title: 'Password',
        message: 'Enter wallet password to continue.',
        prompt: { type: 'password' },
        ok: 'ok',
        cancel: 'cancel',
      })
      Dialog.once('settle', ({ result, value }) => {
        if (result) {
          Store.update({
            tx_status: {
              code: 1,
              message: 'Sending transaction',
              sending: true,
            },
          })

          txStatusChange
            .expect()
            .then((status) => {
              Gateway.i.receive({
                event: 'show_notification',
                data: {
                  type: 'positive',
                  timeout: 1000,
                  message: status.message,
                },
              })
              router.push('/wallet/history')
              setIsLoading(false)
            })
            .catch((message) => {
              Gateway.i.receive({
                event: 'show_notification',
                data: {
                  type: 'negative',
                  message,
                },
              })
              setIsLoading(false)
            })

          Gateway.i.send('wallet', 'transfer', {
            ...pageData,
            password: value,
          })
        } else {
          setIsLoading(false)
        }
      })
    },
    [reset],
  )

  return (
    <WalletLayout title="Send">
      <div className="pt-4">
        <p>Please take the time and verify the info you enter on this page.</p>
        <p>
          Transactions are <strong>irreversible</strong> once deployed on the
          blockchain.
        </p>
      </div>
      <Input
        disabled={isLoading}
        label="Destination"
        validator={addressValidator}
        onBlur={setPageData('amount', (e) => e.target.value)}
        onErrorStateChange={setHasError(0)}
      />
      <Input
        disabled={isLoading}
        label="Amount"
        type="number"
        validator={amountValidator}
        onBlur={setPageData('amount', (e) => Number(e.target.value))}
        onErrorStateChange={setHasError(1)}
      />
      <Input
        disabled={isLoading}
        label="Payment ID"
        validator={paymentIdValidator}
        onBlur={setPageData('payment_id', (e) => e.target.value)}
        onErrorStateChange={setHasError(2)}
      />
      <div className="px-3 gap-3 flex flex-col">
        <SelectOption
          isDisabled={isLoading}
          onChange={setPageData('ringsize', Number)}
          label="Ring size"
          defaultValue={{ label: '25 ring members (default)', value: '25' }}
          options={[
            { label: '25 ring members (default)', value: '25' },
            { label: '100 ring members (top secret)', value: '100' },
          ]}
        />
        <SelectOption
          isDisabled={isLoading}
          onChange={setPageData('priority', Number)}
          label="Priority"
          defaultValue={{ label: 'Normal (x1 fee)', value: '0' }}
          options={[
            { label: 'Normal (x1 fee)', value: '0' },
            { label: 'High (x2 fee)', value: '1' },
            { label: 'High (x4 fee)', value: '2' },
            { label: 'High (x20 fee)', value: '3' },
            { label: 'Highest (x144 fee)', value: '4' },
          ]}
        />
      </div>
      <Button
        btnType="secondary"
        disabled={hasError.some(_.identity) || isLoading}
        job={handleSend}>
        Send
      </Button>
    </WalletLayout>
  )
}
