import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"

const caseStudies = [
    {
        id: 1,
        title: "E-Commerce Platform Revamp",
        description: "Transformed a legacy e-commerce site into a modern, responsive platform, increasing conversion rates by 40%.",
        image: "/assets/images/thumbnails/1.jpg",
        category: "Web Development",
        client: "TechCorp Inc.",
        results: ["40% increase in conversions", "50% faster load times", "Mobile-friendly design"]
    },
    {
        id: 2,
        title: "AI-Powered Customer Service Bot",
        description: "Developed an intelligent chatbot using GPT technology that handles 70% of customer inquiries automatically.",
        image: "/assets/images/thumbnails/2.jpg",
        category: "AI & ML",
        client: "ServicePro",
        results: ["70% automated inquiries", "24/7 customer support", "Improved response time by 80%"]
    },
    {
        id: 3,
        title: "Enterprise Data Analytics Dashboard",
        description: "Built a comprehensive dashboard that visualizes complex business metrics, enabling real-time decision making.",
        image: "/assets/images/thumbnails/3.jpg",
        category: "Data Analytics",
        client: "DataDriven Corp.",
        results: ["Real-time insights", "30% cost savings", "Enhanced forecasting accuracy"]
    },
    {
        id: 4,
        title: "Mobile Banking App Overhaul",
        description: "Redesigned and rebuilt a banking app with modern UX practices, leading to 2x user engagement.",
        image: "/assets/images/thumbnails/4.jpg",
        category: "Mobile Development",
        client: "FinTech Bank",
        results: ["2x user engagement", "Improved security", "Seamless integration"]
    },
    {
        id: 5,
        title: "Cloud Migration Success Story",
        description: "Successfully migrated a monolithic application to microservices on AWS, reducing operational costs by 35%.",
        image: "/assets/images/thumbnails/5.jpg",
        category: "Cloud Computing",
        client: "Legacy Systems Ltd.",
        results: ["35% cost reduction", "99.9% uptime", "Scalable architecture"]
    },
    {
        id: 6,
        title: "SaaS Product Launch",
        description: "Launched a B2B SaaS platform from concept to MVP in 3 months, securing 500+ beta users.",
        image: "/assets/images/thumbnails/6.jpg",
        category: "SaaS Development",
        client: "InnovateCo",
        results: ["500+ beta users", "3-month development", "Strong market fit"]
    }
]

export default function CaseStudiesPage() {
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {caseStudies.map((study) => (
                            <Card key={study.id} className="h-full bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors overflow-hidden">
                                <CardHeader className="p-0">
                                    <Image
                                        src={study.image}
                                        alt={study.title}
                                        width={600}
                                        height={300}
                                        className="object-cover h-48 w-full"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                                        {study.category}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <CardTitle className="mb-3 line-clamp-2">{study.title}</CardTitle>
                                    <CardDescription className="text-gray-400 mb-4 line-clamp-3">
                                        {study.description}
                                    </CardDescription>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-white mb-2">Key Results:</h4>
                                        <ul className="text-sm text-gray-400 space-y-1">
                                            {study.results.map((result, idx) => (
                                                <li key={idx} className="flex items-center">
                                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 flex-shrink-0"></span>
                                                    {result}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium text-gray-300">Client:</span> {study.client}
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
