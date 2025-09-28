import { NextResponse } from "next/server"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

// Simple user database - in production you'd use a real database
const ADMIN_USER = {
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    password: process.env.ADMIN_PASSWORD_HASH || "$2a$10$hash_not_set"
}

export async function POST(request) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            )
        }

        // Check credentials
        if (email !== ADMIN_USER.email) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            )
        }

        if (!await compare(password, ADMIN_USER.password)) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            )
        }

        // Generate JWT token
        const token = sign(
            { email: ADMIN_USER.email, isAdmin: true },
            process.env.JWT_SECRET || "fallback-secret-change-in-production",
            { expiresIn: "24h" }
        )

        // Create response with cookie
        const response = NextResponse.json({ success: true })

        response.cookies.set("admin-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 // 24 hours
        })

        return response

    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
