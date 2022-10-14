import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import Button from 'components/Button'
import Modal from 'components/Modal'
import WalletLayout from 'components/WalletLayout'
import { Gateway } from 'gateway'
import { useStore } from 'hooks/observe-store'
import { useState } from 'react'

export type WalletPhrasesProps = {
  phrases: string[]
  onClick?: (index: number) => void
  showIndex?: boolean
}

export default function WalletPhrases({
  onClick,
  phrases,
  showIndex = true,
}: WalletPhrasesProps): React.ReactElement | null {
  return (
    <div className="grid grid-cols-3 gap-x-2 gap-y-4">
      {phrases.map((phrase, index) => (
        <span
          onClick={() => onClick?.(index)}
          className={cn(
            'inline-flex gap-2 items-center',
            onClick && 'cursor-pointer',
          )}
          key={`mnemonic-${index}`}>
          {showIndex && <span className="w-7 text-right">{index + 1}:</span>}
          <span className="rounded-full bg-primary-900 text-secondary-300 px-5 py-3">
            {phrase}
          </span>
        </span>
      ))}
    </div>
  )
}
