import React, { useMemo } from 'react'
import cn from 'classnames'
import type { ClassName } from 'types'
import { useRouter } from 'next/router'
import Link from 'next/link'

export type NavLinkProps = {
  className?: ClassName
  title: string
  href: string
  icon: React.ReactElement
}

export default function NavLink({
  className,
  title,
  href,
  icon,
}: NavLinkProps): React.ReactElement | null {
  const router = useRouter()
  const isActive = useMemo(
    () => router?.pathname === href,
    [router?.pathname, href],
  )
  return (
    <>
      <Link href={href} passHref>
        <a
          className={cn(
            'flex text-lg gap-3 items-center border-b-2 border-primary-600 px-3 py-2 transition-colors',
            isActive && 'font-extrabold text-secondary-300',
            !isActive && 'hover:text-white',
          )}>
          {icon}
          {title}
        </a>
      </Link>
    </>
  )
}
