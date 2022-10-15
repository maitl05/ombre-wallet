import Button from 'components/Button'
import Input from 'components/Input'
import LoadingOverlay from 'components/LoadingOverlay'
import Modal from 'components/Modal'
import SelectOption from 'components/SelectOption'
import WalletLayout from 'components/WalletLayout'
import { Gateway } from 'gateway'
import { walletStatusChange } from 'helpers/expect-wallet-status'
import { setRecordState } from 'helpers/setRecordState'
import {
  passwordValidator,
  seedPhraseValidator,
  walletHeightValidator,
  walletNameValidator,
} from 'helpers/validators'
import { useRecordData } from 'hooks/record-data'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'

export type WalletRecoverProps = {
  onSettle: (result: boolean) => void
}

export default function WalletRecoverPrompt({
  onSettle,
}: WalletRecoverProps): React.ReactElement | null {
  const [pageData, setPageData] = useRecordData<{
    name: string
    seed: string
    refresh_start_height: number
    password: string
    password_confirm: string
    refresh_type: 'height' | 'date'
  }>({
    name: '',
    seed: '',
    refresh_start_height: 0,
    password: '',
    password_confirm: '',
    refresh_type: 'height',
  })

  const [hasError, setHasError] = useRecordData<
    [boolean, boolean, boolean, boolean, boolean]
  >([true, true, true, true, true])

  const handleSubmit = useMemo(
    () => () => {
      walletStatusChange.prepare()
      Gateway.i.send('wallet', 'restore_wallet', {
        ...pageData,
        language: 'English',
      })
      onSettle(true)
    },
    [pageData],
  )

  const confirmPasswordValidator = useMemo(
    () => (val) =>
      val !== pageData.password ? 'passwords do not match' : undefined,
    [pageData],
  )

  return (
    <Modal title="Add a new wallet" open onClose={() => {}}>
      <div className="flex flex-col gap-6">
        <h2>please fill the form bellow</h2>
        <div className="flex flex-col gap-6">
          <Input
            label="name"
            validator={walletNameValidator}
            onErrorStateChange={setHasError(0)}
            onBlur={setPageData('name', (e) => e.target.value)}
          />
          <Input
            label="recovery phrases"
            validator={seedPhraseValidator}
            onErrorStateChange={setHasError(1)}
            onBlur={setPageData('seed', (e) => e.target.value)}
          />
          <Input
            label="height"
            type={'number'}
            validator={walletHeightValidator}
            onErrorStateChange={setHasError(2)}
            onBlur={setPageData('refresh_start_height', (e) => e.target.value)}
          />
          <Input
            label="password"
            type={'password'}
            validator={passwordValidator}
            onChange={setPageData('password', (e) => e.target.value)}
            onErrorStateChange={setHasError(3)}
          />
          <Input
            label="confirm password"
            type={'password'}
            validator={confirmPasswordValidator}
            onErrorStateChange={setHasError(4)}
            onBlur={setPageData('password_confirm', (e) => e.target.value)}
          />
        </div>
        <div className="flex justify-between gap-3 w-screen max-w-sm">
          <Button btnType="primary" job={() => onSettle(false)}>
            cancel
          </Button>
          <Button
            btnType="secondary"
            job={handleSubmit}
            disabled={hasError.some(_.identity)}>
            proceed
          </Button>
        </div>
      </div>
    </Modal>
  )
}
