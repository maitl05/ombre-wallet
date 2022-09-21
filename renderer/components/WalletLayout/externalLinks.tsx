import { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons'

export enum ExternalLinks {
  github = 'Github',
  website = 'Website',
  telegram = 'Telegram',
}

export const ExternalLinkData: {
  [key in ExternalLinks]: { icon: ReactElement; name: string; address: string }
} = {
  [ExternalLinks.github]: {
    icon: <FontAwesomeIcon icon={faGithub} />,
    address: 'https://github.com/ombre-project',
    name: 'Github',
  },
  [ExternalLinks.website]: {
    icon: <FontAwesomeIcon icon={faGlobe} />,
    address: 'http://www.ombre.cash/',
    name: 'Website',
  },
  [ExternalLinks.telegram]: {
    icon: <FontAwesomeIcon icon={faTelegram} />,
    address: 'https://t.me/joinchat/GS1FBBHCq6u-LdMIUoCjOw',
    name: 'Telegram',
  },
}
