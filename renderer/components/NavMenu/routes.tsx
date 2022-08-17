import { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWallet,
  faArrowUpFromBracket,
  faArrowDown,
  faAddressBook,
  faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons'

export enum NavMenuLinks {
  wallet = 'info',
  send = 'send',
  receive = 'receive',
  addresses = 'addresses',
  history = 'history',
}
export const NavMenuRouteData: {
  [key in NavMenuLinks]: {
    title: string
    icon: ReactElement
  }
} = {
  [NavMenuLinks.wallet]: {
    title: 'Wallet',
    icon: <FontAwesomeIcon icon={faWallet} />,
  },
  [NavMenuLinks.send]: {
    title: 'Send',
    icon: <FontAwesomeIcon icon={faArrowUpFromBracket} />,
  },
  [NavMenuLinks.receive]: {
    title: 'Receive',
    icon: <FontAwesomeIcon icon={faArrowDown} />,
  },
  [NavMenuLinks.addresses]: {
    title: 'Addresses',
    icon: <FontAwesomeIcon icon={faAddressBook} />,
  },
  [NavMenuLinks.history]: {
    title: 'History',
    icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
  },
}
