"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import RichTextEditor from "@/components/RichTextEditor"
import Navbar from "@/components/Navbar"
import { supabase } from "@/lib/db"

export default function EditCaseStudy() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")
    const [client, setClient] = useState("")
    const [industry, setIndustry] = useState("")
    const [results, setResults] = useState("")
    const [image, setImage] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [tag, setTag] = useState("")
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        fetchCaseStudy()
    }, [params.id])

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

    const fetchCaseStudy = async () => {
        try {
            const { data: study, error } = await supabase
                .from('case_studies')
                .select('*')
                .eq('id', params.id)
                .single()

            if (error) {
                console.error("Error fetching case study:", error)
                router.push("/case-studies")
                return
            }

            setTitle(study.title || "")
            setContent(study.content || "")
            setAuthor(study.author || "")
            setClient(study.client || "")
            setIndustry(study.industry || "")
            setResults(study.results || "")
            setImage(study.image || "")
            setTags(study.tags || [])
        } catch (error) {
            console.error("Error fetching case study:", error)
            router.push("/case-studies")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        let imageUrl = image

        if (selectedFile) {
            try {
                imageUrl = await uploadImage(selectedFile)
            } catch (error) {
                console.error('Error uploading image:', error)
                setSaving(false)
                return
            }
        }

        try {
            const { data, error } = await supabase
                .from('case_studies')
                .update({
                    title,
                    content,
                    author,
                    client,
                    industry,
                    results,
                    image: imageUrl,
                    tags: tags || []
                })
                .eq('id', params.id)
                .select()
                .single()

            if (error) {
                console.error('Error updating case study:', error)
            } else {
                router.push(`/case-studies/${params.id}`)
                router.refresh()
            }
        } catch (error) {
            console.error("Error updating case study:", error)
        } finally {
            setSaving(false)
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

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
                <Navbar />
                <div className="text-white">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 pb-12">
            <Navbar />
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center">Edit Case Study</h1>
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
                            placeholder="Describe the case study in detail..."
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
                        <label htmlFor="client" className="block text-sm font-medium text-gray-300 mb-2">
                            Client
                        </label>
                        <Input
                            id="client"
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                            required
                            className="bg-gray-900/50 border-gray-800 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
                            Industry
                        </label>
                        <Input
                            id="industry"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="bg-gray-900/50 border-gray-800 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="results" className="block text-sm font-medium text-gray-300 mb-2">
                            Key Results (comma-separated)
                        </label>
                        <Input
                            id="results"
                            value={results}
                            onChange={(e) => setResults(e.target.value)}
                            className="bg-gray-900/50 border-gray-800 text-white"
                            placeholder="Result 1, Result 2, Result 3"
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
                            <Button type="button" onClick={addTag} variant="outline">
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
                    <div className="flex gap-4">
                        <Button type="submit" disabled={saving} className="flex-1">
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push(`/case-studies/${params.id}`)}
                            variant="outline"
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
