import type { Database } from "sqlite3";
import type { Donation } from '../../types/Donation.js'

export class DonationRepository {
    private db: Database
    constructor(dbInstance: Database) {
        this.db = dbInstance
    }
    getAll(): Promise<Donation[]> {
        return new Promise((resolve, reject) => {
            this.db.all('select * from donations', [], (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows as Donation[])
                }
            })
        })
    }
    getDonationsTotal(): Promise<number> {
        return new Promise((resolve, reject) => {
            this.db.get('select sum(amount) as totalAmount from donations', (err, row: { totalAmount: number } | undefined) => {
                if (err) {
                    console.error('Error getting sum: ', err.message)
                    reject(err)
                } else {
                    const total = row && row.totalAmount !== null ? row.totalAmount : 0
                    resolve(total)
                }
            })
        })
    }
}