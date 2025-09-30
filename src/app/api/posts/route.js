import { NextResponse } from "next/server"
import { supabase } from "@/lib/db"

export async function GET() {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    }

    // Ensure tags are arrays (though Supabase should return them as arrays)
    posts.forEach(post => {
        post.tags = Array.isArray(post.tags) ? post.tags : (post.tags ? post.tags.split(",") : [])
    })
    return NextResponse.json(posts)
}

export async function POST(request) {
    const { title, content, author, image, tags, status = 'draft' } = await request.json()

    const { data, error } = await supabase
        .from('posts')
        .insert([{
            title,
            content,
            author,
            image,
            tags: tags || [], // Store as array
            status
        }])
        .select()
        .single()

    if (error) {
        console.error('Error creating post:', error)
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
}
