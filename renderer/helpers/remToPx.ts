import _ from 'lodash'

export function RemToPx(rem: number | string): number {
  if (_.isString(rem) && rem.endsWith('px')) {
    return parseFloat(rem)
  }
  if (_.isString(rem) && !rem.endsWith('rem')) {
    throw new Error('Unsupported input: must be rem or px')
  }
  return parseFloat(String(rem)) * PxPerRem()
}

export function PxPerRem(): number {
  if (typeof window === 'undefined') {
    return 16
  }
  return parseFloat(getComputedStyle(document.documentElement).fontSize)
}
