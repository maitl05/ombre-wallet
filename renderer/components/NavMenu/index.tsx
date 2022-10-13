import cn from 'classnames'
import { ClassName } from 'types'
import _ from 'lodash'
import { NavMenuLinks, NavMenuRouteData } from './routes'
import NavLink from 'components/NavLink'

export type NavMenuProps = { className?: ClassName }

export default function NavMenu({ className, ...props }: NavMenuProps) {
  return (
    <div className={cn('', className)}>
      <img className="m-auto p-5 h-28 object-center" src="/images/logo.svg" />

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
