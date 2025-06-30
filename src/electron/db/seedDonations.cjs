const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'db.db')

const seedDonations = () => {
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
        console.log(`Deleted existing database: ${dbPath}`);
    }
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('error opening db', err.message)
            return
        }
        db.serialize(() => {
            db.run('drop table if exists donations', (err) => {
                if (err) {
                    console.error('error dropping donations table', err.message)
                }
            })
            db.run(`
                    create table donations (
                        id integer primary key autoincrement,
                        date text not null,
                        amount numeric not null,
                        memo text,
                        method text not null,
                        DonorId integer not null
                    )
                `, (err) => {
                if (err) {
                    console.error('Error creating donations table', err.message)
                    return
                }
            })
            const stmt = db.prepare('insert into donations (date, amount, memo, method, DonorId) values (?, ?, ?, ?, ?)')

            const donationsToSeed = [
                {
                    date: '2024-01-15',
                    amount: 100.00,
                    memo: 'Annual pledge',
                    method: 'Online',
                    DonorId: 1, // Alice Smith
                },
                {
                    date: '2024-02-01',
                    amount: 50.50,
                    memo: 'February tithe',
                    method: 'Cash',
                    DonorId: 2, // Bob Johnson
                },
                {
                    date: '2024-03-10',
                    amount: 25.00,
                    memo: 'Youth program support',
                    method: 'Check',
                    DonorId: 3, // Charlie Brown
                },
                {
                    date: '2024-04-05',
                    amount: 250.00,
                    memo: 'Building fund contribution',
                    method: 'Online',
                    DonorId: 4, // Diana Prince
                },
                {
                    date: '2024-01-20',
                    amount: 75.00,
                    memo: 'Winter outreach',
                    method: 'Online',
                    DonorId: 1, // Alice Smith (another donation)
                },
                {
                    date: '2024-03-25',
                    amount: 15.75,
                    memo: 'Easter lily donation',
                    method: 'Cash',
                    DonorId: 2, // Bob Johnson (another donation)
                },
                {
                    date: '2024-05-12',
                    amount: 1000.00,
                    memo: 'Major gift for mission trip',
                    method: 'Check',
                    DonorId: 4, // Diana Prince (another donation)
                },
                {
                    date: '2024-06-01',
                    amount: 30.00,
                    memo: 'General offering',
                    method: 'Online',
                    DonorId: 3, // Charlie Brown (another donation)
                },
            ];
            donationsToSeed.forEach(({ date, amount, memo, method, DonorId }) => {
                stmt.run(date, amount, memo, method, DonorId, (err) => {
                    if (err) {
                        console.error('Error seeding dontaions', err.message)
                    } else {
                        console.log(`Inserted ${DonorId}`)
                    }
                })
            })
            stmt.finalize()
            db.all('SELECT * FROM donations', [], (err, rows) => {
                if (err) {
                    console.error('Error verifying data:', err.message);
                } else {
                    console.log('\n--- Seeded Data ---');
                    rows.forEach(row => {
                        console.log(`ID: ${row.id}, Date: ${row.date}, Amount: ${row.amount}, Memo: ${row.memo}, Method: ${row.method}, DonorId: ${row.DonorId}`);
                    });
                    console.log('-------------------\n');
                }
                db.close((closeErr) => {
                    if (closeErr) console.error('Error closing database:', closeErr.message);
                    else console.log('Database connection closed after seeding.');
                });
            })
        })
    })
}

module.exports = seedDonations