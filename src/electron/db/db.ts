import sqlite3 from 'sqlite3';
import path from 'path';
import { app } from 'electron';
import { Database } from 'sqlite3';

let dbInstance: Database | null = null
let dbInitializationPromise: Promise<Database> | null = null

export const getDb = (): Promise<Database> => {
  if (dbInstance) {
    return Promise.resolve(dbInstance)
  }
  if (dbInitializationPromise) {
    return dbInitializationPromise
  }

  dbInitializationPromise = new Promise((resolve, reject) => {
    const dbPath = path.join(app.getAppPath(), 'src', 'electron', 'db.db')
    dbInstance = new sqlite3.Database(dbPath, (err) => {
      if(err) {
        console.error('Error coneccting to db', err.message)
        dbInstance = null
        dbInitializationPromise = null
        reject(err)
      } else {

        console.log('connected to db')
        resolve(dbInstance as Database)
      }
    })
  })
  return dbInitializationPromise
}

export const closeDb = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if(dbInstance) {
      dbInstance.close((err) => {
        if(err) {
          console.error('Error closing db', err.message)
          reject(err)
        } else {
          console.log('db closed')
          dbInstance = null
          dbInitializationPromise = null
          resolve()
        }
      })
    } else {
      console.log('no db to close')
      resolve()
    }
  })
}