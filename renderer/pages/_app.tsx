import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import WalletProvider from 'components/WalletProvider'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ombre wallet</title>
      </Head>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </>
  )
}

export default MyApp
