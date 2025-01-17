import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

// This would typically come from a database or CMS
const post = {
    id: 1,
    title: "Redefining Digital Experience in 2024",
    description: "Explore the latest trends in digital transformation and user experience design.",
    date: "Jan 17, 2024",
    readTime: "5 min read",
    category: "Digital Experience",
    image: "/placeholder.svg?height=600&width=1200",
    content: `
    <p>The digital landscape is constantly evolving, and with it, the way we think about user experiences. In 2024, we're seeing a paradigm shift in how businesses approach their digital presence and user interactions.</p>

    <h2>The Evolution of Digital Experiences</h2>
    <p>Digital experiences have come a long way from the static websites of the past. Today's users expect dynamic, personalized interactions that adapt to their needs and preferences. This shift has been driven by several key factors:</p>
    
    <ul>
      <li>Advanced AI and machine learning capabilities</li>
      <li>Increased focus on accessibility and inclusion</li>
      <li>The rise of immersive technologies</li>
      <li>Greater emphasis on performance and speed</li>
    </ul>

    <h2>Key Trends Shaping the Future</h2>
    <p>As we look ahead, several trends are emerging that will define the future of digital experiences:</p>

    <h3>1. Artificial Intelligence Integration</h3>
    <p>AI is becoming increasingly sophisticated, enabling more natural and intuitive interactions between users and digital platforms.</p>

    <h3>2. Immersive Experiences</h3>
    <p>Virtual and augmented reality are creating new possibilities for engaging users and delivering content in revolutionary ways.</p>

    <h3>3. Performance Optimization</h3>
    <p>With users expecting instant gratification, performance has become a critical factor in creating successful digital experiences.</p>
  `
}

export default function BlogPost({ params }) {
    return (
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
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2" />
                                        {post.readTime}
                                    </div>
                                    <div className="flex items-center">
                                        <Tag className="w-4 h-4 mr-2" />
                                        <span className="text-[#40e0d0]">{post.category}</span>
                                    </div>
                                </div>

                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                    {post.title}
                                </h1>

                                <p className="text-xl text-gray-400 mb-8">
                                    {post.description}
                                </p>

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
    )
}

