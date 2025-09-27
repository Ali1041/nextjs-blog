import sqlite3 from "sqlite3"
import { open } from "sqlite"

let db = null

async function openDb() {
  if (!db) {
    db = await open({
      filename: "./blog.sqlite",
      driver: sqlite3.Database,
    })

    // Create the posts table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        author TEXT,
        image TEXT,
        tags TEXT,
        status TEXT DEFAULT 'draft',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Add status column if it doesn't exist (for existing tables)
    try {
      await db.exec(`ALTER TABLE posts ADD COLUMN status TEXT DEFAULT 'draft'`)
    } catch (err) {
      // Column might already exist, ignore the error
      if (!err.message.includes("duplicate column name")) {
        throw err
      }
    }

    // Create the case_studies table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS case_studies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        author TEXT,
        client TEXT,
        industry TEXT,
        results TEXT,
        image TEXT,
        tags TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
  }
  return db
}

export { openDb }
