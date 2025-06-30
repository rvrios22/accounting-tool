const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'db.db')

const seedDonors = () => {
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
            db.run('drop table if exists donors', (err) => {
                if (err) {
                    console.log('error dropping donors table', err.message)
                }
            })

            db.run(`
                create table donors (
                    id integer primary key autoincrement,
                    name text not null,
                    email text,
                    address text,
                    phone text,
                    notes text
                    )
                    `, (err) => {
                if (err) {
                    console.error('Error creating table', err.message)
                    return
                }
            })
            const stmt = db.prepare('insert into donors (name, email, address, phone, notes) values (?, ?, ?, ?, ?)')

            const donorsToSeed = [
                {
                    id: 1,
                    name: 'Alice Smith',
                    email: 'alice@example.com',
                    address: '123 Wonderland Rd, Fictional City',
                    phone: '555-111-2222',
                    notes: 'Long-time generous donor.',
                },
                {
                    id: 2,
                    name: 'Bob Johnson',
                    email: 'bob@example.com',
                    address: '456 Imaginary Ln, Dreamville',
                    phone: null,
                    notes: '',
                },
                {
                    id: 3,
                    name: 'Charlie Brown',
                    email: 'charlie@example.com',
                    address: '789 Peanut St, Snoopy Town',
                    phone: '555-333-4444',
                    notes: 'Loves the annual bake sale.',
                },
                {
                    id: 4,
                    name: 'Diana Prince',
                    email: 'diana@example.com',
                    address: '101 Themyscira Blvd, Amazon Island',
                    phone: '555-555-6666',
                    notes: 'New donor, follow up in Q3.',
                },
            ];

            donorsToSeed.forEach(({ name, email, address, phone, notes }) => {
                stmt.run(name, email, address, phone, notes, (err) => {
                    if (err) {
                        console.log('error added donors', err.message)
                        return
                    } else {
                        console.log(`Inserted ${name}`)
                    }
                })
            })
            stmt.finalize()

            db.all('SELECT * FROM donors', [], (err, rows) => {
                if (err) {
                    console.error('Error verifying data:', err.message);
                } else {
                    console.log('\n--- Seeded Data ---');
                    rows.forEach(row => {
                        console.log(`ID: ${row.id}, Name: ${row.name}, Email: ${row.email}, Address: ${row.address}, Phone: ${row.phone}, Notes: ${row.notes}`);
                    });
                    console.log('-------------------\n');
                }
                db.close((closeErr) => {
                    if (closeErr) console.error('Error closing database:', closeErr.message);
                    else console.log('Database connection closed after seeding.');
                });
            })
        });
    })
}

module.exports = seedDonors;