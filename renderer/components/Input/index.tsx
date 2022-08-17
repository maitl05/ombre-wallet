import React, { ReactNode, useEffect, useState } from 'react'
import cn from 'classnames'
import type { ClassName } from 'types'
import _ from 'lodash'

export type InputProps = {
  className?: { [key in 'input' | 'container']?: ClassName }
  validator?: (value: string) => string | undefined
  value?: string
  label?: ReactNode
  labelLeft?: ReactNode
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'value' | 'className'
>

//TODO add styling

export default function Input({
  className,
  validator,
  value: _value,
  onChange,
  onKeyDown,
  label,
  labelLeft,
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
    <div>
      {label}
      <input
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
      {labelLeft}
      <div>{error}</div>
    </div>
  )
}
