import type { Database } from "sqlite3";
import type { Donation } from '../../types/Donation.js'

export class DonationRepository {
    private db: Database
    constructor(dbInstance: Database) {
        this.db = dbInstance
    }
    getAll(): Promise<Donation[]> {
        return new Promise((resolve, reject) => {
            this.db.all('select * from donations order by date desc', [], (err, rows) => {
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

    addDonation({ date, amount, memo, method, DonorId }: Donation): Promise<Donation> {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO donations (date, amount, memo, method, DonorId) VALUES (?, ?, ?, ?, ?)`;
            this.db.run(sql, [date, amount, memo, method, DonorId], function (err) {
                if (err) {
                    console.error('Error adding donation', err.message);
                    reject(err);
                } else {
                    // Fetch the newly inserted donation
                    const insertedId = this.lastID;
                    // 'this' here refers to the statement, not the class
                    // So we need to use a function, not an arrow function
                    // Now fetch the row
                    (this as any).db.get(
                        'SELECT * FROM donations WHERE id = ?',
                        [insertedId],
                        (err2: any, row: Donation) => {
                            if (err2) {
                                reject(err2);
                            } else {
                                resolve(row as Donation);
                            }
                        }
                    );
                }
            });
        });
    }
}