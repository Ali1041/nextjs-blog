import { NextResponse } from "next/server"
import { openDb } from "@/lib/db"

// GET a single post
export async function GET(request, { params }) {
    const db = await openDb()
    const post = await db.get("SELECT * FROM posts WHERE id = ?", params.id)
    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    // Parse tags as array
    post.tags = post.tags ? post.tags.split(",") : []
    return NextResponse.json(post)
}

// PUT (update) a post
export async function PUT(request, { params }) {
    const { title, content, author, image, tags, status } = await request.json()
    const db = await openDb()
    await db.run(
        "UPDATE posts SET title = ?, content = ?, author = ?, image = ?, tags = ?, status = ? WHERE id = ?",
        [title, content, author, image, tags ? tags.join(",") : "", status, params.id]
    )
    const updatedPost = await db.get("SELECT * FROM posts WHERE id = ?", params.id)
    // Parse tags as array
    updatedPost.tags = updatedPost.tags ? updatedPost.tags.split(",") : []
    return NextResponse.json(updatedPost)
}

// DELETE a post
export async function DELETE(request, { params }) {
    const db = await openDb()
    await db.run("DELETE FROM posts WHERE id = ?", params.id)
    return NextResponse.json({ message: "Post deleted successfully" })
}
