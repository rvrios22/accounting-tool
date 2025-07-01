const electron = require('electron')

// Donation Bridge
electron.contextBridge.exposeInMainWorld('donation', {
    getDonations: () => electron.ipcRenderer.invoke('get-donations'),
    getDonationsTotal: () => electron.ipcRenderer.invoke('get-donations-total')
})

// Donor Bridge
electron.contextBridge.exposeInMainWorld('donor', {
    getDonors: () => electron.ipcRenderer.invoke('get-donors'),
})