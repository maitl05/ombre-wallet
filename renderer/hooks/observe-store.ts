import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Store } from 'contexts/store'
import { StoreState } from 'types/Store'

export function useStore<K extends keyof StoreState, R = StoreState[K]>(
  keyToObserve: K,
  selector?: (value: StoreState[K]) => R,
)
export function useStore<R = StoreState>(
  keyToObserve: '*',
  selector?: (value: StoreState) => R,
)
export function useStore<K extends keyof StoreState, R = StoreState[K]>(
  keyToObserve: K | '*',
  selector: (value: StoreState[K] | StoreState) => R = _.identity,
) {
  const [state, setState] = useState<R>(() =>
    selector(keyToObserve === '*' ? Store.state : Store.state[keyToObserve]),
  )
  useEffect(() => {
    function listener(value: StoreState[K] | StoreState) {
      setState((prev) => {
        const res = selector(value)
        return _.isEqual(prev, res) ? prev : res
      })
    }
    return Store.on(keyToObserve, listener)
  }, [Store])

  return state
}
