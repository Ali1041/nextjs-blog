import { NextResponse } from "next/server"
import { openDb } from "@/lib/db"

export async function GET(request, { params }) {
    const db = await openDb()
    const post = await db.get("SELECT * FROM posts WHERE id = ?", params.id)
    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    post.tags = post.tags ? post.tags.split(",") : []
    return NextResponse.json(post)
}

export async function PUT(request, { params }) {
    const { title, content, author, image, tags } = await request.json()
    const db = await openDb()
    await db.run("UPDATE posts SET title = ?, content = ?, author = ?, image = ?, tags = ? WHERE id = ?", [
        title,
        content,
        author,
        image,
        tags.join(","),
        params.id,
    ])
    const updatedPost = await db.get("SELECT * FROM posts WHERE id = ?", params.id)
    updatedPost.tags = updatedPost.tags ? updatedPost.tags.split(",") : []
    return NextResponse.json(updatedPost)
}

export async function DELETE(request, { params }) {
    const db = await openDb()
    await db.run("DELETE FROM posts WHERE id = ?", params.id)
    return NextResponse.json({ message: "Post deleted successfully" })
}

