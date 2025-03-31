"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeb3 } from "@/hooks/use-web3"
import { AlertCircle, FileText, Code, Info, Tag, Clock, User, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PurchaseModal } from "@/components/purchase-modal"

interface ModelDetailsProps {
  model: {
    id: number
    name: string
    description: string
    price: string
    tokenPrice: string
    category: string
    framework: string
    rating: number
    size: string
    parameters: string
    creator: string
    creatorName: string
    license: string
    dateAdded: string
    downloads: number
    tags: string[]
  }
}

export function ModelDetails({ model }: ModelDetailsProps) {
  const { isConnected } = useWeb3()
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Badge>{model.category}</Badge>
              <Badge variant="outline">{model.framework}</Badge>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">{model.name}</h1>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={star <= model.rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    className={`h-4 w-4 ${star <= model.rating ? "text-yellow-500" : "text-muted-foreground"}`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({model.rating.toFixed(1)})</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{model.downloads} downloads</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="text-3xl font-bold">{model.price}</div>
              <div className="text-sm text-muted-foreground">or {model.tokenPrice}</div>
            </div>
            <Button onClick={() => setIsPurchaseModalOpen(true)} disabled={!isConnected} className="w-full md:w-auto">
              {isConnected ? "Purchase Model" : "Connect Wallet to Purchase"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="license">License</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Description</h2>
                <p className="text-muted-foreground">{model.description}</p>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {model.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="documentation" className="space-y-4 pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage Instructions</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Installation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="overflow-x-auto rounded-lg bg-muted p-4">
                      <code>
                        {`# After purchase, you'll receive a decryption key
# Use our CLI tool to download and decrypt the model

$ npm install -g ai-model-cli
$ ai-model-cli download ${model.id} --key YOUR_DECRYPTION_KEY
$ ai-model-cli decrypt ${model.id}`}
                      </code>
                    </pre>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Example Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="overflow-x-auto rounded-lg bg-muted p-4">
                      <code>
                        {`import torch
from model import ${model.name.replace(/-/g, "")}

# Load the model
model = ${model.name.replace(/-/g, "")}.from_pretrained("./models/${model.id}")

# Use the model
output = model.generate("Your input text here")`}
                      </code>
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="license" className="space-y-4 pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">License Information</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>{model.license} License</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      This model is licensed under the {model.license} License. Please review the full license terms
                      before using the model.
                    </p>
                    <div className="mt-4">
                      <h3 className="font-medium">Permissions:</h3>
                      <ul className="ml-6 list-disc text-muted-foreground">
                        <li>Commercial use</li>
                        <li>Modification</li>
                        <li>Distribution</li>
                        <li>Private use</li>
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-medium">Limitations:</h3>
                      <ul className="ml-6 list-disc text-muted-foreground">
                        <li>Liability</li>
                        <li>Warranty</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-4 pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">User Reviews</h2>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Great model for NLP tasks</CardTitle>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
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
                        ))}
                      </div>
                    </div>
                    <CardDescription>by 0x123...456 • 2 weeks ago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      This model performs exceptionally well on our text classification tasks. The integration was
                      smooth and the documentation was helpful.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Good but needs optimization</CardTitle>
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <svg
                            key={star}
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
                        ))}
                      </div>
                    </div>
                    <CardDescription>by 0x789...abc • 1 month ago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The model works well but requires significant computational resources. Would be great to see a
                      more optimized version in the future.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Size:</span>
                  <span className="text-sm text-muted-foreground">{model.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Parameters:</span>
                  <span className="text-sm text-muted-foreground">{model.parameters}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Framework:</span>
                  <span className="text-sm text-muted-foreground">{model.framework}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Category:</span>
                  <span className="text-sm text-muted-foreground">{model.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Added:</span>
                  <span className="text-sm text-muted-foreground">{model.dateAdded}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Creator:</span>
                  <span className="text-sm text-muted-foreground">{model.creatorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">License:</span>
                  <span className="text-sm text-muted-foreground">{model.license}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This model uses decentralized key management. Upon purchase, encryption keys are securely delivered to
                your wallet.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Secure key sharding</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">IPFS distributed storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Smart contract verification</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {!isConnected && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Wallet Required</AlertTitle>
              <AlertDescription>Please connect your wallet to purchase this model.</AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <PurchaseModal open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen} model={model} />
    </>
  )
}

