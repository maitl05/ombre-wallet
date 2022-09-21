import React, { useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import { ClassName } from 'types'
import _ from 'lodash'
import { shell } from 'electron'
import { ExternalLinkData, ExternalLinks } from './externalLinks'
import { WalletCtx } from 'contexts/wallet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export type WalletFooterProps = {
  className?: ClassName
}

function handleExternalLink(address: string): void {
  shell.openExternal(address)
}

export default function WalletHeader({
  className,
}: WalletFooterProps): React.ReactElement | null {
  const { wallet } = useContext(WalletCtx)
  const [balance, setBalance] = useState(null)
  const [hideBalance, setHideBalance] = useState(false)

  useEffect(() => {
    setBalance(wallet?.info.balance)
  }, [wallet])

  return (
    <div className={cn('', className)}>
      <div className="flex justify-between">
        <span>Balance:</span>
        <span className="children:pl-3">
          {hideBalance ? (
            <>
              {'********'}
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={() => setHideBalance(false)}
              />
            </>
          ) : (
            <>
              {balance ?? '---------'}
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => setHideBalance(true)}
              />
            </>
          )}
        </span>
      </div>
      <hr className="mt-3" />
      <div
        className={cn(
          'children:p-2 children:justify-center children:flex children:text-text-secondary hover:children:text-secondary-400 children:transition-colors children:cursor-pointer',

          'flex flex-col text-2xl items-start ',
        )}>
        {_.values(ExternalLinks).map((link, index) => (
          <a
            className="flex gap-3 items-center text-lg"
            key={index}
            onClick={() => handleExternalLink(ExternalLinkData[link].address)}>
            {ExternalLinkData[link].icon} {ExternalLinkData[link].name}
          </a>
        ))}
      </div>
    </div>
  )
}
