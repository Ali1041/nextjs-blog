import { NextResponse } from "next/server"
import { openDb } from "@/lib/db"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 6
    const offset = (page - 1) * limit

    const db = await openDb()

    // Get total count
    const totalResult = await db.get("SELECT COUNT(*) as count FROM case_studies")
    const totalItems = totalResult.count
    const totalPages = Math.ceil(totalItems / limit)

    // Get paginated results
    const caseStudies = await db.all("SELECT * FROM case_studies ORDER BY created_at DESC LIMIT ? OFFSET ?", [limit, offset])

    // Parse tags as arrays
    caseStudies.forEach(cs => {
        cs.tags = cs.tags ? cs.tags.split(",") : []
    })

    return NextResponse.json({
        caseStudies,
        totalPages,
        currentPage: page,
        totalItems
    })
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
