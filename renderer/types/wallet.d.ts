// wallet: {
//   status: {
//       code: 1,
//       message: null
//   },
//   info: {
//       name: "",
//       address: "",
//       height: 0,
//       balance: 0,
//       unlocked_balance: 0,
//       view_only: false
//   },
//   secret: {
//       mnemonic: "",
//       view_key: "",
//       spend_key: ""
//   },
//   transactions: {
//       tx_list: [],
//   },
//   address_list: {
//       used: [],
//       unused: [],
//       address_book: [],
//   }
// },

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
}
