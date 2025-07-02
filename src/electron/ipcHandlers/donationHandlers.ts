import { ipcMain } from "electron";
import { getDb } from "../db/db.js";
import { DonationRepository } from '../repositories/DonationRepository.js'
import { Donation } from "../../types/Donation.js";

let donationRepository: DonationRepository
export const initializeDonationHandlers = async () => {
    console.log('donation handlers initialized')
    const db = await getDb()
    donationRepository = new DonationRepository(db)
    ipcMain.handle('get-donations', async () => {
        try {
            const donations = await donationRepository.getAll()
            return donations
        } catch (err: any) {
            console.error('Failed to get donations via IPC: ', err.message)
            throw new Error(err.message)
        }
    })
    ipcMain.handle('get-donations-total', async () => {
        try {
            const total = await donationRepository.getDonationsTotal()
            return total
        } catch (err: any) {
            console.error('Failed to get donations total via IPC: ', err.message)
            throw new Error(err.message)
        }
    })
    ipcMain.handle('add-donation', async (_, donation: Donation) => {
        try {
            const result = await donationRepository.addDonation(donation)
            return result
        } catch (err: any) {
            console.error("Failed to add donation via IPC", err.message)
            throw new Error(err.message)
        }
    })
}