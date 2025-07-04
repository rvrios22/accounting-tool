import type { Database } from "sqlite3";
import type { Donor } from '../../types/Donor.d.ts'

export class DonorRepository {
    private db: Database
    constructor(dbInstance: Database) {
        this.db = dbInstance
    }
    getAll(): Promise<Donor[]> {
        return new Promise((resolve, reject) => {
            this.db.all('select * from donors', [], (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows as Donor[])
                }
            })
        })
    }
    getDonorIdByName(donorName: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.db.get('select * from donors where name = ?', [donorName], (err, row) => {
                if (err) {
                    console.log('Err finding donor by name', err.message)
                    reject(err)
                } else {
                    console.log('Donor found')
                    resolve((row as { id: number }).id)
                }
            })
        })
    }
}