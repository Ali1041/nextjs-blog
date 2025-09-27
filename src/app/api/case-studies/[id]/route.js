import { NextResponse } from "next/server"
import { openDb } from "@/lib/db"

// GET a single case study
export async function GET(request, { params }) {
    const db = await openDb()
    const caseStudy = await db.get("SELECT * FROM case_studies WHERE id = ?", params.id)
    if (!caseStudy) {
        return NextResponse.json({ error: "Case study not found" }, { status: 404 })
    }
    // Parse tags as array
    caseStudy.tags = caseStudy.tags ? caseStudy.tags.split(",") : []
    return NextResponse.json(caseStudy)
}

// PUT (update) a case study
export async function PUT(request, { params }) {
    const { title, content, author, client, industry, results, image, tags } = await request.json()
    const db = await openDb()
    await db.run(
        "UPDATE case_studies SET title = ?, content = ?, author = ?, client = ?, industry = ?, results = ?, image = ?, tags = ? WHERE id = ?",
        [title, content, author, client, industry, results, image, tags ? tags.join(",") : "", params.id]
    )
    const updatedCaseStudy = await db.get("SELECT * FROM case_studies WHERE id = ?", params.id)
    // Parse tags as array
    updatedCaseStudy.tags = updatedCaseStudy.tags ? updatedCaseStudy.tags.split(",") : []
    return NextResponse.json(updatedCaseStudy)
}

// DELETE a case study
export async function DELETE(request, { params }) {
    const db = await openDb()
    await db.run("DELETE FROM case_studies WHERE id = ?", params.id)
    return NextResponse.json({ message: "Case study deleted successfully" })
}
