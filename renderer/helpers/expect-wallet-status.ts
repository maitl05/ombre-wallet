import { Store } from 'contexts/store'
import { Gateway } from 'gateway'
import { StoreState } from 'types/Store'

export const walletStatusChange = {
  prepare(): void {
    Store.resetWalletData()
  },
  expect(): Promise<StoreState['wallet']> {
    return new Promise<StoreState['wallet']>((resolve, reject) => {
      const sub = [
        Store.on('wallet', (currentWallet) => {
          if (currentWallet.status.code === 1) {
            return
          }
          sub.forEach((x) => x())
          if (currentWallet.status.code === 0) {
            return resolve(currentWallet)
          }
          return reject(currentWallet.status.message)
        }),
      ]
    })
  },
}
