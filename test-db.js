import { openDb } from './src/lib/db.js'

async function testDb() {
    try {
        console.log('Opening database...')
        const db = await openDb()

        console.log('Checking posts table...')
        const posts = await db.all('PRAGMA table_info(posts)')
        console.log('Posts table columns:', posts.map(col => col.name).join(', '))

        console.log('Checking case_studies table...')
        const caseStudies = await db.all('PRAGMA table_info(case_studies)')
        console.log('Case Studies table columns:', caseStudies.map(col => col.name).join(', '))

        await db.close()
        console.log('Database test completed successfully!')
    } catch (err) {
        console.error('Database test failed:', err)
    }
}

testDb()
