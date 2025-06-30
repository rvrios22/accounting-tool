const electron = require('electron')
electron.contextBridge.exposeInMainWorld('electron', {
    getDonors: () => electron.ipcRenderer.invoke('get-donors')
})