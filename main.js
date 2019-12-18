const {
    app,
    BrowserWindow,
    Menu,
    Tray
} = require('electron')

const {
    fork
} = require('child_process')

const ps = fork(`${__dirname}/server.js`)

let win

let tray = null

function createWindow() {

    win = new BrowserWindow({
        webPreferences: {
            sandbox: true
        }
    })

    win.loadURL('http://localhost:8081')

    win.on('closed', () => {
        win = null
    })

    tray = new Tray(`${__dirname}/app.ico`)
    const contextMenu = Menu.buildFromTemplate([{
        label: 'Salir',
        click: () => app.quit()
    }])

    tray.setToolTip('app')
    tray.setContextMenu(contextMenu)

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})