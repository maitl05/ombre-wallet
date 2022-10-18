import cn from 'classnames'
import React from 'react'
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

const txAestheticMap: Record<
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

export type TransactionProps = { tx: SingleTransaction }

export default function Transaction({
  tx,
}: TransactionProps): React.ReactElement {
  return (
    <Card className={'flex gap-3'}>
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
        <span className="">Height: {tx.height}</span>
      </div>

      <div className="flex flex-col grow-1 justify-between min-w-fit">
        <span className={'text-lg'}>{(tx.amount / 1e9).toFixed(3)} OMB</span>
        <span className={'text-xs '}>
          {new Date(tx.timestamp * 1000).toLocaleString(undefined,{hour12:false})}
        </span>
      </div>
    </Card>
  )
}
