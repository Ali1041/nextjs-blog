"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { getCurrentUser } from "@/lib/auth"

export default function CaseStudyPage() {
    const params = useParams()
    const [study, setStudy] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        fetchCaseStudy()
        checkAdmin()
    }, [params.id])

    const checkAdmin = async () => {
        const user = await getCurrentUser()
        setIsAdmin(!!user)
    }

    const fetchCaseStudy = async () => {
        try {
            const res = await fetch(`/api/case-studies/${params.id}`, {
                cache: 'no-store'
            })
            if (!res.ok) {
                console.error('API response not ok:', res.status, res.statusText)
                setStudy(null)
            } else {
                const data = await res.json()
                console.log('Case study data received:', data)
                setStudy(data)
            }
        } catch (error) {
            console.error('Error fetching case study:', error)
            setStudy(null)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="wrapper d-flex flex-column justify-between">
                <Navbar />
                <main className="flex-grow-1 pt-24 pb-12">
                    <div className="container mx-auto px-4 text-center">
                        <div className="text-white">Loading...</div>
                    </div>
                </main>
            </div>
        )
    }

    if (!study) {
        return (
            <div className="wrapper d-flex flex-column justify-between">
                <Navbar />
                <main className="flex-grow-1 pt-24 pb-12">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
                        <Link href="/case-studies" className="text-primary hover:underline">
                            ← Back to Case Studies
                        </Link>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="wrapper d-flex flex-column justify-between">
            <Navbar />
            <main className="flex-grow-1 pt-24 pb-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/case-studies"
                            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to all case studies
                        </Link>

                        <Card className="bg-gray-900/50 border-gray-800">
                            <CardContent className="p-0">
                                <div className="relative h-[300px] md:h-[400px] w-full">
                                    <Image
                                        src={study.image}
                                        alt={study.title}
                                        fill
                                        className="object-cover rounded-t-lg"
                                        priority
                                    />
                                </div>

                                <div className="p-6 md:p-8">
                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                        <div className="flex flex-wrap items-center gap-4">
                                            {study.industry && (
                                                <span className="px-3 py-1 bg-[#40e0d0] text-black rounded-full text-xs font-semibold">
                                                    {study.industry}
                                                </span>
                                            )}
                                            <span className="text-gray-400 text-sm">
                                                Client: {study.client}
                                            </span>
                                        </div>
                                        {isAdmin && (
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/case-studies/${params.id}/edit`}>
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Link>
                                            </Button>
                                        )}
                                    </div>

                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                                        {study.title}
                                    </h1>

                                    <div className="mb-6">
                                        <p className="text-lg text-gray-400">
                                            Created by {study.author || 'Anonymous'}
                                        </p>
                                    </div>

                                    {/* Format date if available */}
                                    {study.created_at && (
                                        <p className="text-sm text-gray-500 mb-6">
                                            {new Date(study.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    )}

                                    <Separator className="my-8 bg-gray-800" />

                                    <div
                                        className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8 prose-p:text-gray-300 prose-li:text-gray-300 prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-6"
                                        dangerouslySetInnerHTML={{ __html: study.content }}
                                    />

                                    <Separator className="my-8 bg-gray-800" />

                                    {study.results && (
                                        <>
                                            <div>
                                                <h2 className="text-2xl font-bold mb-4 text-white">Key Results</h2>
                                                <ul className="space-y-2 mb-8">
                                                    {study.results.split(',').map((result, idx) => (
                                                        <li key={idx} className="flex items-start">
                                                            <span className="w-2 h-2 bg-[#7dff8e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                            <span className="text-gray-300">{result.trim()}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <Separator className="my-8 bg-gray-800" />
                                        </>
                                    )}

                                    {study.tags && study.tags.length > 0 && (
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4 text-white">Tags</h2>
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {study.tags.map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
