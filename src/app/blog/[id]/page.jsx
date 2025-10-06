"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Tag, Edit } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { getCurrentUser } from "@/lib/auth"

export default function BlogPost() {
    const params = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        fetchPost()
        checkAdmin()
    }, [params.id])

    const checkAdmin = async () => {
        const user = await getCurrentUser()
        setIsAdmin(!!user)
    }

    const fetchPost = async () => {
        try {
            const res = await fetch(`/api/posts/${params.id}`, {
                cache: 'no-store'
            })
            if (!res.ok) {
                setPost(null)
            } else {
                const data = await res.json()
                setPost(data)
            }
        } catch (error) {
            console.error('Error fetching post:', error)
            setPost(null)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen pt-24 pb-12">
                    <div className="container mx-auto px-4 text-center">
                        <div className="text-white">Loading...</div>
                    </div>
                </div>
            </>
        )
    }

    if (!post) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen pt-24 pb-12">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                        <Link href="/blog" className="text-primary hover:underline">
                            ← Back to Blog
                        </Link>
                    </div>
                </div>
            </>
        )
    }

    // Format date
    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-24 pb-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to all posts
                        </Link>

                        <Card className="bg-gray-900/50 border-gray-800">
                            <CardContent className="p-0">
                                <div className="relative h-[300px] md:h-[400px] w-full">
                                    <Image
                                        src={post.image || "/placeholder.svg"}
                                        alt={post.title}
                                        fill
                                        className="object-cover rounded-t-lg"
                                        priority
                                    />
                                </div>

                                <div className="p-6 md:p-8">
                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                {formattedDate}
                                            </div>
                                        </div>
                                        {isAdmin && (
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/blog/${params.id}/edit`}>
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Link>
                                            </Button>
                                        )}
                                    </div>

                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                        {post.title}
                                    </h1>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {post.tags && post.tags.map((tag, index) => (
                                            <span key={index} className="bg-[#40e0d0]/20 text-[#40e0d0] px-3 py-1 rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <Separator className="my-8 bg-gray-800" />

                                    <div
                                        className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8 prose-p:text-gray-300 prose-li:text-gray-300 prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-6"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
