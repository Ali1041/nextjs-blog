import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"

// This would typically come from a database or CMS
const getCaseStudyById = (id) => {
    const caseStudies = [
        {
            id: "1",
            title: "E-Commerce Platform Revamp",
            description: "Transformed a legacy e-commerce site into a modern, responsive platform, increasing conversion rates by 40%.",
            image: "/assets/images/thumbnails/1.jpg",
            category: "Web Development",
            client: "TechCorp Inc.",
            results: ["40% increase in conversions", "50% faster load times", "Mobile-friendly design"],
            challenge: `
                TechCorp Inc. was struggling with an outdated e-commerce platform that had poor user experience,
                slow loading times, and low conversion rates. The legacy system was built on outdated technologies
                and wasn't mobile-optimized, leading to significant revenue loss.
            `,
            solution: `
                We conducted a comprehensive audit of the existing platform and redesigned it from the ground up
                using modern web technologies. We implemented a responsive design, optimized performance, and
                integrated advanced e-commerce features including:
                <ul>
                  <li>Responsive design for all devices</li>
                  <li>Advanced product filtering and search</li>
                  <li>Streamlined checkout process</li>
                  <li>Real-time inventory management</li>
                  <li>Integration with payment gateways</li>
                </ul>
            `,
            technologies: ["React", "Node.js", "MongoDB", "AWS", "Stripe"],
            readTime: "8 min read"
        },
        {
            id: "2",
            title: "AI-Powered Customer Service Bot",
            description: "Developed an intelligent chatbot using GPT technology that handles 70% of customer inquiries automatically.",
            image: "/assets/images/thumbnails/2.jpg",
            category: "AI & ML",
            client: "ServicePro",
            results: ["70% automated inquiries", "24/7 customer support", "Improved response time by 80%"],
            challenge: `
                ServicePro was overwhelmed with customer inquiries coming through multiple channels including
                phone, email, and chat. Their support team was working around the clock, but response times
                were still slow and customer satisfaction was declining.
            `,
            solution: `
                We developed an AI-powered customer service bot using advanced natural language processing
                and machine learning algorithms. The bot was trained on historical customer data and support
                responses to provide accurate and helpful answers.

                Key features include:
                <ul>
                  <li>Natural language understanding</li>
                  <li>Multi-language support</li>
                  <li>Integration with existing CRM</li>
                  <li>Seamless escalation to human agents</li>
                  <li>Continuous learning from interactions</li>
                </ul>
            `,
            technologies: ["Python", "TensorFlow", "OpenAI API", "WebSocket", "PostgreSQL"],
            readTime: "6 min read"
        },
        {
            id: "3",
            title: "Enterprise Data Analytics Dashboard",
            description: "Built a comprehensive dashboard that visualizes complex business metrics, enabling real-time decision making.",
            image: "/assets/images/thumbnails/3.jpg",
            category: "Data Analytics",
            client: "DataDriven Corp.",
            results: ["Real-time insights", "30% cost savings", "Enhanced forecasting accuracy"],
            challenge: `
                DataDriven Corp. had vast amounts of business data scattered across multiple systems but lacked
                a unified way to visualize and analyze this information. Management was making decisions based
                on outdated reports and gut feelings rather than real-time insights.
            `,
            solution: `
                We built a comprehensive data analytics dashboard that aggregates data from all their systems
                and presents it in an intuitive, visually appealing interface. The dashboard features:

                <ul>
                  <li>Real-time data updates</li>
                  <li>Customizable widgets and charts</li>
                  <li>Advanced filtering and drill-down capabilities</li>
                  <li>Predictive analytics and forecasting</li>
                  <li>Mobile-responsive design for on-the-go access</li>
                </ul>
            `,
            technologies: ["React", "D3.js", "Python", "Apache Kafka", "Docker"],
            readTime: "7 min read"
        },
        {
            id: "4",
            title: "Mobile Banking App Overhaul",
            description: "Redesigned and rebuilt a banking app with modern UX practices, leading to 2x user engagement.",
            image: "/assets/images/thumbnails/4.jpg",
            category: "Mobile Development",
            client: "FinTech Bank",
            results: ["2x user engagement", "Improved security", "Seamless integration"],
            challenge: `
                FinTech Bank's mobile app had poor user adoption due to clunky interface, slow performance,
                and outdated security features. Users were abandoning the app in favor of competitors'
                more modern and user-friendly solutions.
            `,
            solution: `
                We completely redesigned the mobile banking app with modern UX practices and cutting-edge
                security features. The new app includes:

                <ul>
                  <li>Biometric authentication (fingerprint & face ID)</li>
                  <li>Intuitive navigation and gesture controls</li>
                  <li>Dark mode and accessibility features</li>
                  <li>Real-time transaction notifications</li>
                  <li>Integration with wearables and IoT devices</li>
                </ul>
            `,
            technologies: ["React Native", "Swift", "Kotlin", "Firebase", "Stripe"],
            readTime: "9 min read"
        },
        {
            id: "5",
            title: "Cloud Migration Success Story",
            description: "Successfully migrated a monolithic application to microservices on AWS, reducing operational costs by 35%.",
            image: "/assets/images/thumbnails/5.jpg",
            category: "Cloud Computing",
            client: "Legacy Systems Ltd.",
            results: ["35% cost reduction", "99.9% uptime", "Scalable architecture"],
            challenge: `
                Legacy Systems Ltd. was running a monolithic Java application on-premises that was becoming
                increasingly expensive to maintain and scale. Performance issues and downtime were impacting
                their business operations significantly.
            `,
            solution: `
                We orchestrated a complex migration from their on-premises monolith to a cloud-native microservices
                architecture on AWS. The migration involved:

                <ul>
                  <li>Application architecture redesign</li>
                  <li>Containerization with Docker</li>
                  <li>Orchestration with Kubernetes (EKS)</li>
                  <li>Database migration and optimization</li>
                  <li>Implementation of CI/CD pipelines</li>
                  <li>Security and compliance auditing</li>
                </ul>
            `,
            technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
            readTime: "10 min read"
        },
        {
            id: "6",
            title: "SaaS Product Launch",
            description: "Launched a B2B SaaS platform from concept to MVP in 3 months, securing 500+ beta users.",
            image: "/assets/images/thumbnails/6.jpg",
            category: "SaaS Development",
            client: "InnovateCo",
            results: ["500+ beta users", "3-month development", "Strong market fit"],
            challenge: `
                InnovateCo had a great idea for a productivity tool but lacked the technical resources to
                build it. They needed to validate their concept quickly and get it to market before
                competitors could catch up.
            `,
            solution: `
                We worked closely with InnovateCo to transform their vision into a fully functional SaaS platform.
                Our agile development approach allowed us to deliver an MVP in just 3 months:

                <ul>
                  <li>Rapid prototyping and user testing</li>
                  <li>Modern, scalable architecture</li>
                  <li>Subscription management and billing</li>
                  <li>Multi-tenancy support</li>
                  <li>Analytics and user behavior tracking</li>
                  <li>Automated deployment and scaling</li>
                </ul>
            `,
            technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Vercel"],
            readTime: "5 min read"
        }
    ]

    return caseStudies.find(study => study.id === id) || null
}

export default function CaseStudyPage({ params }) {
    const study = getCaseStudyById(params.id)

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
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 bg-[#40e0d0] text-black rounded-full text-xs font-semibold">
                                            {study.category}
                                        </span>
                                        <span className="text-gray-400 text-sm">{study.readTime}</span>
                                    </div>

                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                                        {study.title}
                                    </h1>

                                    <p className="text-xl text-gray-400 mb-6">
                                        {study.description}
                                    </p>

                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold mb-3 text-white">Client: {study.client}</h2>
                                    </div>

                                    <Separator className="my-8 bg-gray-800" />

                                    <div>
                                        <h2 className="text-2xl font-bold mb-4 text-white">The Challenge</h2>
                                        <div
                                            className="text-gray-300 leading-relaxed mb-8"
                                            dangerouslySetInnerHTML={{ __html: study.challenge }}
                                        />
                                    </div>

                                    <Separator className="my-8 bg-gray-800" />

                                    <div>
                                        <h2 className="text-2xl font-bold mb-4 text-white">Our Solution</h2>
                                        <div
                                            className="text-gray-300 leading-relaxed mb-8"
                                            dangerouslySetInnerHTML={{ __html: study.solution }}
                                        />
                                    </div>

                                    <Separator className="my-8 bg-gray-800" />

                                    <div>
                                        <h2 className="text-2xl font-bold mb-4 text-white">Key Results</h2>
                                        <ul className="space-y-2 mb-8">
                                            {study.results.map((result, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="w-2 h-2 bg-[#7dff8e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                    <span className="text-gray-300">{result}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Separator className="my-8 bg-gray-800" />

                                    <div>
                                        <h2 className="text-2xl font-bold mb-4 text-white">Technologies Used</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {study.technologies.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
