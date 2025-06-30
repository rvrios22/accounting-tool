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
}