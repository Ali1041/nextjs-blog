import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Pagination } from "@/components/pagination"
import { getPosts } from "./action"
import Navbar from "@/components/Navbar"

export default async function BlogPage({
  searchParams,
}) {
  const currentPage = Number(searchParams.page) || 1
  const { posts, totalPages } = await getPosts(currentPage)

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Our Latest{" "}
              <span className="bg-gradient-to-r from-[#40e0d0] to-[#7dff8e] text-transparent bg-clip-text">Insights</span>
            </h1>
            <p className="text-gray-400">Explore our thoughts on technology, design, and digital transformation</p>
          </div>
          <div className="flex justify-center mb-12">
            <Link href="/blog/new">
              <button className="bg-[#40e0d0] hover:bg-[#40e0d0]/80 text-black font-semibold px-6 py-3 rounded-lg transition-colors">
                Create New Post
              </button>
            </Link>
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
                    <CardTitle className="mb-2 line-clamp-2 no-underline">{post.title}</CardTitle>
                    <CardDescription className="text-gray-400 line-clamp-2">
                      {post.content.substring(0, 100)}...
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(Array.isArray(post.tags) ? post.tags : post.tags ? post.tags.split(",") : []).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-800 text-white">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mt-4">{new Date(post.created_at).toLocaleDateString()}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </>
  )
}
