import cn from 'classnames'
import React, { useContext, useMemo } from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import _ from 'lodash'
import crypto from 'crypto'

import type { ClassName } from 'types'
import { RemToPx } from 'helpers/remToPx'

export type AddressPhotoProps = {
  className?: ClassName
  dimensions?: string | number
  paperStyles?: React.CSSProperties
  address: string
}

export default function AddressPhoto({
  className,
  dimensions = '6rem',
  paperStyles = {},
  address,
}: AddressPhotoProps): React.ReactElement | null {
  const seed = useMemo(() => {
    if (address) {
      return jsNumberForAddress(
        crypto.createHash('sha256').update(address).digest('hex'),
      )
    } else {
      return undefined
    }
  }, [address])

  const dim = _.isNumber(dimensions) ? dimensions : RemToPx(dimensions)

  return seed ? (
    <div className={cn(className)}>
      <Jazzicon
        paperStyles={{ ...paperStyles, borderRadius: '0.75rem' }}
        diameter={dim}
        seed={seed}
      />
    </div>
  ) : null
}
