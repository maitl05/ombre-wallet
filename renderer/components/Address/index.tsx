import cn from 'classnames'
import React from 'react'
import { ClassName, Wallet } from 'types'
import AddressPhoto from 'components/AddressPhoto'
import Card from 'components/Card'
import Button from 'components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'

export type AddressProps = {
  className?: ClassName
  address: string
  addressLabel?: string
  name?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export default function Address({
  className,
  address,
  addressLabel,
  name,
  onClick,
}: AddressProps): React.ReactElement | null {
  return (
    <Card
      onClick={onClick}
      className={cn('w-full flex gap-3 break-all', className)}>
      <AddressPhoto address={address} dimensions="4rem" />
      <div className="flex flex-col">
        {name && <span className="text-2xl">{name}</span>}
        <span>{address}</span>
        {addressLabel && <span>{addressLabel}</span>}
      </div>
      <Button
        job={() => {
          navigator.clipboard.writeText(address)
        }}>
        <FontAwesomeIcon icon={faClipboard} />
      </Button>
    </Card>
  )
}
