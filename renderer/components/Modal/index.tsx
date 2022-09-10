import React, { ReactNode, useEffect, useState } from 'react'
import cn from 'classnames'
import ReactDOM from 'react-dom'
import { ClassName } from 'types'

export type ModalProps = {
  title: string
  className?: ClassName
  open: boolean
  onClose: () => void
  children?: ReactNode
}

export default function Modal({
  title,
  open,
  onClose,
  children,
}: ModalProps): React.ReactElement {
  const [loaded, setLoaded] = useState(false)
  function escHandler({ key }) {
    if (key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    setLoaded(true)

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', escHandler)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', escHandler)
      }
    }
  }, [])

  if (loaded) {
    return ReactDOM.createPortal(
      <div
        className={cn(
          'absolute top-0 left-0 w-full h-full flex items-center justify-center inset-0',
          !open && 'pointer-events-none',
        )}>
        {/* backdrop */}
        <div
          className={cn(
            'absolute bg-black inset-0',
            open ? 'opacity-50' : 'pointer-events-none opacity-0',
            'transition-opacity duration-300 ease-in-out',
          )}
          onClick={onClose}
        />

        {/* content */}
        <div
          className={cn(
            'fixed flex flex-col bg-primary-800 shadow-lg max-w-screen-sm p-5 rounded-lg gap-3 border-primary-300 border-2',
            open ? 'opacity-100' : 'pointer-events-none opacity-0',
            'transition-opacity duration-300 ease-in-out',
          )}>
          <div className="text-xl font-bold pb-2">{title}</div>
          {children}
        </div>
      </div>,
      document.body,
    )
  } else {
    return null
  }
}
