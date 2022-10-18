import cn from 'classnames'
import React from 'react'
import { ClassName } from 'types'
import AddressPhoto from 'components/AddressPhoto'
import Card from 'components/Card'
import Button from 'components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { Gateway } from 'gateway'

export type AddressProps = {
  className?: ClassName
  address: string
  addressLabel?: string
  name?: string
  addressIndex?: number
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export default function Address({
  className,
  address,
  addressLabel,
  name,
  addressIndex,
  onClick,
}: AddressProps): React.ReactElement | null {
  return (
    <Card
      className={cn(
        'w-full flex items-center gap-3 break-all transition-colors',
        onClick && 'hover:bg-primary-600',
        className,
      )}>
      <div
        className={cn('contents', onClick && 'cursor-pointer')}
        onClick={onClick}>
        <AddressPhoto address={address} dimensions="4rem" />
        <div className="flex flex-col">
          {name && <span className="text-2xl">{name}</span>}
          <span>{address}</span>
          {addressLabel && (
            <span className="font-semibold">{addressLabel}</span>
          )}
          {addressIndex && <span>{`(Index ${addressIndex})`}</span>}
        </div>
      </div>
      <Button
        className="!py-2 !px-3 !rounded-xl mt-auto ml-auto"
        btnType="primary"
        job={() => {
          navigator.clipboard.writeText(address)
          Gateway.i.receive({
            event: 'show_notification',
            data: {
              message: 'address copied to clipboard',
              timeout: 1000,
            },
          })
        }}>
        <FontAwesomeIcon icon={faClipboard} />
      </Button>
    </Card>
  )
}
