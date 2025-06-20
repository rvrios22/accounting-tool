import { app, BrowserWindow } from 'electron'
import path from 'path'
import isDev from './utils/isDev.js'
import { getPreloadPath } from './utils/pathResolver.js'
import os from 'os';
if (os.platform() === 'darwin' && os.arch() === 'x64') {
  app.disableHardwareAcceleration();
}
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath()
        }
    })
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123')
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
    }
})