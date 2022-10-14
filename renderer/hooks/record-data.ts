import { setRecordState } from 'helpers/setRecordState'
import _ from 'lodash'
import { useMemo, useState } from 'react'

export function useRecordData<T extends Record<string, unknown> | unknown[]>(
  initialValue: T,
): [
  state: T,
  setter: <R>(
    path: _.PropertyPath,
    selector?: (value: R) => unknown,
  ) => (value: R) => void,
  reset: () => void,
] {
  const [pageData, setPageData] = useState<T>(initialValue)
  const setData = useMemo(() => setRecordState(setPageData), [setPageData])
  const reset = useMemo(
    () => () => {
      setPageData(initialValue)
    },
    [setPageData, initialValue],
  )

  return [pageData, setData, reset]
}
