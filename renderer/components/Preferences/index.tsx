import React, { useEffect, useState } from 'react'
import Modal from 'components/Modal'
import Input from 'components/Input'
import { useStore } from 'hooks/observe-store'
import Button from 'components/Button'
import { portValidator } from 'helpers/validators'
import _ from 'lodash'
import { StoreState } from 'types/Store'
import { Gateway } from 'gateway'
import { setRecordState } from 'helpers/setRecordState'

export type PreferencesProps = {
  open: boolean
  initConfig?: boolean
  onClose: () => void
}

export default function Preferences({
  open,
  onClose,
  initConfig = false,
}: PreferencesProps): React.ReactElement {
  const [render, setRender] = useState(false)

  const config = useStore('*', (e) => {
    const res = {}
    _.merge(res, _.omit(e, 'app.pending_config'), e.app.pending_config)
    return res as typeof e
  })
  const [pendingConfig, setPendingConfig] = useState<StoreState>()
  const [hasError, setHasError] = useState<boolean[]>([])

  useEffect(() => {
    if (config) {
      setPendingConfig(config)
      setRender(true)
    }
  }, [config])

  return (
    <>
      {render ? (
        <Modal
          className={'w-1/2'}
          open={open}
          onClose={() => {}}
          title="Settings">
          <div className="flex flex-col justify-center gap-5">
            <p>
              Wallet will connect to a remote node to make all transactions.
            </p>
            <Input
              onErrorStateChange={setRecordState(setHasError)(0)}
              label="Remote Node Address"
              value={pendingConfig.daemon.remote_host}
              onBlur={setRecordState(setPendingConfig)(
                'daemon.remote_host',
                (e) => e.target.value,
              )}
            />
            <Input
              onErrorStateChange={setRecordState(setHasError)(1)}
              className={{ container: 'w-1/2' }}
              label="Remote Node Port"
              value={String(pendingConfig.daemon.remote_port)}
              validator={portValidator}
              onBlur={setRecordState(setPendingConfig)(
                'daemon.remote_port',
                (e) => Number(e.target.value),
              )}
            />
          </div>
          <div className="mt-auto ml-auto children:m-2">
            <Button
              btnType="primary"
              disabled={hasError.some(_.identity)}
              job={() => {
                onClose()
              }}>
              cancel
            </Button>
            <Button
              btnType="secondary"
              disabled={hasError.some(_.identity)}
              job={() => {
                Gateway.i.send(
                  'core',
                  initConfig ? 'save_config_init' : 'save_config',
                  pendingConfig,
                )
                onClose()
              }}>
              save
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  )
}
