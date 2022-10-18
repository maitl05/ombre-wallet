import { useEffect, useState } from 'react'
import WalletRecoverGenerating from './generating'
import WalletRecoverPrompt from './prompt'

export type WalletRecoverProps = {
  open: boolean
  onSettle: (result: boolean) => void
}

export default function WalletRecover({
  open,
  onSettle,
}: WalletRecoverProps): React.ReactElement | null {
  const [state, setState] = useState<'prompt' | 'generating'>('prompt')
  useEffect(() => {
    if (!open) {
      setState('prompt')
    }
  }, [open])

  if (!open) {
    return null
  }
  switch (state) {
    case 'prompt':
      return (
        <WalletRecoverPrompt
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
        <WalletRecoverGenerating
          onSettle={(value) => {
            if (value) {
              onSettle(true)
            } else {
              setState('prompt')
            }
          }}
        />
      )
  }
}
