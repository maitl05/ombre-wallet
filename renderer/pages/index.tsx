import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import LoadingOverlay from 'components/LoadingOverlay'
import { ipcRenderer } from 'electron'
import { Dialog } from 'contexts/dialog'
import { useStore } from 'hooks/observe-store'

//TODO: this page checks for existence of config file for user and if
//TODO: it doesn't find one redirects to welcome page otherwise
//TODO: redirects the wallet-select page in other scenarios it tries
//TODO: to connect to remote node and if fails shows error
//TODO debug

function Index() {
  const [isConnected, setIsConnected] = React.useState(false)
  const router = useRouter()
  //TODO check for config file and redirect
  setTimeout(() => {
    setIsConnected(true)
  }, 3000)

  useEffect(() => {
    ipcRenderer.on('confirmClose', () => {
      console.log('hi')
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

  useEffect(() => {
    if (isConnected) {
      router.push('/wallet-select')
    }
  }, [isConnected])

  const isFirstBoot = useStore(
    'app',
    (e) => e.status.code,
    //  !== undefined && e.status.code == AppStatus.FirstBoot,
  )

  useEffect(() => {
    // if (isFirstBoot) {
    //   Gateway.i.send('core', 'save_config_init', Store.state)
    // }
  }, [isFirstBoot])

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
