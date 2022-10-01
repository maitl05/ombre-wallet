import React, { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import WalletProvider from 'components/WalletProvider'
import 'react-toastify/ReactToastify.min.css'

import '../styles/globals.css'
import DialogProvider from 'components/DialogProvider'
import { ToastContainer } from 'react-toastify'
import { Gateway } from 'gateway'
import { ipcRenderer } from 'electron'

function MyApp({ Component, pageProps }: AppProps) {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    if (Gateway.i) {
      ipcRenderer.send('isReady')
      setIsReady(true)
    }
  })
  if (!isReady) {
    return null
  }
  return (
    <>
      <Head>
        <title>Ombre wallet</title>
      </Head>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
      <DialogProvider />
      <ToastContainer theme="dark" />
    </>
  )
}

export default MyApp
