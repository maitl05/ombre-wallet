import React, { ReactNode, useEffect, useState } from 'react'
import cn from 'classnames'
import type { ClassName } from 'types'
import _ from 'lodash'

export type InputProps = {
  className?: { [key in 'input' | 'container']?: ClassName }
  validator?: (value: string) => string | undefined
  value?: string
  label?: string
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'value' | 'className'
>

export default function Input({
  className,
  validator,
  value: _value,
  onChange,
  onKeyDown,
  label,
  onBlur,
  ...props
}: InputProps): React.ReactElement | null {
  const [value, setValue] = useState(_value ?? '')
  const [error, setError] = useState<string | undefined>(undefined)
  const [notChangedYet, setNotChangedYet] = useState(true)
  useEffect(() => {
    if (!notChangedYet) {
      setError(validator?.(value ?? ''))
    }
  }, [value, validator])

  return (
    <div
      className={cn(
        'relative flex min-w-min w-full justify-start items-center',
        className?.container,
      )}>
      <div
        className={cn(
          'absolute -z-[1] transition-all duration-300 ml-3 subpixel-antialiased opacity-50',
          !_.isEmpty(value) &&
            '-translate-y-6 translate-x-2 transform-gpu z-20 bg-primary-800 text-sm rounded-full shadow-sm subpixel-antialiased opacity-100',
        )}>
        {label}
      </div>
      <input
        className={cn(
          'p-2 bg-transparent border-2 rounded-md min-w-min w-full',
          'focus:outline-none transition-color',
          _.isEmpty(value)
            ? 'border-primary-400'
            : _.isEmpty(error)
            ? 'border-secondary-300'
            : 'border-error-400 bg-opacity-40',
          className?.input,
        )}
        value={value}
        onKeyDown={(e) => {
          onKeyDown?.(e)
          setNotChangedYet(false)
        }}
        onChange={(e) => {
          if (!props.disabled) {
            onChange?.(e)
            setValue(e.target.value)
          }
        }}
        {...props}
      />
      <div
        className={cn(
          'absolute top-0 right-0 left-0 w-1/2 max-w-lg min-w-min -translate-y-full bg-primary-800 border border-error-200 rounded-lg flex justify-center p-1 text-sm',
          error && !_.isEmpty(value)
            ? 'transition-opacity opacity-100'
            : 'opacity-0',
        )}>
        {error}
      </div>
    </div>
  )
}
