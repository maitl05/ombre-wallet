import { Store } from 'contexts/store'
import { Gateway } from 'gateway'
import { StoreState } from 'types/Store'

export const txStatusChange = {
  prepare(): void {
    Store.update({ tx_status: { code: 1 } })
  },
  expect(): Promise<StoreState['tx_status']> {
    return new Promise<StoreState['tx_status']>((resolve, reject) => {
      const sub = [
        Store.on('tx_status', (txStatus) => {
          if (txStatus.code === 1) {
            return
          }
          sub.forEach((x) => x())
          if (txStatus.code === 0) {
            return resolve(txStatus)
          }
          return reject(txStatus.message)
        }),
      ]
    })
  },
}
