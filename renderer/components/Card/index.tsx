import cn from 'classnames'
import React, { PropsWithChildren } from 'react'
import type { ClassName } from 'types'

export type CardProps = PropsWithChildren<{
  className?: ClassName
}> &
  Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'className'
  >

export default function Card({
  className,
  children,
  ...props
}: CardProps): React.ReactElement {
  return (
    <div className={cn('bg-primary-700 rounded-xl p-3', className)} {...props}>
      {children}
    </div>
  )
}
