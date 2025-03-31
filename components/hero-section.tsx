import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Decentralized AI Model Marketplace
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Buy, sell, and share AI models securely with decentralized key management and IPFS storage.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/marketplace">Browse Models</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/upload">Upload Your Model</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[400px] overflow-hidden rounded-lg bg-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                <div className="h-full w-full rounded-md border border-border/50 bg-background/50 p-4 backdrop-blur">
                  <div className="space-y-2">
                    <div className="h-4 w-2/3 rounded bg-muted"></div>
                    <div className="h-4 w-1/2 rounded bg-muted"></div>
                    <div className="h-4 w-3/4 rounded bg-muted"></div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <div className="h-20 rounded bg-muted"></div>
                    <div className="h-12 rounded bg-muted"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

