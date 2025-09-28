import { put, head } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const { searchParams } = new URL(request.url)
        const filename = searchParams.get('filename')

        // You'll put more file validations (e.g. file type/size) here
        const blob = await put(filename, request.body, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
            store: 'store_iDnrOcx8gHZ6YMOU'
        })

        return NextResponse.json(blob)
    } catch (error) {
        console.error('Error uploading file:', error)
        return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 })
    }
}
