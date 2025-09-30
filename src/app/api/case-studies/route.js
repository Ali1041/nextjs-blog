import { NextResponse } from "next/server"
import { supabase } from "@/lib/db"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 6
    const offset = (page - 1) * limit

    const from = offset
    const to = offset + limit - 1

    const { data: caseStudies, error, count } = await supabase
        .from('case_studies')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)

    if (error) {
        console.error('Error fetching case studies:', error)
        return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 })
    }

    const totalItems = count
    const totalPages = Math.ceil(totalItems / limit)

    // Ensure tags are arrays
    caseStudies.forEach(cs => {
        cs.tags = Array.isArray(cs.tags) ? cs.tags : (cs.tags ? cs.tags.split(",") : [])
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

    const { data, error } = await supabase
        .from('case_studies')
        .insert([{
            title,
            content,
            author,
            client,
            industry,
            results,
            image,
            tags: tags || []
        }])
        .select()
        .single()

    if (error) {
        console.error('Error creating case study:', error)
        return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
}
