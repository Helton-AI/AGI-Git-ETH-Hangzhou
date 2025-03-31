import { DemoInterface } from "@/components/demo-interface"

export default function DemoPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Interactive Demo</h1>
        <p className="mt-2 text-muted-foreground">Experience the model purchase and decryption process</p>
      </div>
      <DemoInterface />
    </div>
  )
}

