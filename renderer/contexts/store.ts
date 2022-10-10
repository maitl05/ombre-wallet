import _ from 'lodash'
import { storeDefaultState } from '../static/store-defaults'
import { StoreState } from '../types/Store'
import { EventEmitter } from 'events'
import { DeepPartial, Subscribable } from 'types/utils'

class StoreClass extends Subscribable<StoreState> {
  protected _preEmit<K extends keyof StoreState>(
    s: K | '*',
    v: StoreState[K],
  ): void {
    //
  }
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

  public update(value: DeepPartial<StoreState>) {
    const res = {}
    _.merge(res, this._state, value)
    this._state = res as StoreState
    _.keys(value).forEach((key) => this.emit(key as keyof StoreState, res[key]))
    this.emit('*', res as StoreState)
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

  resetWalletData() {
    this.update({
      wallet: {
        status: {
          code: 1,
          message: null,
        },
        info: {
          name: '',
          address: '',
          height: 0,
          balance: 0,
          unlocked_balance: 0,
          view_only: false,
        },
        secret: {
          mnemonic: '',
          view_key: '',
          spend_key: '',
        },
        transactions: {
          tx_list: [],
        },
        address_list: {
          used: [],
          unused: [],
          address_book: [],
        },
      },
    })
  }

  resetPendingConfig() {
    this.update({
      app: {
        pending_config: this._state.app.config,
      },
    })
  }
}

const Store = StoreClass.instance
export { Store }
