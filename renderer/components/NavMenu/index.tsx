import cn from 'classnames'
import Link from 'next/link'
import { ClassName } from 'types'
import _ from 'lodash'
import { NavMenuLinks, NavMenuRouteData } from './routes'
import NavLink from 'components/NavLink'

export type NavMenuProps = { className?: ClassName }

export default function NavMenu({ className, ...props }: NavMenuProps) {
  return (
    <div className={cn('px-5', className)}>
      <Link href="/">
        <img className="m-auto p-5" src="/images/logo.svg" />
      </Link>
      <hr className="mb-4" />

      <div className="flex flex-col gap-2">
        {_.values(NavMenuLinks).map((link, index) => (
          <NavLink
            href={`/wallet/${link}`}
            key={index}
            title={NavMenuRouteData[link].title}
            icon={NavMenuRouteData[link].icon}
          />
        ))}
      </div>
    </div>
  )
}
