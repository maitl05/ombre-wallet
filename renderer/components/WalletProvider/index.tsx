import { WalletCtx } from 'contexts/wallet'
import React, { ReactNode, useEffect, useState } from 'react'
import { Wallet } from 'types/wallet'

export type WalletProviderProps = {
  children: ReactNode
}

export default function WalletProvider({
  children,
}: WalletProviderProps): React.ReactElement {
  const [wallet, setWallet] = useState<Wallet>()

  useEffect(() => {
    setWallet(mockWallet)
  }, [])

  return <WalletCtx.Provider value={{ wallet }}>{children}</WalletCtx.Provider>
}

// TODO remove this
let mockWallet: Wallet = {
  info: {
    name: 'my-ombre-wallet',
    address:
      'cashM3yWFHJ6hyxUqS1zYjjAMTSWrcUm5Cpc1bSdwNyCEmP2ii8EfVWLvvjysm2YXBXM2vGvpkGUs42RD1ihi9uD39CkCE9fdk',
    balance: 1253.22,
    unlockedBalance: 253.11,
    viewOnly: false,
  },
  secret: {
    mnemonic:
      'usher slackens mural tattoo angled guru swagger people nobody folding imagine wrong ripped arrow',
    viewKey: '',
    spendKey: '',
  },
  addressList: {
    used: [],
    unused: [
      'cashM3yWFHJ6hyxUqS1zYjjAMTSWrcUm5Cpc1bSdwNyCEmP2ii8EfVWLvvjysm2YXBXM2vGvpkGUs42RD1ihi9uD39CkCEind0',
      'cashM3yWFHJ6hyxUqS1zYjjAMTSWrcUm5Cpc1bSdwNyCEmP2ii8EfVWLvvjysm2YXBXM2vGvpkGUs42RD1ihi9uD39CkCEind1',
      'cashM3yWFHJ6hyxUqS1zYjjAMTSWrcUm5Cpc1bSdwNyCEmP2ii8EfVWLvvjysm2YXBXM2vGvpkGUs42RD1ihi9uD39CkCEind2',
      'cashM3yWFHJ6hyxUqS1zYjjAMTSWrcUm5Cpc1bSdwNyCEmP2ii8EfVWLvvjysm2YXBXM2vGvpkGUs42RD1ihi9uD39CkCEind3',
    ],
    addressBook: [],
  },
  transactions: [
    {
      from: 'cashM3yWFHJ6hyxUqS1zYjjAMTSWrcUm5Cpc1bSdwNyCEmP2ii8EfVWLvvjysm2YXBXM2vGvpkGUs42RD1ihi9uD39CkCE1234',
      to: 'cashM3yWFHJ6hyxUqS1zYjjAMTSWrcUm5Cpc1bSdwNyCEmP2ii8EfVWLvvjysm2YXBXM2vGvpkGUs42RD1ihi9uD39CkCE2345',
      amount: 123,
    },
    {
      from: 'cashM3yWFHJ6hyxUqS1zYjjAMTSWrcUm5Cpc1bSdwNyCEmP2ii8EfVWLvvjysm2YXBXM2vGvpkGUs42RD1ihi9uD39CkCE1234',
      to: 'cashM3yWFHJ6hyxUqS1zYjjAMTSWrcUm5Cpc1bSdwNyCEmP2ii8EfVWLvvjysm2YXBXM2vGvpkGUs42RD1ihi9uD39CkCE5678',
      amount: 172,
    },
  ],
}

// sample addresses
// integrated address
// casiLpKfELY6hyxUqS1zYjjAMTSWrcUm5Cpc1bSdwNyCEmP2ii8EfVWLvvjysm2YXBXM2vGvpkGUs42RD1ihi9uDATCr2k8wPFV8axfu2X9DF

// regular address
// cashM3yWFHJ6hyxUqS1zYjjAMTSWrcUm5Cpc1bSdwNyCEmP2ii8EfVWLvvjysm2YXBXM2vGvpkGUs42RD1ihi9uD39CkCE9fdk

// payment id
// c6855d81e0c82b4e
