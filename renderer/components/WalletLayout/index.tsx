import { ClassName } from 'types'
import NavMenu from 'components/NavMenu'
import WalletHeader from 'components/WalletLayout/Header'
import WalletFooter from 'components/WalletLayout/Footer'

export type WalletLayoutProps = {
  title?: string
  className?: ClassName
} & React.HTMLAttributes<HTMLDivElement>

export default function WalletLayout({
  title,
  className,
  children,
  ...props
}: WalletLayoutProps) {
  return (
    <div className="w-screen h-screen flex gap-5 p-5">
      <div className="flex flex-col justify-between w-full max-w-xs">
        <NavMenu />
        <WalletFooter />
      </div>

      <div className="flex flex-col flex-grow">
        <WalletHeader title={title} />
        <div>{children}</div>
      </div>
    </div>
  )
}
