import WalletLayout from 'components/WalletLayout'
import Button from 'components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Input from 'components/Input'
import { testHelloValidator } from 'helpers/validators'
import { useState } from 'react'

export default function WalletInfo() {
  const [testInp, setTestInp] = useState('')

  return (
    <WalletLayout title="Account info">
      <h1>your wallet info</h1>
      {/* //TODO debug this is for test remove later */}
      <Button btnType="primary">
        <FontAwesomeIcon icon={faPlus} /> useless button
      </Button>
      {/* //TODO debug this is for test remove later */}
      <Input
        label="say hello"
        onBlur={(e) => setTestInp(e.target.value)}
        validator={testHelloValidator}></Input>
    </WalletLayout>
  )
}
