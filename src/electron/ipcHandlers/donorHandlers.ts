import { ipcMain } from "electron";
import { getDb } from "../db/db.js";
import { DonorRepository } from '../repositories/DonorRepository.js'
import { Donor } from "../../types/Donor.js";

let donorRepository: DonorRepository
export const initializeDonorHandlers = async () => {
    console.log('Donor handlers initilized')
    const db = await getDb()
    donorRepository = new DonorRepository(db)
    ipcMain.handle('get-donors', async () => {
        try {
            const donors = await donorRepository.getAll()
            return donors
        } catch (err: any) {
            console.error('Failed to get donors via IPC: ', err.message)
            throw new Error(err.message)
        }
    })
    ipcMain.handle('get-donor-id-by-name', async (_, donorName: string) => {
        try {

            const donorId = await donorRepository.getDonorIdByName(donorName)
            return donorId
        } catch (err: any) {
            console.error('Failed to get donor id via IPC: ', err.message)
            throw new Error(err.message)
        }
    })
    ipcMain.handle('add-donor', async (_, donor) => {
        try {
            const donorObj = await donorRepository.addDonor(donor)
            return donorObj
        } catch (err: any) {
            console.error('Failed to add donor via IPC: ', err.message)
            throw new Error(err.message)
        }
    })
}
