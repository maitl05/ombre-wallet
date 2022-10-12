import { createContext } from 'react'
import { Wallet } from 'types/wallet'

/**@deprecated */
export const WalletCtx = createContext<{ wallet?: Wallet | undefined }>({})
