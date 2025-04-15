import { ModelFilter } from "@/components/model-filter"
import { ModelGrid } from "@/components/model-grid"

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">AI Model Marketplace</h1>
        <p className="mt-2 text-muted-foreground">Discover and purchase AI models from the community</p>
      </div>
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <ModelFilter />
        <ModelGrid />
      </div>
    </div>
  )
}

