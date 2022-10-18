import Modal from 'components/Modal'
import cn from 'classnames'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { SingleTransaction } from 'types/Store'
import { txAestheticMap } from 'components/Transaction'

export type TransactionDetailModalProps = {
  txDetail: SingleTransaction
  closeHandler: () => void
}

export default function TransactionDetailModal({
  txDetail,
  closeHandler,
}: TransactionDetailModalProps): React.ReactElement | null {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (_.isEmpty(txDetail)) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [txDetail])

  return (
    !_.isEmpty(txDetail) && (
      <Modal
        className={'min-w-fit mx-6'}
        title={
          <div className="flex justify-center items-center">
            <span
              className={cn('text-4xl', txAestheticMap[txDetail.type].style)}>
              {txAestheticMap[txDetail.type].icon}
            </span>
            <span className="text-lg pl-3 mr-auto">transaction detail</span>
          </div>
        }
        open={open}
        onClose={closeHandler}>
        <div className="flex flex-col justify-between p-3 break-all">
          {JSON.stringify(txDetail)}
        </div>
      </Modal>
    )
  )
}
