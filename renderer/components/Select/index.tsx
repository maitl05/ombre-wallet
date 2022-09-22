import React from 'react'
import cn from 'classnames'
import Select, { OptionProps, StylesConfig } from 'react-select'
import { ClassName } from 'types'

type Option = { value: string; label: string }

export type SelectOptionProps = {
  className?: { [key in 'container']?: ClassName }
  options: Array<Option>
  defaultValue?: Option
  onChange?: (objValue: any) => void
  label: string
} & Omit<Partial<OptionProps>, 'className'>

export default function SelectOption({
  label,
  options,
  defaultValue,
  onChange,
  className,
  ...props
}: SelectOptionProps) {
  return (
    <div className={cn(className?.container)}>
      <Select
        instanceId={`select-input${label}`}
        options={options}
        defaultValue={defaultValue}
        isSearchable={false}
        styles={customStyles}
        onChange={(e: Option) => onChange(e.value)}
        placeholder={label}
        {...props}
      />
    </div>
  )
}

const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'var(--color-primary-800)',
    border: 0,
    boxShadow: '0 0 5px 1px var(--color-primary-900)',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--color-primary-800)',
    boxShadow: '0 0 5px 1px var(--color-primary-900)',
    padding: '0.5rem',
    fontSize: '1rem',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '1rem',
    color: 'var(--color-text-primary-400)',
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '2px solid #484848',
    backgroundColor: state.isSelected && '#424242',
  }),
}
