import { DialogParams } from 'types'
import { Subscribable } from 'types/utils'

export type DialogEventDetail = {
  open: DialogParams
  settle: { result: boolean; value?: string }
}

class DialogClass extends Subscribable<DialogEventDetail> {
  private constructor() {
    super()
  }

  private static _instance: DialogClass
  static get instance() {
    if (!DialogClass._instance) {
      DialogClass._instance = new DialogClass()
    }
    return DialogClass._instance
  }
  static set instance(_) {
    throw new Error('E_READONLY')
  }

  public open(args: DialogParams) {
    this.emit('open', args)
  }

  public settle(result: boolean, value?: string) {
    this.emit('settle', { result, value })
  }
}

const Dialog = DialogClass.instance
export { Dialog }
