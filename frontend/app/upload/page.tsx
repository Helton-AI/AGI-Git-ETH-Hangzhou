import { UploadModelForm } from "@/components/upload-model-form"

export default function UploadPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Upload Your AI Model</h1>
          <p className="mt-2 text-muted-foreground">Share your AI model with the community and earn rewards</p>
        </div>
        <UploadModelForm />
      </div>
    </div>
  )
}

