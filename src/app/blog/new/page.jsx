"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function NewBlogPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [image, setImage] = useState("")
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState([])
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, author, image, tags }),
    })

    if (response.ok) {
      router.push("/blog")
      router.refresh()
    }
  }

  const addTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Create New Blog Post</h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-gray-900/50 border-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="bg-gray-900/50 border-gray-800 text-white"
              rows={10}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">
              Author
            </label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="bg-gray-900/50 border-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="bg-gray-900/50 border-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex items-center">
              <Input
                id="tags"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="bg-gray-900/50 border-gray-800 text-white mr-2"
              />
              <Button type="button" onClick={addTag}>
                Add Tag
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-800 text-white">
                  {t}
                  <X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => removeTag(t)} />
                </Badge>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">
            Create Post
          </Button>
        </form>
      </div>
    </div>
  )
}

