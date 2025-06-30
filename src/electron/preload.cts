const electron = require('electron')
console.log('preload')
electron.contextBridge.exposeInMainWorld('electron', {
    getDonors: () => electron.ipcRenderer.invoke('get-donors')
})