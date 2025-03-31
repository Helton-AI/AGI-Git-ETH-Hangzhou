import { ModelDetails } from "@/components/model-details"
import { notFound } from "next/navigation"

// Mock data for models
const models = [
  {
    id: 1,
    name: "NeuralNet-7B",
    description:
      "A powerful language model for natural language processing tasks with state-of-the-art performance on benchmarks like GLUE, SuperGLUE, and SQuAD. This model has been trained on a diverse corpus of text and can be fine-tuned for specific applications.",
    price: "0.05 ETH",
    tokenPrice: "500 PTK",
    category: "NLP",
    framework: "PyTorch",
    rating: 4.8,
    size: "13.5 GB",
    parameters: "7 billion",
    creator: "0x7834...5e1d",
    creatorName: "AI Research Labs",
    license: "MIT",
    dateAdded: "2023-09-15",
    downloads: 1243,
    tags: ["language-model", "transformer", "nlp", "text-generation"],
  },
  {
    id: 2,
    name: "VisionTransformer-L",
    description:
      "State-of-the-art computer vision model for image recognition, object detection, and image segmentation. Based on the transformer architecture, this model achieves excellent results on ImageNet, COCO, and other vision benchmarks.",
    price: "0.08 ETH",
    tokenPrice: "800 PTK",
    category: "Computer Vision",
    framework: "TensorFlow",
    rating: 4.9,
    size: "5.2 GB",
    parameters: "2 billion",
    creator: "0x9a12...7b3c",
    creatorName: "Vision AI Systems",
    license: "Apache 2.0",
    dateAdded: "2023-10-02",
    downloads: 876,
    tags: ["vision", "transformer", "image-recognition", "object-detection"],
  },
  {
    id: 3,
    name: "AudioGen-XL",
    description:
      "Advanced audio generation model for music and speech synthesis. This model can generate realistic audio samples, convert text to speech with natural intonation, and create original music compositions in various styles.",
    price: "0.03 ETH",
    tokenPrice: "300 PTK",
    category: "Audio",
    framework: "PyTorch",
    rating: 4.7,
    size: "3.8 GB",
    parameters: "1.5 billion",
    creator: "0x3f56...9c4d",
    creatorName: "Audio Research Group",
    license: "GPL 3.0",
    dateAdded: "2023-08-20",
    downloads: 542,
    tags: ["audio", "speech-synthesis", "music-generation", "text-to-speech"],
  },
]

export default function ModelPage({ params }: { params: { id: string } }) {
  const modelId = Number.parseInt(params.id)
  const model = models.find((m) => m.id === modelId)

  if (!model) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <ModelDetails model={model} />
    </div>
  )
}

