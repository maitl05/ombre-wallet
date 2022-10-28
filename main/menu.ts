import { MenuItemConstructorOptions, MenuItem } from 'electron'

let template: Array<MenuItemConstructorOptions | MenuItem> = [
  {
    role: 'window',
    submenu: [{ role: 'minimize' }, { role: 'close' }],
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          require('electron').shell.openExternal('http://www.ombre.cash/')
        },
      },
    ],
  },
]

if (process.platform === 'darwin') {
  template.unshift({
    label: 'Ombre Wallet Atom',
    submenu: [{ role: 'about' }, { role: 'quit' }],
  })

  // Window menu
  template[3].submenu = [{ role: 'close' }, { role: 'minimize' }]
}

export default template
