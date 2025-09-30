import { NextResponse } from "next/server"
import { supabase } from "@/lib/db"

// GET a single post
export async function GET(request, { params }) {
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single()

    if (error || !post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Ensure tags is an array
    post.tags = Array.isArray(post.tags) ? post.tags : (post.tags ? post.tags.split(",") : [])
    return NextResponse.json(post)
}

// PUT (update) a post
export async function PUT(request, { params }) {
    const { title, content, author, image, tags, status } = await request.json()

    const { data, error } = await supabase
        .from('posts')
        .update({
            title,
            content,
            author,
            image,
            tags: tags || [],
            status
        })
        .eq('id', params.id)
        .select()
        .single()

    if (error) {
        console.error('Error updating post:', error)
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
    }

    return NextResponse.json(data)
}

// DELETE a post
export async function DELETE(request, { params }) {
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', params.id)

    if (error) {
        console.error('Error deleting post:', error)
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
    }

    return NextResponse.json({ message: "Post deleted successfully" })
}
