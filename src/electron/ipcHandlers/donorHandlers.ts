import { ipcMain } from "electron";
import { getDb } from "../db/db.js";
import { DonorRepository } from '../repositories/DonorRepository.js'

let donorRepository: DonorRepository
export const initializeDonorHandlers = async () => {
    console.log('handler initilized')
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
}
