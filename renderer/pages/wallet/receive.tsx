import WalletLayout from 'components/WalletLayout'
import Address from 'components/Address'
import { useStore } from 'hooks/observe-store'
import _ from 'lodash'
import AddressDetailModal from 'components/AddressDetailModal'
import { SingleAddress } from 'types/Store'
import { useState } from 'react'

export default function WalletReceive() {
  const wallet = useStore('wallet')
  const [addressDetail, setAddressDetail] = useState<SingleAddress | null>(null)

  return (
    <WalletLayout title="Receive">
      <div className="flex flex-col gap-3">
        <span className="text-2xl">My primary address: </span>
        <Address
          onClick={() => setAddressDetail(wallet.address_list?.primary[0])}
          address={wallet.address_list?.primary[0]?.address}
          addressLabel={wallet.address_list?.primary[0].label}
        />
      </div>

      {!_.isEmpty(wallet.address_list?.used) && (
        <div className="flex flex-col gap-3">
          <span className="text-2xl">My used addresses: </span>
          {wallet.address_list?.used.map((address, index) => (
            <Address
              onClick={() => setAddressDetail(address)}
              key={index}
              address={address.address}
              addressLabel={address.label}
              addressIndex={address.address_index}
            />
          ))}
        </div>
      )}

      {!_.isEmpty(wallet.address_list?.unused) && (
        <div className="flex flex-col gap-3">
          <span className="text-2xl">My unused addresses: </span>
          {wallet.address_list?.unused.map((address, index) => (
            <Address
              onClick={() => setAddressDetail(address)}
              key={index}
              address={address.address}
              addressLabel={address.label}
              addressIndex={address.address_index}
            />
          ))}
        </div>
      )}

      <AddressDetailModal
        addressDetail={addressDetail}
        closeHandler={() => setAddressDetail(null)}
      />
    </WalletLayout>
  )
}
