import { NextResponse } from "next/server"
import { getIsAdmin } from "@/lib/auth"

export async function GET() {
    const isAdmin = await getIsAdmin()
    console.log(isAdmin, "isAdmin--------------------------")
    return NextResponse.json({ isAdmin })
}
