import Button from 'components/Button'
import Modal from 'components/Modal'
import WalletLayout from 'components/WalletLayout'
import { useState } from 'react'

export type WalletCreateProps = {
  onSettle: (result: boolean) => void
}

export default function WalletCreateNotice({
  onSettle,
}: WalletCreateProps): React.ReactElement | null {
  return (
    <Modal title="Add a new wallet" open onClose={() => {}}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-bold">Be safe & secure</h2>
          We highly recommend that you read our guide on How to Prevent Loss &
          Theft for some recommendations on how to be proactive about your
          security.
        </div>
        <div>
          <h2 className="text-lg font-bold">Always backup your key</h2>
          You do not create an account or give us your funds to hold onto. No
          data leaves your computer. We make it easy for you to create, save,
          and access your information and interact with the blockchain.
        </div>
        <div>
          <h2 className="text-lg font-bold">
            We are not responsible for any loss
          </h2>
          Obmre, and some of the underlying Javascript libraries we use are
          under active development. While we have thoroughly tested & tens of
          thousands of wallets have been successfully created by people all over
          the globe, there is always the possibility something unexpected
          happens that causes your funds to be lost. Please do not invest more
          than you are willing to lose, and please be careful.
        </div>
        <div className="flex justify-between gap-3">
          <Button btnType="primary" job={() => onSettle(false)}>
            cancel
          </Button>
          <Button btnType="secondary" job={() => onSettle(true)}>
            proceed
          </Button>
        </div>
      </div>
    </Modal>
  )
}
