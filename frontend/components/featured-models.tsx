import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredModels = [
  {
    id: 1,
    name: "NeuralNet-7B",
    description: "A powerful language model for natural language processing tasks.",
    price: "0.05 ETH",
    category: "NLP",
    rating: 4.8,
  },
  {
    id: 2,
    name: "VisionTransformer-L",
    description: "State-of-the-art computer vision model for image recognition.",
    price: "0.08 ETH",
    category: "Computer Vision",
    rating: 4.9,
  },
  {
    id: 3,
    name: "AudioGen-XL",
    description: "Advanced audio generation model for music and speech synthesis.",
    price: "0.03 ETH",
    category: "Audio",
    rating: 4.7,
  },
]

export function FeaturedModels() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Featured Models</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl">
            Discover top-rated AI models from our marketplace
          </p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredModels.map((model) => (
            <Card key={model.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge>{model.category}</Badge>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-1 text-sm">{model.rating}</span>
                  </div>
                </div>
                <CardTitle>{model.name}</CardTitle>
                <CardDescription>{model.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{model.price}</div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/marketplace/${model.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/marketplace">View All Models</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

