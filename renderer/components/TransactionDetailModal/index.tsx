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
        <div className="flex flex-col gap-2 justify-between p-3 break-all">
          <div className="flex">
            <span className="w-48 shrink-0">transaction ID:</span>
            <span>{txDetail.txid}</span>
          </div>
          <div className="flex">
            <span className="w-48 shrink-0">related address:</span>
            <span>{txDetail.address}</span>
          </div>
          <div className="flex">
            <span className="w-48 shrink-0">amount:</span>
            <span>{txDetail.amount / 1e9}</span>
          </div>
          <div className="flex">
            <span className="w-48 shrink-0">double spend:</span>
            <span>{txDetail.double_spend_seen ? 'YES' : 'NO (safe)'}</span>
          </div>
          <div className="flex">
            <span className="w-48 shrink-0">fee:</span>
            <span>{txDetail.fee / 1e9}</span>
          </div>
          <div className="flex">
            <span className="w-48 shrink-0">height:</span>
            <span>{txDetail.height}</span>
          </div>
          <div className="flex">
            <span className="w-48 shrink-0">note:</span>
            <span>{txDetail.note.length > 0 ? txDetail.note : '(empty)'}</span>
          </div>
          <div className="flex">
            <span className="w-48 shrink-0">payment ID:</span>
            <span>
              {txDetail.payment_id.length > 0 ? txDetail.payment_id : '(empty)'}
            </span>
          </div>
          <div className="flex">
            <span className="w-48">date:</span>
            <span>
              {new Date(txDetail.timestamp * 1000).toLocaleDateString()}{' '}
              {new Date(txDetail.timestamp * 1000).toLocaleTimeString()}
            </span>
          </div>
          <div className="flex">
            <span className="w-48">subaddress index:</span>
            <span className="flex gap-6">
              <span>major: {txDetail.subaddr_index.major}</span>
              <span>minor: {txDetail.subaddr_index.minor}</span>
            </span>
          </div>
          {(txDetail.destinations?.length ?? 0) > 0 && (
            <div className="flex flex-col gap-2">
              {txDetail.destinations.map((destination) => (
                <div className="flex">
                  <span className="w-48 shrink-0">payment ID:</span>
                  <span>
                    {txDetail.payment_id.length > 0
                      ? txDetail.payment_id
                      : '(empty)'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    )
  )
}
