import { Dialog } from 'contexts/dialog'
import { ipcRenderer } from 'electron'
import _ from 'lodash'
import Router from 'next/router'
import { toast } from 'react-toastify'
import { Store } from '../contexts/store'

const TOAST_TYPE_MATCH = {
  positive: 'success',
  negative: 'error',
  warning: 'warning',
  info: 'info',
  ongoing: 'info',
}

class Gateway {
  closeDialog: boolean
  minimizeDialog: boolean

  private constructor() {
    this.closeDialog = false
    this.minimizeDialog = false

    Store.update({
      app: {
        status: {
          code: 1, // Connecting to backend
        },
      },
    })

    ipcRenderer.on('event', (_, data) => {
      this.receive(data)
    })

    ipcRenderer.on('confirmClose', () => {
      this.confirmClose('Are you sure you want to exit?')
    })

    ipcRenderer.on('confirmMinimizeTray', () => {
      this.confirmMinimizeTray()
    })
  }

  private static _instance: Gateway
  static get i() {
    if (!Gateway._instance) {
      Gateway._instance = new Gateway()
    }
    return Gateway._instance
  }
  static set i(_) {
    throw new Error('E_READONLY')
  }

  setAutostartSettings(enabled) {
    ipcRenderer.send('autostartSettings', enabled)
  }

  confirmClose(msg, restart = false) {
    if (this.closeDialog) {
      return
    }
    this.closeDialog = true
    Dialog.open({
      title: restart ? 'Restart' : 'Exit',
      message: msg,
      ok: restart ? 'RESTART' : 'EXIT',
      cancel: 'CANCEL',
    })
    Dialog.once('settle', ({ result }) => {
      if (result) {
        this.closeDialog = false
        Store.update({ app: { status: { code: 99 } } })
        Router.replace('/')
        ipcRenderer.send('confirmClose', restart)
      } else {
        this.closeDialog = false
      }
    })
  }

  confirmMinimizeTray() {
    if (this.minimizeDialog) {
      return
    }
    this.minimizeDialog = true
    Dialog.open({
      title: 'Minimize to tray?',
      message: 'You can change your preference in the setting menu at any time',
      ok: 'YES',
      cancel: 'NO',
    })
    Dialog.once('settle', ({ result }) => {
      if (result) {
        this.minimizeDialog = false
        ipcRenderer.send('confirmMinimizeTray', true)
      } else {
        this.minimizeDialog = false
        ipcRenderer.send('confirmMinimizeTray', false)
      }
    })
  }

  send(module, method, data = {}) {
    let message = {
      module,
      method,
      data,
    }
    ipcRenderer.send('event', message)
  }

  receive(message) {
    if (
      typeof message !== 'object' ||
      !message.hasOwnProperty('event') ||
      !message.hasOwnProperty('data')
    )
      return

    switch (message.event) {
      case 'initialize':
        Store.update({
          app: {
            status: {
              code: 2, // Loading config
            },
          },
        })
        break

      case 'set_app_data':
        Store.update({ app: message.data })
        break

      case 'set_daemon_data':
        Store.update({ daemon: message.data })
        break

      case 'set_pool_data':
        Store.update({ pool: message.data })
        break

      case 'set_wallet_data':
      case 'set_wallet_error':
        Store.update({ wallet: message.data })
        break

      case 'set_tx_status':
        Store.update({ tx_status: message.data })
        break

      case 'wallet_list':
        Store.update({ wallets: message.data })
        break

      case 'settings_changed_reboot':
        this.confirmClose(
          'Changes require restart. Would you like to restart now?',
          true,
        )
        break

      case 'show_notification':
        toast(_.get(message.data, 'message'), {
          autoClose: _.get(message.data, 'timeout') ?? 5000,
          type: TOAST_TYPE_MATCH[_.get(message.data, 'type')] ?? 'success',
        })
        break

      case 'return_to_wallet_select':
        Router.replace('/wallet-select')
        setTimeout(() => {
          // short delay to prevent wallet data reaching the
          // websocket moments after we close and reset data
          Store.resetWalletData()
        }, 250)
        break
    }
  }
}

export { Gateway }
