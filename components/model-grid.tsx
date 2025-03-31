"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock data for models
const models = [
  {
    id: 1,
    name: "NeuralNet-7B",
    description: "A powerful language model for natural language processing tasks.",
    price: "0.05 ETH",
    category: "NLP",
    framework: "PyTorch",
    rating: 4.8,
  },
  {
    id: 2,
    name: "VisionTransformer-L",
    description: "State-of-the-art computer vision model for image recognition.",
    price: "0.08 ETH",
    category: "Computer Vision",
    framework: "TensorFlow",
    rating: 4.9,
  },
  {
    id: 3,
    name: "AudioGen-XL",
    description: "Advanced audio generation model for music and speech synthesis.",
    price: "0.03 ETH",
    category: "Audio",
    framework: "PyTorch",
    rating: 4.7,
  },
  {
    id: 4,
    name: "ReinforcementLearner-Pro",
    description: "Reinforcement learning model for complex decision-making tasks.",
    price: "0.06 ETH",
    category: "Reinforcement Learning",
    framework: "JAX",
    rating: 4.5,
  },
  {
    id: 5,
    name: "MultiModalFusion",
    description: "Combines vision and language for advanced reasoning tasks.",
    price: "0.09 ETH",
    category: "Multi-modal",
    framework: "PyTorch",
    rating: 4.6,
  },
  {
    id: 6,
    name: "TimeSeriesPredictor",
    description: "Specialized model for time series forecasting and anomaly detection.",
    price: "0.04 ETH",
    category: "Time Series",
    framework: "TensorFlow",
    rating: 4.4,
  },
]

export function ModelGrid() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search models..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredModels.map((model) => (
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
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{model.price}</div>
                <Badge variant="outline">{model.framework}</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/marketplace/${model.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-medium">No models found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

