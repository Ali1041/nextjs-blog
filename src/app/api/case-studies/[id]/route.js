import { NextResponse } from "next/server"
import { supabase } from "@/lib/db"

// GET a single case study
export async function GET(request, { params }) {
    const { id } = await params
    console.log('API: Fetching case study with ID:', id)
    
    // Convert ID to number if it's a string
    const numericId = parseInt(id)
    console.log('API: Converted ID to number:', numericId)
    
    const { data: caseStudy, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', numericId)
        .single()

    console.log('API: Supabase response:', { data: caseStudy, error })

    if (error || !caseStudy) {
        console.log('API: Case study not found, error:', error)
        return NextResponse.json({ error: "Case study not found" }, { status: 404 })
    }

    // Ensure tags is an array and clean them
    if (Array.isArray(caseStudy.tags)) {
        caseStudy.tags = caseStudy.tags
    } else if (caseStudy.tags) {
        try {
            // Try to parse as JSON first (in case it's stored as JSON string)
            caseStudy.tags = JSON.parse(caseStudy.tags)
        } catch {
            // If not JSON, split by comma and clean each tag
            caseStudy.tags = caseStudy.tags.split(",").map(tag => tag.replace(/['"\[\]]/g, '').trim()).filter(tag => tag.length > 0)
        }
    } else {
        caseStudy.tags = []
    }
    console.log('API: Returning case study:', caseStudy)
    return NextResponse.json(caseStudy)
}

// PUT (update) a case study
export async function PUT(request, { params }) {
    const { id } = await params
    const { title, content, author, client, industry, results, image, tags } = await request.json()

    console.log('API: Updating case study with ID:', id, 'Type:', typeof id)
    
    // Convert ID to number if it's a string
    const numericId = parseInt(id)
    console.log('API: Converted ID to number:', numericId)
    
    // First check if the case study exists
    const { data: existingCaseStudy, error: fetchError } = await supabase
        .from('case_studies')
        .select('id')
        .eq('id', numericId)
        .single()

    console.log('API: Existing case study check:', { data: existingCaseStudy, error: fetchError })

    if (fetchError || !existingCaseStudy) {
        console.log('API: Case study not found for update')
        return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
    }

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
        .eq('id', numericId)
        .select()

    console.log('API: Update result:', { data, error })

    if (error) {
        console.error('Error updating case study:', error)
        return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 })
    }

    return NextResponse.json(data[0])
}

// DELETE a case study
export async function DELETE(request, { params }) {
    const { id } = await params
    const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting case study:', error)
        return NextResponse.json({ error: 'Failed to delete case study' }, { status: 500 })
    }

    return NextResponse.json({ message: "Case study deleted successfully" })
}
