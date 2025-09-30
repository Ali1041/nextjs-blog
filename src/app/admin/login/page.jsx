"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/db"

export default function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const { user, session, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            setError(error.message || "Login failed")
            setLoading(false)
            return
        }
        router.push("/")
        setLoading(false)
    }

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-900">
            <Card className="w-full max-w-md bg-gray-800 border-gray-700">
                <CardHeader className="text-center">
                    <CardTitle className="text-white">Admin Login</CardTitle>
                    <p className="text-gray-400 text-sm">
                        Sign in to access admin panel
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-gray-900 border-gray-600 text-white"
                                placeholder="admin@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-gray-900 border-gray-600 text-white"
                                placeholder="Enter your password"
                            />
                        </div>
                        {error && (
                            <div className="text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <a
                            href="/"
                            className="text-primary text-sm hover:underline"
                        >
                            ← Back to website
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
