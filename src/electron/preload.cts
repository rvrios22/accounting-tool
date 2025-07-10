import { Donation } from "../types/Donation"
import { Donor } from "../types/Donor"

const electron = require('electron')

// Donation Bridge
electron.contextBridge.exposeInMainWorld('donation', {
    getDonations: () => electron.ipcRenderer.invoke('get-donations'),
    getDonationsTotal: () => electron.ipcRenderer.invoke('get-donations-total'),
    addDonation: (donation: Donation) => electron.ipcRenderer.invoke('add-donation', donation)
})

// Donor Bridge
electron.contextBridge.exposeInMainWorld('donor', {
    getDonors: () => electron.ipcRenderer.invoke('get-donors'),
    getDonorIdByName: (donorName: string) => electron.ipcRenderer.invoke('get-donor-id-by-name', donorName),
    addDonor: (donor: object) => electron.ipcRenderer.invoke('add-donor', donor)
})