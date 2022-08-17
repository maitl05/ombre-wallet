import WalletLayout from 'components/WalletLayout'
import Button from 'components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Input from 'components/Input'

export default function WalletInfo() {
  return (
    <WalletLayout>
      <h1>your wallet info</h1>
      <Button btnType="primary">
        <FontAwesomeIcon icon={faPlus} /> useless button
      </Button>
      <Input></Input>
    </WalletLayout>
  )
}
