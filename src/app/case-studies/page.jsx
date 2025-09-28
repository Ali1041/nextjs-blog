"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Edit } from 'lucide-react'

export default function CaseStudiesPage() {
    const [caseStudies, setCaseStudies] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const itemsPerPage = 6

    useEffect(() => {
        fetchCaseStudies()
    }, [currentPage])

    const fetchCaseStudies = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/case-studies?page=${currentPage}&limit=${itemsPerPage}`)
            if (response.ok) {
                const data = await response.json()
                setCaseStudies(data.caseStudies || [])
                setTotalPages(data.totalPages || 1)
            } else {
                setCaseStudies([])
            }
        } catch (error) {
            console.error('Error fetching case studies:', error)
            setCaseStudies([])
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
        <div className="wrapper d-flex flex-column justify-between">
            <Navbar />
            <main className="flex-grow-1 pt-24 pb-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto mb-12 text-center">
                        <h1 className="text-4xl font-bold mb-4">
                            Our {" "}
                            <span className="bg-gradient-to-r from-[#40e0d0] to-[#7dff8e] text-transparent bg-clip-text">Case Studies</span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Explore real-world examples of how we've helped businesses transform and succeed with our solutions.
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/case-studies/new"
                                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Create Case Study
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {caseStudies.map((study) => (
                            <Card key={study.id} className="h-full bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors overflow-hidden">
                                <CardHeader className="p-0">
                                    <Image
                                        src={study.image || "/placeholder.svg"}
                                        alt={study.title}
                                        width={600}
                                        height={300}
                                        className="object-cover h-48 w-full"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                                        {study.industry || study.tags?.[0] || "Web Development"}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <CardTitle className="mb-3 line-clamp-2">{study.title}</CardTitle>
                                    <CardDescription className="text-gray-400 mb-4 line-clamp-3">
                                        {study.content ? study.content.replace(/<[^>]*>/g, '') : "No description available."}
                                    </CardDescription>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-white mb-2">Key Results:</h4>
                                        <ul className="text-sm text-gray-400 space-y-1">
                                            {(study.results ? study.results.split(",") : ["Coming soon"]).map((result, idx) => (
                                                <li key={idx} className="flex items-center">
                                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 flex-shrink-0"></span>
                                                    {result.trim()}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium text-gray-300">Client:</span> {study.client || "Anonymous"}
                                        </div>
                                        <Link
                                            href={`/case-studies/${study.id}`}
                                            className="text-primary text-sm font-medium hover:underline"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
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

                    <div className="text-center mt-12">
                        <p className="text-gray-400 mb-4">
                            Have a project in mind? Let's discuss how we can help.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-[#40e0d0] to-[#7dff8e] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
