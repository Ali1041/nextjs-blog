import Link from "next/link"
import { Lightbulb } from 'lucide-react'

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-sm border-b border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="https://www.ijaadlabs.com/" className="flex items-center space-x-2">
                        <Lightbulb className="w-6 h-6 text-[#7dff8e]" />
                        <span className="font-semibold text-xl">Ijaad Labs</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="https://www.ijaadlabs.com/" className="text-gray-300 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                            Blog
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

