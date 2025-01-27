import { NextResponse } from "next/server"
import { openDb } from "@/lib/db"

// GET a single post
export async function GET(request, { params }) {
    const db = await openDb()
    const post = await db.get("SELECT * FROM posts WHERE id = ?", params.id)
    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    return NextResponse.json(post)
}

// PUT (update) a post
export async function PUT(request, { params }) {
    const { title, content, author } = await request.json()
    const db = await openDb()
    await db.run("UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?", [title, content, author, params.id])
    const updatedPost = await db.get("SELECT * FROM posts WHERE id = ?", params.id)
    return NextResponse.json(updatedPost)
}

// DELETE a post
export async function DELETE(request, { params }) {
    const db = await openDb()
    await db.run("DELETE FROM posts WHERE id = ?", params.id)
    return NextResponse.json({ message: "Post deleted successfully" })
}

