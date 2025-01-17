import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const posts = [
    {
        id: 1,
        title: "Redefining Digital Experience in 2024",
        description: "Explore the latest trends in digital transformation and user experience design.",
        date: "Jan 17, 2024",
        image: "/placeholder.svg?height=400&width=600",
        category: "Digital Experience"
    },
    {
        id: 2,
        title: "The Future of Web Development",
        description: "Insights into emerging technologies and methodologies shaping the web.",
        date: "Jan 16, 2024",
        image: "/placeholder.svg?height=400&width=600",
        category: "Development"
    },
    {
        id: 3,
        title: "AI in Modern Business",
        description: "How artificial intelligence is transforming business operations and decision making.",
        date: "Jan 15, 2024",
        image: "/placeholder.svg?height=400&width=600",
        category: "Technology"
    }
]

export default function BlogPage() {
    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Our Latest{" "}
                        <span className="bg-gradient-to-r from-[#40e0d0] to-[#7dff8e] text-transparent bg-clip-text">
                            Insights
                        </span>
                    </h1>
                    <p className="text-gray-400">
                        Explore our thoughts on technology, design, and digital transformation
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`}>
                            <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
                                <CardHeader className="p-0">
                                    <Image
                                        src={post.image || "/placeholder.svg"}
                                        alt={post.title}
                                        width={600}
                                        height={400}
                                        className="rounded-t-lg object-cover h-48 w-full"
                                    />
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="text-sm text-[#40e0d0] mb-2">{post.category}</div>
                                    <CardTitle className="mb-2 line-clamp-2">{post.title}</CardTitle>
                                    <CardDescription className="text-gray-400 line-clamp-2">
                                        {post.description}
                                    </CardDescription>
                                    <div className="text-sm text-gray-500 mt-4">{post.date}</div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

