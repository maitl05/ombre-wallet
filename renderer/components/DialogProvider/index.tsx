import Button from 'components/Button'
import Input from 'components/Input'
import Modal from 'components/Modal'
import { Dialog } from 'contexts/dialog'
import _ from 'lodash'
import { PropsWithChildren, useEffect, useState } from 'react'
import { DialogParams } from 'types'

export type DialogProviderProps = PropsWithChildren

function settleWith(result: boolean) {
  return (value?: string) => Dialog.settle(result, value)
}

export default function DialogProvider({ children }: DialogProviderProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogParams, setDialogParams] = useState<DialogParams>()
  const [value, setValue] = useState(undefined)

  useEffect(() => {
    const unsub = [
      Dialog.on('open', (params: DialogParams) => {
        setDialogParams(params)
        setDialogOpen(true)
      }),
      Dialog.on('settle', () => {
        setDialogOpen(false)
        setValue(undefined)
      }),
    ]

    return () => {
      unsub.forEach((x) => x())
    }
  }, [])

  if (!dialogOpen) {
    return null
  }

  return (
    <Modal
      title={dialogParams.title}
      open={dialogOpen}
      onClose={settleWith(false)}>
      {dialogParams.message}
      {dialogParams.prompt && (
        <Input
          autoFocus
          type={dialogParams.prompt.type}
          value={dialogParams.prompt.value}
          onBlur={(e) => {
            setValue(e.target.value)
          }}
          onAccept={settleWith(true)}
        />
      )}

      <div className="flex justify-around pt-2">
        {dialogParams.cancel && (
          <Button
            className={'text-sm'}
            btnType="primary"
            job={settleWith(false)}>
            {dialogParams.cancel}
          </Button>
        )}
        <Button
          className={'text-sm'}
          btnType="secondary"
          job={() => settleWith(true)(value)}>
          {_.isEmpty(dialogParams.ok) ? 'OK' : dialogParams.ok}
        </Button>
      </div>
    </Modal>
  )
}
