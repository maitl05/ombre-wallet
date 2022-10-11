import React, { useEffect, useContext, useState, useRef } from 'react'
import { NextRouter, useRouter } from 'next/router'
import LoadingOverlay from 'components/LoadingOverlay'
import { ipcRenderer } from 'electron'
import { Dialog } from 'contexts/dialog'
import { useStore } from 'hooks/observe-store'
import { AppStatus } from 'types/Store'
import _ from 'lodash'
import MatrixEffect from 'components/MatrixEffect'

function Index() {
  const router = useRouter()

  useEffect(() => {
    ipcRenderer.on('confirmClose', () => {
      Dialog.open({
        message: 'Are you sure you want to exit?',
        title: 'Exit',
        ok: 'Exit',
        cancel: 'Cancel',
      })
      Dialog.once('settle', ({ result }) => {
        if (result) {
          ipcRenderer.send('confirmClose', true)
        }
      })
    })
  }, [])

  const status = useStore(
    'app',
    (e) => e.status.code !== undefined && e.status.code,
  )

  const takeActionIfNeeded = useRef(
    _.throttle(
      (status: AppStatus, router: NextRouter) => {
        switch (status) {
          case AppStatus.FirstBoot:
            router.push('/welcome')
            break
          case AppStatus.WalletSelect:
            router.push('/wallet-select')
            break
        }
      },
      1000,
      { leading: false, trailing: true },
    ),
  )

  useEffect(() => {
    takeActionIfNeeded.current(status, router)
  }, [status, router])

  const [message, setMessage] = useState('loading')
  useEffect(() => {
    switch (status) {
      case AppStatus.ConnectingToBackend:
        setMessage('connecting to backend')
        break
      case AppStatus.LoadingSettings:
        setMessage('loading settings')
        break
      case AppStatus.StartingDaemon:
        setMessage('starting daemon')
        break
      case AppStatus.StartingWallet:
        setMessage('starting wallet')
        break
      case AppStatus.ReadingWallet:
        setMessage('reading wallet list')
        break
      case AppStatus.ShuttingDown:
        setMessage('shutting down')
        break
    }
  }, [status])

  return (
    <div className="flex gap-3 justify-center items-center text-2xl w-full h-screen">
      <MatrixEffect />
      <LoadingOverlay visible={true} />
      <span className="pb-1">{message}</span>
    </div>
  )
}

export default Index
