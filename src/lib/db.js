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
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
    }
    return db
}

export { openDb }

