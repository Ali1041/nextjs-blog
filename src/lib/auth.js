import { supabase } from "./db"

export async function getIsAdmin() {
    try {
        const { data: { session } } = await supabase.auth.getSession()

        // Check if user is authenticated via Supabase
        return !!session?.user
    } catch (error) {
        console.error('Error checking admin status:', error)
        return false
    }
}

export async function getCurrentUser() {
    try {
        const { data: { session } } = await supabase.auth.getSession()
        return session?.user || null
    } catch (error) {
        console.error('Error getting current user:', error)
        return null
    }
}
