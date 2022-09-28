import _ from 'lodash'
import { storeDefaultState } from '../static/store-defaults'
import { StoreState } from '../types/Store'
import { EventEmitter } from 'events'
import { TypedEventEmitter } from '../types/utils'

class StoreClass extends EventEmitter {
  private constructor() {
    super()
  }

  private static _instance: StoreClass
  static get instance() {
    if (!StoreClass._instance) {
      StoreClass._instance = new StoreClass()
    }
    return StoreClass._instance
  }
  static set instance(_) {
    throw new Error('E_READONLY')
  }

  _state: StoreState = storeDefaultState
  get state() {
    return this._state
  }
  set state(_) {
    throw new Error('E_READONLY')
  }

  public update(value: Partial<StoreState>) {
    const res = {}
    _.assign(res, this._state, value)
    this._state = res as StoreState
    _.keys(value).forEach((key) => this.emit(key, res[key]))
  }

  get isReady() {
    let target_height
    if (
      this._state.app.config.daemon.type === 'local' &&
      !this._state.daemon.info.is_ready
    ) {
      target_height = Math.max(
        this._state.daemon.info.height,
        this._state.daemon.info.target_height,
      )
    } else {
      target_height = this._state.daemon.info.height
    }

    if (this._state.app.config.daemon.type === 'local') {
      return (
        this._state.daemon.info.is_ready &&
        this._state.wallet.info.height >= target_height - 1
      )
    } else {
      return this._state.wallet.info.height >= target_height - 1
    }
  }

  get isAbleToSend() {
    let target_height
    if (
      this._state.app.config.daemon.type === 'local' &&
      !this._state.daemon.info.is_ready
    ) {
      target_height = Math.max(
        this._state.daemon.info.height,
        this._state.daemon.info.target_height,
      )
    } else {
      target_height = this._state.daemon.info.height
    }

    if (this._state.app.config.daemon.type === 'local') {
      return (
        this._state.daemon.info.is_ready &&
        this._state.wallet.info.height >= target_height - 1
      )
    } else if (this._state.app.config.daemon.type === 'local_remote') {
      return (
        this._state.daemon.info.height_without_bootstrap >= target_height &&
        this._state.wallet.info.height >= target_height - 1
      )
    } else {
      return this._state.wallet.info.height >= target_height - 1
    }
    return false
  }
}

const Store = StoreClass.instance as StoreClass &
  TypedEventEmitter<StoreClass, StoreState>
export { Store }
