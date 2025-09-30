"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import RichTextEditor from "@/components/RichTextEditor"
import { supabase } from "@/lib/db"

export default function NewBlogPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [image, setImage] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState([])
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        router.push("/admin/login")
        return
      }
      if (!data?.session?.user) {
        router.push("/admin/login")
        return
      }
    };

    checkAdminStatus();
  }, [])

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
  }

  const uploadImage = async (file) => {
    if (!file) return null

    const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
      method: 'POST',
      body: file,
    })

    if (response.ok) {
      const data = await response.json()
      return data.url
    } else {
      throw new Error('Upload failed')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let imageUrl = image

    if (selectedFile) {
      setUploading(true)
      try {
        imageUrl = await uploadImage(selectedFile)
      } catch (error) {
        console.error('Error uploading image:', error)
        setUploading(false)
        return
      }
      setUploading(false)
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([{
        title,
        content,
        author,
        image: imageUrl,
        tags: tags || [],
        status: 'draft'
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating post:', error)
    } else {
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
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your blog post..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">
              Author (Optional)
            </label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-gray-900/50 border-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
              Featured Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileSelect}
              className="bg-gray-900/50 border-gray-800 text-white rounded-md px-3 py-2 w-full file:bg-[#40e0d0] file:text-black file:rounded file:px-3 file:py-1 file:mr-3 file:border-none"
            />
            {selectedFile && (
              <p className="text-sm text-gray-400 mt-2">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="image-url" className="block text-sm font-medium text-gray-300 mb-2">
              Or enter Image URL
            </label>
            <Input
              id="image-url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="bg-gray-900/50 border-gray-800 text-white"
              placeholder="https://example.com/image.jpg"
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
          <Button type="submit" disabled={uploading} className="w-full">
            {uploading ? "Uploading..." : "Create Post"}
          </Button>
        </form>
      </div>
    </div>
  )
}
