import React, { useState } from 'react'
import cn from 'classnames'
import type { ClassName } from 'types'
import LoadingOverlay from 'components/LoadingOverlay'

export type ButtonProps = {
  className?: ClassName
  btnType?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  job?: () => Promise<void> | void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  className,
  children,
  btnType,
  disabled,
  job,
  ...props
}: ButtonProps): React.ReactElement | null {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <button
      className={cn(
        'shadow-xl shadow-[#0003] rounded-full px-6 py-3 transition-colors cursor-pointer text-text-primary',
        !isLoading && 'hover:text-text-primary-50',
        btnType === 'primary' &&
          cn(
            'border-primary-500 border-2 border-opacity-30 bg-opacity-80 font-semibold text-text-secondary',
            !isLoading && 'hover:bg-primary-700 hover:text-text-secondary',
          ),
        btnType === 'secondary' &&
          cn(
            'bg-secondary-300 text-text-primary-900',
            !isLoading && 'hover:bg-secondary-200 hover:text-text-primary-900',
          ),
        'disabled:text-text-secondary disabled:bg-opacity-30 disabled:cursor-not-allowed',
        isLoading && 'text-opacity-0 bg-opacity-40 cursor-not-allowed',
        className,
      )}
      onClick={async () => {
        setIsLoading(true)
        !disabled && (await job?.())
        setIsLoading(false)
      }}
      {...props}>
      {children}
      <LoadingOverlay visible={isLoading} />
    </button>
  )
}
