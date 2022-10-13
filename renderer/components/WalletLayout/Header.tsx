import React, { PropsWithChildren } from 'react'
import { ClassName } from 'types'
import cn from 'classnames'

export type WalletHeaderProps = PropsWithChildren<{
  title: string
  className?: ClassName
}>

export default function WalletHeader({
  title,
  children,
}: WalletHeaderProps): React.ReactElement | null {
  return (
    <>
      <div className={cn('h-28 shrink-0 flex items-center justify-between')}>
        <h1 className="text-3xl pl-2">{title}</h1>
        <div className="flex gap-2 items-center">{children}</div>
      </div>
      <hr className="mb-4" />
    </>
  )
}
