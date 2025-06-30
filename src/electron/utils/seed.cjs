const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'db.db')

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
                console.error(err)
            }
        })

        db.run(`
            create table donors (
                id integer primary key autoincrement,
                name text not null,
                email text,
                address text
                )
                `, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
        const stmt = db.prepare('insert into donors (name, email, address) values (?, ?, ?)')

        const usersToSeed = [
            { name: 'Alice Smith', email: 'alice@example.com', address: '123 Wonderland Rd, Fictional City' },
            { name: 'Bob Johnson', email: 'bob@example.com', address: '456 Imaginary Ln, Dreamville' },
            { name: 'Charlie Brown', email: 'charlie@example.com', address: '789 Peanut St, Snoopy Town' },
            { name: 'Diana Prince', email: 'diana@example.com', address: '101 Themyscira Blvd, Amazon Island' }
        ]

        usersToSeed.forEach(({ name, email, address }) => {
            stmt.run(name, email, address, (err) => {
                if (err) {
                    console.log(err)
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
                    console.log(`ID: ${row.id}, Name: ${row.name}, Email: ${row.email}, Address: ${row.address}`);
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