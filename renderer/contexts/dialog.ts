import { EventEmitter } from 'stream'
import { DialogParams } from 'types'
import { TypedEventEmitter } from '../../main/types/utils'

export type DialogEventDetail = { open: DialogParams; settle: boolean }

export class DialogClass extends EventEmitter {
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

  public settle(result: boolean) {
    this.emit('settle', result)
  }
}

const Dialog = DialogClass.instance as TypedEventEmitter<
  DialogClass,
  DialogEventDetail
>
export { Dialog }
