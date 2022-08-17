import NavMenu from 'components/NavMenu'
import { ClassName } from 'types'

export type WalletLayoutProps = {
  className?: ClassName
} & React.HTMLAttributes<HTMLDivElement>

export default function WalletLayout({
  className,
  children,
  ...props
}: WalletLayoutProps) {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-full max-w-sm">
        <NavMenu />
      </div>
      <div>{children}</div>
    </div>
  )
}
