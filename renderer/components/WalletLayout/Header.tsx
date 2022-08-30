import React from 'react'
import { ClassName } from 'types'
import cn from 'classnames'

export type WalletHeaderProps = {
  title: string
  className?: ClassName
}

export default function WalletHeader({
  title,
}: WalletHeaderProps): React.ReactElement | null {
  return (
    <>
      <div className={cn('h-28 flex items-center')}>
        <h1 className="text-3xl pl-2">{title}</h1>
      </div>
      <hr className="mb-4" />
    </>
  )
}
