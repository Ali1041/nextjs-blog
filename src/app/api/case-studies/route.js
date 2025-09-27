import { NextResponse } from "next/server"
import { openDb } from "@/lib/db"

export async function GET() {
    const db = await openDb()
    const caseStudies = await db.all("SELECT * FROM case_studies ORDER BY created_at DESC")
    // Parse tags as arrays
    caseStudies.forEach(cs => {
        cs.tags = cs.tags ? cs.tags.split(",") : []
    })
    return NextResponse.json(caseStudies)
}

export async function POST(request) {
    const { title, content, author, client, industry, results, image, tags } = await request.json()
    const db = await openDb()
    const result = await db.run(
        "INSERT INTO case_studies (title, content, author, client, industry, results, image, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [title, content, author, client, industry, results, image, tags ? tags.join(",") : ""]
    )
    const newCaseStudy = await db.get("SELECT * FROM case_studies WHERE id = ?", result.lastID)
    newCaseStudy.tags = newCaseStudy.tags ? newCaseStudy.tags.split(",") : []
    return NextResponse.json(newCaseStudy, { status: 201 })
}
