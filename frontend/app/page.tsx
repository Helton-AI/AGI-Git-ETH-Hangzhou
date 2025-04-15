import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FeaturedModels } from "@/components/featured-models"
import { HowItWorks } from "@/components/how-it-works"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <FeaturedModels />
      <HowItWorks />
      <div className="mt-16 flex flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Ready to get started?</h2>
        <p className="max-w-[600px] text-muted-foreground">
          Join our decentralized AI marketplace to buy, sell, or contribute to the network.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/marketplace">Browse Models</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/upload">Upload Your Model</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

