import { app, ipcMain, BrowserWindow, Menu, Tray, dialog } from 'electron'
import { Backend } from './modules/backend'
import menuTemplate from './menu'
import isDev from 'electron-is-dev'
import windowStateKeeper from 'electron-window-state'
import path from 'path'

require('electron-debug')({
  showDevTools: true,
})

if (process.env.PROD) {
  globalThis.__ombre_bin = path
    .join(__dirname, '..', 'bin')
    .replace(/\\/g, '\\\\')
} else {
  globalThis.__ombre_bin = path
    .join(process.cwd(), 'bin')
    .replace(/\\/g, '\\\\')
}

let mainWindow, backend, tray
let showConfirmClose = true
let forceQuit = false
let updateTrayInterval = null

function createWindow() {
  /**
   * Initial window options
   */

  let mainWindowState = windowStateKeeper({
    defaultWidth: 1010,
    defaultHeight: 800,
  })

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 640,
    minHeight: 480,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  mainWindow.on('close', (e) => {
    if (process.platform === 'darwin') {
      if (forceQuit) {
        forceQuit = false
        if (showConfirmClose) {
          e.preventDefault()
          mainWindow.show()
          mainWindow.webContents.send('confirmClose')
        } else {
          e.defaultPrevented = false
        }
      } else {
        e.preventDefault()
        mainWindow.hide()
      }
    } else {
      if (showConfirmClose) {
        e.preventDefault()
        mainWindow.webContents.send('confirmClose')
      } else {
        e.defaultPrevented = false
      }
    }
  })

  ipcMain.on('confirmClose', (e, restart) => {
    showConfirmClose = false

    if (restart && !isDev) {
      app.relaunch()
    }

    if (backend) {
      if (process.platform !== 'darwin') {
        clearInterval(updateTrayInterval)
        tray.setToolTip('Closing...')
      }
      backend.quit().then(() => {
        backend = null
        app.quit()
      })
    } else {
      app.quit()
    }
  })

  mainWindow.on('minimize', (e) => {
    if (!backend || !backend.config_data) {
      e.defaultPrevented = false
      return
    }
    let minimize_to_tray = backend.config_data.preference.minimize_to_tray
    if (minimize_to_tray === null) {
      mainWindow.webContents.send('confirmMinimizeTray')
      e.preventDefault()
    } else if (minimize_to_tray === true) {
      e.preventDefault()
      mainWindow.hide()
    } else {
      e.defaultPrevented = false
    }
  })

  ipcMain.on('autostartSettings', (e, openAtLogin) => {
    app.setLoginItemSettings({
      openAtLogin,
    })
  })

  ipcMain.on('confirmMinimizeTray', (e, minimize_to_tray) => {
    mainWindow.setMinimizable(true)
    backend.config_data.preference.minimize_to_tray = minimize_to_tray
    if (minimize_to_tray) {
      mainWindow.hide()
    } else {
      mainWindow.minimize()
    }
  })

  ipcMain.on('isReady', () => {
    backend = new Backend(mainWindow)
    backend.init()
  })

  const port = process.argv[2]

  mainWindow.loadURL(`http://localhost:${port}`)
  mainWindowState.manage(mainWindow)
}

app.on('ready', () => {
  if (process.platform === 'darwin') {
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
  } else {
    tray = new Tray('./main/statics/omb-small.png')
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show Ombre Wallet',
        click: function () {
          if (mainWindow.isMinimized()) mainWindow.minimize()
          else mainWindow.show()
          mainWindow.focus()
        },
      },
      {
        label: 'Exit Ombre Wallet',
        click: function () {
          if (mainWindow.isMinimized()) mainWindow.minimize()
          else mainWindow.show()
          mainWindow.focus()
          mainWindow.close()
        },
      },
    ])

    tray.setContextMenu(contextMenu)

    updateTrayInterval = setInterval(() => {
      if (backend) tray.setToolTip(backend.getTooltipLabel())
    }, 1000)

    tray.on('click', () => {
      if (mainWindow.isMinimized()) mainWindow.minimize()
      else mainWindow.show()
      mainWindow.focus()
    })
  }

  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  } else if (process.platform === 'darwin') {
    mainWindow.show()
  }
})

app.on('before-quit', () => {
  if (process.platform === 'darwin') {
    forceQuit = true
  } else {
    if (backend) {
      if (process.platform !== ('darwin' as NodeJS.Platform)) {
        clearInterval(updateTrayInterval)
        tray.setToolTip('Closing...')
      }
      backend.quit().then(() => {
        mainWindow.close()
      })
    }
  }
})

app.on('quit', () => {
  app.quit
})
