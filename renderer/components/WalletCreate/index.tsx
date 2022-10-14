import Button from 'components/Button'
import Modal from 'components/Modal'
import WalletLayout from 'components/WalletLayout'
import { Gateway } from 'gateway'
import { useEffect, useState } from 'react'
import WalletCreateBackup from './backup'
import WalletCreateConfirm from './confirm'
import WalletCreateGenerating from './generating'
import WalletCreateNotice from './notice'
import WalletCreatePrompt from './prompt'

export type WalletCreateProps = {
  open: boolean
  onSettle: (result: boolean) => void
}

export default function WalletCreate({
  open,
  onSettle,
}: WalletCreateProps): React.ReactElement | null {
  const [state, setState] = useState<
    'notice' | 'prompt' | 'generating' | 'backup' | 'confirm'
  >('notice')
  useEffect(() => {
    if (!open) {
      setState('notice')
    }
  }, [open])

  if (!open) {
    return null
  }
  switch (state) {
    case 'notice':
      return (
        <WalletCreateNotice
          onSettle={(value) => {
            if (value) {
              setState('prompt')
            } else {
              onSettle(false)
            }
          }}
        />
      )
    case 'prompt':
      return (
        <WalletCreatePrompt
          onSettle={(value) => {
            if (value) {
              setState('generating')
            } else {
              onSettle(false)
            }
          }}
        />
      )
    case 'generating':
      return (
        <WalletCreateGenerating
          onSettle={(value) => {
            if (value) {
              setState('backup')
            } else {
              setState('prompt')
            }
          }}
        />
      )
    case 'backup':
      return (
        <WalletCreateBackup
          onSettle={(value) => {
            if (value) {
              setState('confirm')
            }
          }}
        />
      )
    case 'confirm':
      return (
        <WalletCreateConfirm
          onSettle={(value) => {
            if (value) {
              onSettle(true)
            } else {
              setState('backup')
            }
          }}
        />
      )
  }
}
