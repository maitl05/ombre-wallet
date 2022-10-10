import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import LoadingOverlay from 'components/LoadingOverlay'
import { ipcRenderer } from 'electron'
import { Dialog } from 'contexts/dialog'
import { useStore } from 'hooks/observe-store'
import { AppStatus } from 'types/Store'
import { Gateway } from 'gateway'
import { Store } from 'contexts/store'

//TODO: this page checks for existence of config file for user and if
//TODO: it doesn't find one redirects to welcome page otherwise
//TODO: redirects the wallet-select page in other scenarios it tries
//TODO: to connect to remote node and if fails shows error
//TODO debug

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
      Dialog.once('settle', (value) => {
        if (value) {
          ipcRenderer.send('confirmClose', true)
        }
      })
    })
  }, [])

  const status = useStore(
    'app',
    (e) => e.status.code !== undefined && e.status.code,
  )

  useEffect(() => {
    switch (status) {
      case AppStatus.FirstBoot:
        router.push('/welcome')
        break
      case AppStatus.WalletSelect:
        router.push('/wallet-select')
        break
    }
  }, [status])

  return (
    <>
      <div className="flex flex-col justify-center items-center text-2xl w-full h-screen">
        <span>
          connecting to remote node...
          <LoadingOverlay visible={true} />
        </span>
      </div>
    </>
  )
}

export default Index
