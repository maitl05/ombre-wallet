import Button from 'components/Button'
import Modal from 'components/Modal'
import { Dialog } from 'contexts/dialog'
import _ from 'lodash'
import { PropsWithChildren, useEffect, useState } from 'react'
import { DialogParams } from 'types'

export type DialogProviderProps = PropsWithChildren

function settleWith(result: boolean) {
  return () => Dialog.settle(result)
}

export default function DialogProvider({ children }: DialogProviderProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogParams, setDialogParams] = useState<DialogParams>()
  useEffect(() => {
    const listeners = [
      (params: DialogParams) => {
        setDialogParams(params)
        setDialogOpen(true)
      },
      () => {
        setDialogOpen(false)
      },
    ] as const
    Dialog.on('open', listeners[0])
    Dialog.on('settle', listeners[1])

    return () => {
      Dialog.off('open', listeners[0])
      Dialog.off('settle', listeners[1])
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
      <div className="flex justify-around pt-2">
        {dialogParams.cancel && (
          <Button
            className={'text-sm'}
            btnType="primary"
            job={settleWith(false)}>
            {dialogParams.cancel}
          </Button>
        )}
        {_.isEmpty(dialogParams.ok) ? (
          <Button
            className={'text-sm'}
            btnType="secondary"
            job={settleWith(true)}>
            OK
          </Button>
        ) : (
          <Button
            className={'text-sm'}
            btnType="secondary"
            job={settleWith(true)}>
            {dialogParams.ok}
          </Button>
        )}
      </div>
    </Modal>
  )
}
