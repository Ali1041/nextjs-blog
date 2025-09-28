import { NextResponse } from 'next/server'
import { getAdminTokenPayload } from '@/lib/auth'

export function middleware(request) {
    const { pathname } = request.nextUrl

    // Admin routes that require authentication
    const adminRoutes = [
        '/blog/new',
        '/blog/[id]/edit',
        '/case-studies/new',
    ]

    // Check if the current path is an admin route
    const isAdminRoute = adminRoutes.some(route =>
        pathname.startsWith(route.replace('[id]', '1')) ||
        pathname.match(new RegExp(`^${route.replace('[id]', '\\d+')}/?$`))
    )

    if (isAdminRoute) {
        const token = request.cookies.get('admin-token')?.value

        if (!token) {
            // Redirect to login page if no token
            const loginUrl = new URL('/admin/login', request.url)
            return NextResponse.redirect(loginUrl)
        }

        try {
            const payload = getAdminTokenPayload(token)
            if (!payload?.isAdmin) {
                // Redirect to login if invalid token
                const loginUrl = new URL('/admin/login', request.url)
                return NextResponse.redirect(loginUrl)
            }
        } catch (error) {
            // Token is invalid, redirect to login
            const loginUrl = new URL('/admin/login', request.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/blog/new',
        '/blog/:id/edit',
        '/case-studies/new',
    ]
}
