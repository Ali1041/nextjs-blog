"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Edit } from 'lucide-react'
import { getCurrentUser } from "@/lib/auth"

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isAdmin, setIsAdmin] = useState(false)
  const itemsPerPage = 6

  useEffect(() => {
    fetchPosts()
    checkAdmin()
  }, [currentPage])

  const checkAdmin = async () => {
    const user = await getCurrentUser()
    setIsAdmin(!!user)
    console.log("User:", user)
  }

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/posts?page=${currentPage}&limit=${itemsPerPage}`)
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts || [])
        setTotalPages(data.totalPages || 1)
      } else {
        setPosts([])
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

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
            {isAdmin && <div className="mt-6">
              <Link
                href="/blog/new"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Create New Post
              </Link>
            </div>}
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
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <span className="text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
