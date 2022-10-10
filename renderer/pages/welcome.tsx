import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useMatrixEffect } from 'hooks/matrix-effect'
import Button from 'components/Button'
import Preferences from 'components/Preferences'

function WelcomePage() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const canvas2 = useRef<HTMLCanvasElement>(null)
  useMatrixEffect(canvas, canvas2)
  const router = useRouter()
  const [initConfigState, setInitConfigState] = useState<
    'undone' | 'doing' | 'done'
  >('undone')
  useEffect(() => {
    if (initConfigState === 'done') {
      router.push('/')
    }
  }, [initConfigState])

  return (
    <div className="absolute inset-0 children:absolute children:inset-0">
      <canvas ref={canvas} />
      <canvas ref={canvas2} />
      <div className="flex flex-col gap-12 items-center justify-center drop-shadow-lg shadow-black">
        <img src="/images/logo.svg" className="opacity-70 h-32 object-cover" />
        <div className="text-2xl">welcome to Ombre wallet</div>
        <Button
          btnType="secondary"
          job={() => {
            setInitConfigState('doing')
          }}>
          proceed
        </Button>
        <Preferences
          open={initConfigState === 'doing'}
          onClose={() => setInitConfigState('done')}
          initConfig
        />
      </div>
    </div>
  )
}

export default WelcomePage
