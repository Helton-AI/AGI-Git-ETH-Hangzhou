"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWeb3 } from "@/hooks/use-web3"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function UploadModelForm() {
  const { isConnected } = useWeb3()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + 5
      })
    }, 300)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return
    simulateUpload()
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>You need to connect your wallet to upload a model</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Wallet Required</AlertTitle>
            <AlertDescription>Please connect your wallet using the button in the header to continue.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Model</CardTitle>
        <CardDescription>Fill in the details about your AI model and upload the model files</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="files">Model Files</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & License</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Model Name</Label>
                <Input id="name" placeholder="Enter model name" required autoComplete={"off"}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your model, its capabilities, and use cases"
                  rows={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nlp">Natural Language Processing</SelectItem>
                    <SelectItem value="cv">Computer Vision</SelectItem>
                    <SelectItem value="audio">Audio Processing</SelectItem>
                    <SelectItem value="rl">Reinforcement Learning</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pytorch">PyTorch</SelectItem>
                    <SelectItem value="tensorflow">TensorFlow</SelectItem>
                    <SelectItem value="jax">JAX</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            <TabsContent value="files" className="space-y-4 pt-4">
              <div className="space-y-4">
                <Label>Model Files</Label>
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-12">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Drag and drop your model files</p>
                      <p className="text-xs text-muted-foreground">
                        Supports PyTorch (.pt, .pth), TensorFlow (.pb, .h5), and other formats
                      </p>
                    </div>
                    <Input id="model-file" type="file" className="hidden" onChange={handleFileChange} />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("model-file")?.click()}
                    >
                      Select Files
                    </Button>
                  </div>
                </div>
                {selectedFile && (
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                      Remove
                    </Button>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="readme">README / Documentation</Label>
                <Textarea
                  id="readme"
                  placeholder="Provide usage instructions, model architecture details, and other documentation"
                  rows={5}
                />
              </div>
            </TabsContent>
            <TabsContent value="pricing" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (ETH)</Label>
                <Input id="price" type="number" step="0.001" min="0" placeholder="0.05" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token-price">Price (Platform Tokens - Optional)</Label>
                <Input id="token-price" type="number" min="0" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">License Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mit">MIT License</SelectItem>
                    <SelectItem value="apache">Apache 2.0</SelectItem>
                    <SelectItem value="gpl">GPL 3.0</SelectItem>
                    <SelectItem value="proprietary">Proprietary</SelectItem>
                    <SelectItem value="custom">Custom License</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-license">Custom License Terms (if applicable)</Label>
                <Textarea id="custom-license" placeholder="Enter custom license terms" rows={5} />
              </div>
            </TabsContent>
          </Tabs>

          {isUploading && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Uploading...</span>
                <span className="text-sm">{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary transition-all" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          )}

          {uploadComplete && (
            <Alert className="mt-6" variant="default">
              <AlertTitle>Upload Complete!</AlertTitle>
              <AlertDescription>
                Your model has been uploaded and is being processed. The encryption keys are being generated and stored
                securely.
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={isUploading || !selectedFile}>
              {isUploading ? "Uploading..." : "Upload Model"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

