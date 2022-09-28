export type Wallet = {
  info: {
    name: string
    address: string
    balance: number
    unlockedBalance: number
    viewOnly: boolean
  }
  secret: {
    mnemonic: string
    viewKey?: string
    spendKey?: string
  }
  // TODO specify a type for address with balance and used and stuff
  addressList: {
    used?: Array<string>
    unused?: Array<string>
    addressBook?: Array<string>
  }
  transactions?: Array<{
    from: string
    to: string
    amount: number
  }>
}
