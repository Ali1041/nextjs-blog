import { NextResponse } from "next/server"
import { supabase } from "@/lib/db"

export async function POST() {
    try {
        // Sign out from Supabase
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error('Supabase logout error:', error)
            return NextResponse.json(
                { error: "Failed to logout" },
                { status: 500 }
            )
        }

        const response = NextResponse.json({ success: true })
        return response
    } catch (error) {
        console.error("Logout error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
