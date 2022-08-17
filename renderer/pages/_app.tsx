import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ombre wallet</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
