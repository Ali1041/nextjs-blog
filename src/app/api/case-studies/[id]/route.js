import { NextResponse } from "next/server"
import { supabase } from "@/lib/db"

// GET a single case study
export async function GET(request, { params }) {
    const { data: caseStudy, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', params.id)
        .single()

    if (error || !caseStudy) {
        return NextResponse.json({ error: "Case study not found" }, { status: 404 })
    }

    // Ensure tags is an array
    caseStudy.tags = Array.isArray(caseStudy.tags) ? caseStudy.tags : (caseStudy.tags ? caseStudy.tags.split(",") : [])
    return NextResponse.json(caseStudy)
}

// PUT (update) a case study
export async function PUT(request, { params }) {
    const { title, content, author, client, industry, results, image, tags } = await request.json()

    const { data, error } = await supabase
        .from('case_studies')
        .update({
            title,
            content,
            author,
            client,
            industry,
            results,
            image,
            tags: tags || []
        })
        .eq('id', params.id)
        .select()
        .single()

    if (error) {
        console.error('Error updating case study:', error)
        return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 })
    }

    return NextResponse.json(data)
}

// DELETE a case study
export async function DELETE(request, { params }) {
    const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', params.id)

    if (error) {
        console.error('Error deleting case study:', error)
        return NextResponse.json({ error: 'Failed to delete case study' }, { status: 500 })
    }

    return NextResponse.json({ message: "Case study deleted successfully" })
}
