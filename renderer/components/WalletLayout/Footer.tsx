import React from 'react'
import cn from 'classnames'
import { ClassName } from 'types'

export type WalletFooterProps = {
  className?: ClassName
}

export default function WalletHeader({
  className,
}: WalletFooterProps): React.ReactElement | null {
  return (
    <div className={cn('', className)}>
      Balance:
      <hr className="mt-4" />
    </div>
  )
}
