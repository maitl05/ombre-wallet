import { createContext } from 'react'
import { Wallet } from 'types/wallet'

export const WalletCtx = createContext<{ wallet?: Wallet | undefined }>({})
