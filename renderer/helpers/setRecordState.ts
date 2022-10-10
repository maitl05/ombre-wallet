import { Dispatch } from 'react'

export function setRecordState(
  setter: Dispatch<React.SetStateAction<unknown[] | Record<string, unknown>>>,
) {
  return function setForPath<T>(
    path: _.PropertyPath,
    selector: (value: T) => unknown = (e) => e,
  ): (value: T) => void {
    return (value) => {
      setter((prev) =>
        _.set(_.isArray(prev) ? [...prev] : { ...prev }, path, selector(value)),
      )
    }
  }
}
