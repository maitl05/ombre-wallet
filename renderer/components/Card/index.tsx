import cn from 'classnames'
import React, { PropsWithChildren } from 'react'
import type { ClassName } from 'types'

export type CardProps = PropsWithChildren<{
  className?: ClassName
}>

export default function Card({
  className,
  children,
}: CardProps): React.ReactElement {
  return (
    <div className={cn('bg-primary-700 rounded-xl p-3', className)}>
      {children}
    </div>
  )
}
