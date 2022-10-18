import cn from 'classnames'
import React, { useEffect } from 'react'
import { ClassName } from 'types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faArrowsRotate,
  faCircleXmark,
  faCoins,
} from '@fortawesome/free-solid-svg-icons'
import { SingleTransaction } from 'types/Store'
import Card from 'components/Card'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-GB')

export const txAestheticMap: Record<
  SingleTransaction['type'],
  { icon: React.ReactElement; style: ClassName }
> = {
  in: {
    icon: <FontAwesomeIcon className="-rotate-45" icon={faArrowLeft} />,
    style: 'text-green-500',
  },
  out: {
    icon: <FontAwesomeIcon className="-rotate-45" icon={faArrowRight} />,
    style: 'text-pink-400',
  },
  pending: {
    icon: <FontAwesomeIcon icon={faArrowsRotate} />,
    style: 'text-yellow-300',
  },
  failed: {
    icon: <FontAwesomeIcon icon={faCircleXmark} />,
    style: 'text-red-500',
  },
  pool: { icon: <FontAwesomeIcon icon={faCoins} />, style: 'text-yellow-300' },
}

export type TransactionProps = {
  tx: SingleTransaction
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export default function Transaction({
  tx,
  onClick,
}: TransactionProps): React.ReactElement {
  return (
    <Card className={cn('flex gap-3', onClick && 'hover:bg-primary-600')}>
      <div
        className={cn('contents', onClick && 'cursor-pointer')}
        onClick={onClick}>
        <div
          className={cn(
            'text-5xl flex justify-center items-center',
            txAestheticMap[tx.type].style,
          )}>
          {txAestheticMap[tx.type].icon}
        </div>

        <div className={'flex flex-col w-full grow-1 text-lg truncate'}>
          <span className={cn('truncate', txAestheticMap[tx.type].style)}>
            {tx.txid}
          </span>
          {tx.height > 0 && (
            <span className="text-sm">Height: {tx.height}</span>
          )}
        </div>

        <div className="flex flex-col grow-1 justify-between min-w-fit">
          {tx.amount > 0 && (
            <span className={'text-lg'}>
              {(tx.amount / 1e9).toFixed(3)} OMB
            </span>
          )}
          {tx.amount === 0 && (
            <span className={'text-sm'}>internal transfer</span>
          )}
          <span className={'text-xs ml-auto'}>
            {timeAgo.format(new Date(tx.timestamp * 1000))}
          </span>
        </div>
      </div>
    </Card>
  )
}
