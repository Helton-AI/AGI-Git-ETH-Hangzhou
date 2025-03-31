"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useWeb3 } from "@/hooks/use-web3"
import { AlertCircle, Check, Download, Key, Lock, LockKeyhole, Unlock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"

export function DemoInterface() {
  const { isConnected } = useWeb3()
  const [demoState, setDemoState] = useState<
    "initial" | "purchasing" | "purchased" | "downloading" | "decrypting" | "ready"
  >("initial")
  const [progress, setProgress] = useState(0)
  const [outputText, setOutputText] = useState("")
  const [inputText, setInputText] = useState("The quick brown fox jumps over the lazy dog.")

  const simulateProgress = (
    startState: "purchasing" | "downloading" | "decrypting",
    endState: "purchased" | "decrypting" | "ready",
    duration: number,
  ) => {
    setDemoState(startState)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setDemoState(endState)
          return 100
        }
        return prev + 2
      })
    }, duration / 50)
  }

  const handlePurchase = () => {
    simulateProgress("purchasing", "purchased", 3000)
  }

  const handleDownload = () => {
    simulateProgress("downloading", "decrypting", 5000)
  }

  const handleDecrypt = () => {
    simulateProgress("decrypting", "ready", 3000)
  }

  const handleRunInference = () => {
    setOutputText("")
    const text = inputText
    let i = 0

    // Simulate text generation
    const interval = setInterval(() => {
      if (i < text.length) {
        setOutputText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 50)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Tabs defaultValue="demo" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
          <TabsTrigger value="explanation">How It Works</TabsTrigger>
        </TabsList>
        <TabsContent value="demo" className="space-y-4 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge>NLP</Badge>
                  <Badge variant="outline">PyTorch</Badge>
                </div>
                <CardTitle>Demo Model</CardTitle>
                <CardDescription>A sample language model for demonstration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold">0.01 ETH</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">2.5 GB Model Size</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">1 billion parameters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">Text generation capabilities</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handlePurchase} disabled={!isConnected || demoState !== "initial"} className="w-full">
                  {!isConnected ? "Connect Wallet to Purchase" : "Purchase Demo Model"}
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-4">
              {demoState === "initial" && !isConnected && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Wallet Required</AlertTitle>
                  <AlertDescription>
                    Please connect your wallet using the button in the header to start the demo.
                  </AlertDescription>
                </Alert>
              )}

              {demoState === "purchasing" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Purchasing Model</CardTitle>
                    <CardDescription>Processing transaction on the blockchain</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Progress value={progress} />
                      <p className="text-sm text-muted-foreground">
                        Executing smart contract to process payment and generate encryption keys...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {demoState === "purchased" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      Purchase Complete
                    </CardTitle>
                    <CardDescription>Your decryption key has been generated</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-primary" />
                        <span className="font-mono text-sm">d8e5f2a7c9b3...</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        This key is securely stored in your wallet and will be used to decrypt the model.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleDownload} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Encrypted Model
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {demoState === "downloading" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Downloading Model</CardTitle>
                    <CardDescription>Retrieving encrypted model from IPFS</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Progress value={progress} />
                      <p className="text-sm text-muted-foreground">
                        Downloading encrypted model files from decentralized storage...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {demoState === "decrypting" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Decrypting Model</CardTitle>
                    <CardDescription>Using your key to decrypt the model</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Progress value={progress} />
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <div className="h-1 flex-1 rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <Unlock className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Applying decryption key to unlock the model...</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleDecrypt} disabled={progress < 100} className="w-full">
                      <LockKeyhole className="mr-2 h-4 w-4" />
                      Complete Decryption
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {demoState === "ready" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      Model Ready
                    </CardTitle>
                    <CardDescription>Your model is ready to use</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert variant="default" className="border-green-500 bg-green-500/10">
                      <Check className="h-4 w-4 text-green-500" />
                      <AlertTitle>Decryption Successful!</AlertTitle>
                      <AlertDescription>
                        The model has been successfully decrypted and is ready for inference.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {demoState === "ready" && (
            <Card>
              <CardHeader>
                <CardTitle>Run Inference</CardTitle>
                <CardDescription>Test the decrypted model with your own input</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Input Text</Label>
                    <Textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter text for the model to process..."
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleRunInference} className="w-full">
                    Run Inference
                  </Button>
                  <div className="space-y-2">
                    <Label>Model Output</Label>
                    <div className="min-h-[100px] rounded-md border border-input bg-muted/50 p-4">
                      <p className="font-mono">{outputText}</p>
                      {!outputText && (
                        <p className="text-sm text-muted-foreground">
                          Output will appear here after running inference...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="explanation" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>How the Decentralized Marketplace Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">1. Model Upload</h3>
                <p className="text-muted-foreground">
                  Model owners upload their AI models to the platform. The system automatically encrypts the model and
                  generates encryption keys using a smart contract.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">2. Key Sharding</h3>
                <p className="text-muted-foreground">
                  The encryption keys are split into multiple shards using a secure sharding algorithm. These shards are
                  distributed across multiple IPFS nodes for redundancy and security.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">3. Purchase Process</h3>
                <p className="text-muted-foreground">
                  When a user purchases a model, the smart contract verifies the payment and triggers the key retrieval
                  process. The key shards are collected from IPFS nodes and reassembled.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">4. Secure Delivery</h3>
                <p className="text-muted-foreground">
                  The decryption key is securely delivered to the user's wallet. This key can only be accessed by the
                  wallet that made the purchase, ensuring that only authorized users can decrypt the model.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">5. Decentralized Storage</h3>
                <p className="text-muted-foreground">
                  The encrypted model files are stored on IPFS, a decentralized storage network. This ensures that the
                  models remain available even if individual nodes go offline.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Encryption</h3>
                <p className="text-muted-foreground">
                  All models are encrypted using AES-256, a military-grade encryption algorithm. This ensures that
                  models cannot be used without the proper decryption key.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Smart Contract Verification</h3>
                <p className="text-muted-foreground">
                  Smart contracts verify all transactions and key operations, ensuring that only valid purchases result
                  in key delivery.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Decentralized Key Management</h3>
                <p className="text-muted-foreground">
                  By distributing key shards across multiple nodes, the system prevents any single point of failure or
                  attack.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

