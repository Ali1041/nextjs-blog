import { NextResponse } from "next/server"
import { supabase } from "@/lib/db"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 6
    const offset = (page - 1) * limit

    const from = offset
    const to = offset + limit - 1

    const { data: posts, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)

    if (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    }

    const totalItems = count
    const totalPages = Math.ceil(totalItems / limit)

    // Ensure tags are arrays
    posts.forEach(post => {
        post.tags = Array.isArray(post.tags) ? post.tags : (post.tags ? post.tags.split(",") : [])
    })

    return NextResponse.json({
        posts,
        totalPages,
        currentPage: page,
        totalItems
    })
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
