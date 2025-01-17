import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from "next/link"



export function Pagination({ currentPage, totalPages }) {
    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            <Button
                variant="outline"
                className="bg-gray-900/50 border-gray-800"
                asChild
                disabled={currentPage <= 1}
            >
                <Link
                    href={`/blog?page=${currentPage - 1}`}
                    aria-label="Previous page"
                    className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Link>
            </Button>
            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        className={`bg-gray-900/50 border-gray-800 ${currentPage === pageNumber ? "bg-gray-800" : ""
                            }`}
                        asChild
                    >
                        <Link
                            href={`/blog?page=${pageNumber}`}
                            aria-label={`Page ${pageNumber}`}
                            aria-current={currentPage === pageNumber ? "page" : undefined}
                        >
                            {pageNumber}
                        </Link>
                    </Button>
                ))}
            </div>
            <Button
                variant="outline"
                className="bg-gray-900/50 border-gray-800"
                asChild
                disabled={currentPage >= totalPages}
            >
                <Link
                    href={`/blog?page=${currentPage + 1}`}
                    aria-label="Next page"
                    className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                >
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </Button>
        </div>
    )
}

