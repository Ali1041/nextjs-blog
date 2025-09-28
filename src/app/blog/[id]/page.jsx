import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Tag, Edit } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { notFound } from "next/navigation"

async function getPost(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
            cache: 'no-store' // Ensure fresh data
        })
        if (!res.ok) {
            return null
        }
        return res.json()
    } catch (error) {
        console.error('Error fetching post:', error)
        return null
    }
}

export default async function BlogPost({ params }) {
    const post = await getPost(params.id)

    if (!post) {
        notFound()
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
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/blog/${params.id}/edit`}>
                                                <Edit className="w-4 h-4 mr-2" />
                                                Edit
                                            </Link>
                                        </Button>
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
