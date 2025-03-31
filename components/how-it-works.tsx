import { Upload, ShoppingCart, Server } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl">
            Our decentralized marketplace ensures secure model distribution with encrypted key management
          </p>
        </div>
        <div className="mt-16 grid gap-12 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Upload Your Model</h3>
            <p className="text-muted-foreground">
              Upload your AI model, set pricing, and define license terms. Our smart contracts generate encryption keys.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Purchase Models</h3>
            <p className="text-muted-foreground">
              Browse the marketplace, purchase models with ETH or platform tokens, and automatically receive decryption
              keys.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Server className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Run Nodes</h3>
            <p className="text-muted-foreground">
              Contribute storage and compute resources to the network as a node operator and earn rewards.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

