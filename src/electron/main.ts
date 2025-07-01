import { app, BrowserWindow } from 'electron'
import path from 'path'
import isDev from './utils/isDev.js'
import { getPreloadPath } from './utils/pathResolver.js'
import os from 'os';
import { getDb, closeDb } from './db/db.js';
import { initializeDonorHandlers } from './ipcHandlers/donorHandlers.js';
import { initializeDonationHandlers } from './ipcHandlers/donationHandlers.js';

if (os.platform() === 'darwin' && os.arch() === 'x64') {
  app.disableHardwareAcceleration();
}

app.on('ready', async () => {
  try {
    await getDb()
    await initializeDonorHandlers()
    await initializeDonationHandlers()
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
  } catch (err) {
    console.error(err)
    app.quit()
  }
})

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    await closeDb(); // Close the database when all windows are closed
    app.quit();
  }
});

app.on('before-quit', async () => {
  try {
    await closeDb();
  } catch (error) {
    console.error("Error closing database during app quit:", error);
  }
});