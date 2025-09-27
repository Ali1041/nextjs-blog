import { NextResponse } from "next/server"
import { openDb } from "@/lib/db"

export async function GET() {
    const db = await openDb()
    const posts = await db.all("SELECT * FROM posts ORDER BY created_at DESC")
    // Parse tags as arrays
    posts.forEach(post => {
        post.tags = post.tags ? post.tags.split(",") : []
    })
    return NextResponse.json(posts)
}

export async function POST(request) {
    const { title, content, author, image, tags, status = 'draft' } = await request.json()
    const db = await openDb()
    const result = await db.run(
        "INSERT INTO posts (title, content, author, image, tags, status) VALUES (?, ?, ?, ?, ?, ?)",
        [title, content, author, image, tags ? tags.join(",") : "", status]
    )
    const newPost = await db.get("SELECT * FROM posts WHERE id = ?", result.lastID)
    newPost.tags = newPost.tags ? newPost.tags.split(",") : []
    return NextResponse.json(newPost, { status: 201 })
}
