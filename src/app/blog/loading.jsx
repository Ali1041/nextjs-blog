import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto mb-12 text-center">
                    <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
                    <Skeleton className="h-6 w-2/3 mx-auto" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} className="h-full bg-gray-900/50 border-gray-800">
                            <CardHeader className="p-0">
                                <Skeleton className="h-48 w-full rounded-t-lg" />
                            </CardHeader>
                            <CardContent className="p-6">
                                <Skeleton className="h-4 w-20 mb-2" />
                                <Skeleton className="h-6 w-full mb-2" />
                                <Skeleton className="h-4 w-full mb-4" />
                                <Skeleton className="h-4 w-24" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
        </div>
    )
}

