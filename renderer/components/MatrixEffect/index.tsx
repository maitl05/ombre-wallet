import React, { useRef } from 'react'
import cn from 'classnames'
import type { ClassName } from 'types'
import { useMatrixEffect } from 'hooks/matrix-effect'

export default function MatrixEffect(): React.ReactElement | null {
  const canvas = useRef<HTMLCanvasElement>(null)
  const canvas2 = useRef<HTMLCanvasElement>(null)
  useMatrixEffect(canvas, canvas2)

  return (
    <div className="-z-10 absolute inset-0 children:absolute children:inset-0">
      <canvas ref={canvas} />
      <canvas ref={canvas2} />
    </div>
  )
}
