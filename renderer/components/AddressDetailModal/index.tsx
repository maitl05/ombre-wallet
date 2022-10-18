import Address from 'components/Address'
import Modal from 'components/Modal'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { SingleAddress } from 'types/Store'

export type AddressDetailModalProps = {
  addressDetail: SingleAddress
  closeHandler: () => void
}

export default function AddressDetailModal({
  addressDetail,
  closeHandler,
}: AddressDetailModalProps): React.ReactElement | null {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (_.isEmpty(addressDetail)) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [addressDetail])

  return (
    !_.isEmpty(addressDetail) && (
      <Modal
        className={'min-w-fit mx-6'}
        title={'address detail'}
        open={open}
        onClose={closeHandler}>
        <Address
          className={'!bg-primary-800'}
          name={
            addressDetail?.address_index > 0
              ? `Sub-address (Index ${addressDetail.address_index})`
              : `Primary address`
          }
          address={addressDetail?.address}
          addressLabel={`You have ${
            addressDetail.used ? 'used' : 'not used'
          } this address`}
        />
        <div className="flex justify-between p-3">
          <div className="flex flex-col">
            <span className="text-xl">BALANCE</span>
            <span>{addressDetail.balance ? (addressDetail.balance/ 1e9).toFixed(3) : 0}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl">UNLOCKED BALANCE</span>
            <span>
              {addressDetail.unlocked_balance
                ? (addressDetail.unlocked_balance/ 1e9).toFixed(3)
                : 0}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl">NUMBER OF UNSPENT OUTPUT</span>
            <span>
              {addressDetail.num_unspent_outputs
                ? addressDetail.num_unspent_outputs
                : 0}
            </span>
          </div>
        </div>
      </Modal>
    )
  )
}
