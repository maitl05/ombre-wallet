import Button from 'components/Button'
import Input from 'components/Input'
import Modal from 'components/Modal'
import { Gateway } from 'gateway'
import { walletStatusChange } from 'helpers/expect-wallet-status'
import { useRecordData } from 'hooks/record-data'
import React, { useMemo, useState } from 'react'

export const ChangePasswordModal: React.FC<{
  open: boolean
  onSettle: (value: boolean) => void
}> = ({ open, onSettle }) => {
  const [pageData, setPageData] = useRecordData<{
    old_password: string
    new_password: string
    new_password_confirm: string
  }>({
    old_password: '',
    new_password: '',
    new_password_confirm: '',
  })

  const confirmPasswordValidator = useMemo(
    () => (val) =>
      val !== pageData.new_password ? 'passwords do not match' : undefined,
    [pageData],
  )

  const [hasError, setHasError] = useState(true)

  const handleSubmit = useMemo(
    () => () => {
      Gateway.i.send('wallet', 'change_wallet_password', pageData)
      walletStatusChange.expect().then(console.log).catch(console.log)
      onSettle(true)
    },
    [pageData],
  )

  return (
    <Modal
      open={open}
      onClose={() => {}}
      title="Change wallet password"
      className={'flex flex-col gap-6'}>
      <Input
        label="old password"
        type="password"
        onBlur={setPageData('old_password', (e) => e.target.value)}
      />
      <Input
        label="new password"
        type="password"
        onChange={setPageData('new_password', (e) => e.target.value)}
      />
      <Input
        label="repeat password"
        type="password"
        validator={confirmPasswordValidator}
        onErrorStateChange={setHasError}
        onBlur={setPageData('new_password_confirm', (e) => e.target.value)}
      />
      <div className="flex justify-between w-screen max-w-md">
        <Button btnType="primary" job={() => onSettle(false)}>
          cancel
        </Button>
        <Button disabled={hasError} btnType="secondary" job={handleSubmit}>
          proceed
        </Button>
      </div>
    </Modal>
  )
}
