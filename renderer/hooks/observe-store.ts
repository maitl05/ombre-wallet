import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Store } from '../contexts/store'
import { StoreState } from '../types/Store'

export function useStore<K extends keyof StoreState, R = StoreState[K]>(
  keyToObserve: K,
  selector: (value: StoreState[K]) => R = _.identity,
) {
  const [state, setState] = useState<R>(() =>
    selector(Store.state[keyToObserve]),
  )
  useEffect(() => {
    function listener(value: StoreState[K]) {
      setState((prev) => {
        const res = selector(value)
        return _.isEqual(prev, res) ? prev : res
      })
    }
    Store.on(keyToObserve, listener)

    return () => {
      Store.off(keyToObserve, listener)
    }
  }, [Store])

  return state
}
