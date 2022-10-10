import React, { useState } from 'react'
import cn from 'classnames'
import type { ClassName } from 'types'
import LoadingOverlay from 'components/LoadingOverlay'

export type ButtonProps = {
  className?: ClassName
  btnType?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  job?: () => Promise<unknown> | unknown
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
        'relative',
        'shadow-xl shadow-[#0003] rounded-full px-6 py-3 transition-colors cursor-pointer',
        !isLoading && !disabled && 'hover:text-text-primary-50',
        btnType === 'primary' &&
          cn(
            'disabled:text-text-primary-400 disabled:bg-primary-600',
            'border-primary-500 border-2 border-opacity-30 font-semibold text-text-secondary',
            !isLoading &&
              !disabled &&
              'hover:bg-primary-700 hover:text-text-secondary bg-opacity-80',
          ),
        btnType === 'secondary' &&
          cn(
            'disabled:text-text-primary-400 disabled:bg-primary-600',
            'bg-secondary-300 text-text-primary-900',
            !isLoading &&
              !disabled &&
              'hover:bg-secondary-200 hover:text-text-primary-900',
          ),
        'disabled:bg-opacity-30 disabled:cursor-not-allowed',
        isLoading &&
          '!text-opacity-0 !text-black bg-opacity-0 cursor-not-allowed',
        className,
      )}
      disabled={disabled || isLoading}
      onClick={async () => {
        if (isLoading || disabled) {
          return
        }
        setIsLoading(true)
        await job?.()
        setIsLoading(false)
      }}
      {...props}>
      {children}
      <div className="absolute pointer-events-none inset-0 flex justify-center items-center">
        <LoadingOverlay visible={isLoading} />
      </div>
    </button>
  )
}
