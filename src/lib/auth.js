import { verify } from "jsonwebtoken"
import { cookies } from "next/headers"

export async function getIsAdmin() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("admin-token")?.value

        if (!token) {
            return false
        }

        const decoded = verify(token, process.env.JWT_SECRET || "fallback-secret-change-in-production")

        return decoded.isAdmin === true
    } catch (error) {
        return false
    }
}

export function getAdminTokenPayload(token) {
    try {
        return verify(token, process.env.JWT_SECRET || "fallback-secret-change-in-production")
    } catch (error) {
        return null
    }
}
