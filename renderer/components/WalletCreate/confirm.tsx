import Button from 'components/Button'
import Input from 'components/Input'
import Modal from 'components/Modal'
import WalletLayout from 'components/WalletLayout'
import { useStore } from 'hooks/observe-store'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import WalletPhrases from './phrases'

export type WalletCreateProps = {
  onSettle: (result: boolean) => void
}

export default function WalletCreateConfirm({
  onSettle,
}: WalletCreateProps): React.ReactElement | null {
  const [hasError, setHasError] = useState(true)
  const handleSubmit = () => {
    onSettle(true)
  }
  const wallet = useStore('wallet')
  const [verifiedPhrases, setVerifiedPhrases] = useState<string[]>([])
  const [phrasesToVerify, setPhraseToVerify] = useState<string[]>([])

  const handleReset = useMemo(
    () => () => {
      setPhraseToVerify(
        wallet.secret.mnemonic.split(' ').sort(() => _.random(-1, 1, true)),
      )
      setVerifiedPhrases([])
    },
    [setPhraseToVerify],
  )

  useEffect(() => {
    handleReset()
  }, [wallet.secret.mnemonic, handleReset])

  const handleAdd = useMemo(
    () => (index: number) => {
      setPhraseToVerify((prev) => {
        setVerifiedPhrases((_prev) => [..._prev, prev[index]])
        return prev.filter((_, i) => i !== index)
      })
    },
    [setPhraseToVerify],
  )

  useEffect(() => {
    setHasError(wallet.secret.mnemonic !== verifiedPhrases.join(' ').trim())
  }, [wallet, verifiedPhrases])

  return (
    <Modal title="Confirm your backup" open onClose={() => {}}>
      <h2 className="text-lg font-bold">Let’s verify your credentials</h2>
      <div className="h-80 overflow-hidden relative">
        {_.isEmpty(verifiedPhrases) && (
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="bg-primary-900 rounded-3xl px-10 py-4">
              select your phrases in order
            </div>
          </div>
        )}
        <WalletPhrases phrases={verifiedPhrases} />
      </div>
      <hr className="py-2" />
      <div className="h-80 overflow-hidden">
        <WalletPhrases
          phrases={phrasesToVerify}
          onClick={handleAdd}
          showIndex={false}
        />
      </div>
      <div className="flex justify-between gap-3 w-screen max-w-lg">
        <Button btnType="primary" job={() => onSettle(false)}>
          go back
        </Button>
        <Button btnType="primary" job={handleReset}>
          reset
        </Button>
        <Button btnType="secondary" job={handleSubmit} disabled={hasError}>
          proceed
        </Button>
      </div>
    </Modal>
  )
}
