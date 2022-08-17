import React from 'react'
import cn from 'classnames'
import type { ClassName } from 'types'

export type LoadingOverlayProps = {
  className?: ClassName
  visible: boolean
}

export default function LoadingOverlay({
  className,
  visible,
}: LoadingOverlayProps): React.ReactElement | null {
  if (!visible) {
    return null
  }
  return (
    <div className={cn('flex justify-center items-center !m-0', className)}>
      <div className="w-6 h-6 rounded-full border-4 border-t-primary-500 border-x-primary-900 border-b-primary-900 animate-spin" />
    </div>
  )
}
