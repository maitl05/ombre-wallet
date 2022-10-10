import React, { ReactNode, useEffect, useState } from 'react'
import cn from 'classnames'
import type { ClassName } from 'types'
import _ from 'lodash'

export type InputProps = {
  className?: { [key in 'input' | 'container']?: ClassName }
  validator?: (value: string) => string | undefined
  value?: string
  label?: string
  onErrorStateChange?: (hasError: boolean) => void
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
  onFocus,
  onErrorStateChange,
  ...props
}: InputProps): React.ReactElement | null {
  const [value, setValue] = useState(_value ?? '')
  const [error, setError] = useState<string | undefined>(undefined)
  const [notChangedYet, setNotChangedYet] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  useEffect(() => {
    const _err = validator?.(value ?? '')

    if (!notChangedYet) {
      setError(_err)
    }
    onErrorStateChange?.(!!_err?.length)
  }, [value, validator])

  return (
    <div
      className={cn(
        'relative flex min-w-min w-full justify-start items-center',
        className?.container,
      )}>
      <div
        className={cn(
          'absolute -z-[1] transition-all duration-300 subpixel-antialiased opacity-50 p-1 ml-1',
          !_.isEmpty(value) &&
            '-translate-y-6 translate-x-1 transform-gpu z-20 bg-primary-800 text-sm rounded-full shadow-sm subpixel-antialiased opacity-100',
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
            ? isFocused
              ? 'border-secondary-400'
              : 'border-primary-200'
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
        onFocus={(e) => {
          setIsFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          onBlur?.(e)
        }}
        {...props}
      />
      <div
        className={cn(
          'absolute top-full translate-y-1 right-0 left-0 w-1/2 max-w-lg min-w-fit bg-primary-800 border border-error-200 rounded-lg flex justify-center p-1 text-sm z-40',
          error && !_.isEmpty(value) && isFocused
            ? 'transition-opacity opacity-100'
            : 'opacity-0',
        )}>
        {error}
      </div>
    </div>
  )
}
