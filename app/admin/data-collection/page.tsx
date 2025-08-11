"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Download, CheckCircle, AlertTriangle, Database, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrainingImage {
  id: string
  filename: string
  series: string
  variant: string
  authenticity: "authentic" | "fake"
  source: string
  metadata: {
    angle: "front" | "back" | "side" | "detail" | "packaging"
    quality: "high" | "medium" | "low"
    lighting: "natural" | "artificial" | "mixed"
    background: "clean" | "cluttered" | "neutral"
  }
  features: {
    paintQuality: number
    sculptDetails: number
    packagingAuth: number
    materialTexture: number
  }
  status: "pending" | "approved" | "rejected"
  uploadedAt: string
}

export default function DataCollectionPage() {
  const [dragOver, setDragOver] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [currentImage, setCurrentImage] = useState<File | null>(null)
  const [imageMetadata, setImageMetadata] = useState({
    series: "",
    variant: "",
    authenticity: "authentic" as "authentic" | "fake",
    source: "",
    angle: "front" as "front" | "back" | "side" | "detail" | "packaging",
    quality: "high" as "high" | "medium" | "low",
    lighting: "natural" as "natural" | "artificial" | "mixed",
    background: "clean" as "clean" | "cluttered" | "neutral",
    paintQuality: 90,
    sculptDetails: 90,
    packagingAuth: 90,
    materialTexture: 90,
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedCount, setProcessedCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock existing training data
  const [trainingData, setTrainingData] = useState<TrainingImage[]>([
    {
      id: "img_001",
      filename: "series1_authentic_front.jpg",
      series: "Series 1",
      variant: "Original Pink",
      authenticity: "authentic",
      source: "official_store",
      metadata: {
        angle: "front",
        quality: "high",
        lighting: "natural",
        background: "clean",
      },
      features: {
        paintQuality: 95,
        sculptDetails: 92,
        packagingAuth: 98,
        materialTexture: 94,
      },
      status: "approved",
      uploadedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "img_002",
      filename: "series2_fake_front.jpg",
      series: "Series 2",
      variant: "Forest Green",
      authenticity: "fake",
      source: "marketplace_listing",
      metadata: {
        angle: "front",
        quality: "medium",
        lighting: "artificial",
        background: "cluttered",
      },
      features: {
        paintQuality: 45,
        sculptDetails: 38,
        packagingAuth: 25,
        materialTexture: 42,
      },
      status: "approved",
      uploadedAt: "2024-01-14T15:20:00Z",
    },
  ])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))
    setUploadedImages((prev) => [...prev, ...files])
    if (files.length > 0 && !currentImage) {
      setCurrentImage(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) => file.type.startsWith("image/"))
    setUploadedImages((prev) => [...prev, ...files])
    if (files.length > 0 && !currentImage) {
      setCurrentImage(files[0])
    }
  }

  const processCurrentImage = async () => {
    if (!currentImage) return

    setIsProcessing(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newTrainingImage: TrainingImage = {
      id: `img_${Date.now()}`,
      filename: currentImage.name,
      series: imageMetadata.series,
      variant: imageMetadata.variant,
      authenticity: imageMetadata.authenticity,
      source: imageMetadata.source,
      metadata: {
        angle: imageMetadata.angle,
        quality: imageMetadata.quality,
        lighting: imageMetadata.lighting,
        background: imageMetadata.background,
      },
      features: {
        paintQuality: imageMetadata.paintQuality,
        sculptDetails: imageMetadata.sculptDetails,
        packagingAuth: imageMetadata.packagingAuth,
        materialTexture: imageMetadata.materialTexture,
      },
      status: "pending",
      uploadedAt: new Date().toISOString(),
    }

    setTrainingData((prev) => [newTrainingImage, ...prev])
    setProcessedCount((prev) => prev + 1)

    // Move to next image
    const currentIndex = uploadedImages.indexOf(currentImage)
    const nextImage = uploadedImages[currentIndex + 1]
    setCurrentImage(nextImage || null)

    setIsProcessing(false)

    // Reset metadata for next image
    setImageMetadata({
      series: "",
      variant: "",
      authenticity: "authentic",
      source: "",
      angle: "front",
      quality: "high",
      lighting: "natural",
      background: "clean",
      paintQuality: 90,
      sculptDetails: 90,
      packagingAuth: 90,
      materialTexture: 90,
    })
  }

  const generateSampleData = async () => {
    setIsProcessing(true)

    const sampleData = [
      {
        series: "Series 1",
        variant: "Original Pink",
        authenticity: "authentic" as const,
        features: { paintQuality: 95, sculptDetails: 92, packagingAuth: 98, materialTexture: 94 },
      },
      {
        series: "Series 1",
        variant: "Blue Variant",
        authenticity: "authentic" as const,
        features: { paintQuality: 93, sculptDetails: 90, packagingAuth: 96, materialTexture: 92 },
      },
      {
        series: "Series 2",
        variant: "Forest Green",
        authenticity: "fake" as const,
        features: { paintQuality: 45, sculptDetails: 38, packagingAuth: 25, materialTexture: 42 },
      },
      {
        series: "Series 3",
        variant: "Space Blue",
        authenticity: "authentic" as const,
        features: { paintQuality: 97, sculptDetails: 94, packagingAuth: 99, materialTexture: 96 },
      },
      {
        series: "Series 3",
        variant: "Space Blue",
        authenticity: "fake" as const,
        features: { paintQuality: 52, sculptDetails: 48, packagingAuth: 35, materialTexture: 45 },
      },
    ]

    for (let i = 0; i < sampleData.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const sample = sampleData[i]
      const newImage: TrainingImage = {
        id: `sample_${Date.now()}_${i}`,
        filename: `${sample.series.toLowerCase().replace(" ", "_")}_${sample.variant.toLowerCase().replace(" ", "_")}_${sample.authenticity}.jpg`,
        series: sample.series,
        variant: sample.variant,
        authenticity: sample.authenticity,
        source: "sample_data",
        metadata: {
          angle: "front",
          quality: "high",
          lighting: "natural",
          background: "clean",
        },
        features: sample.features,
        status: "approved",
        uploadedAt: new Date().toISOString(),
      }

      setTrainingData((prev) => [newImage, ...prev])
      setProcessedCount(i + 1)
    }

    setIsProcessing(false)
  }

  const stats = {
    total: trainingData.length,
    authentic: trainingData.filter((img) => img.authenticity === "authentic").length,
    fake: trainingData.filter((img) => img.authenticity === "fake").length,
    pending: trainingData.filter((img) => img.status === "pending").length,
    approved: trainingData.filter((img) => img.status === "approved").length,
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Training Data Collection</h1>
          <p className="text-muted-foreground">Collect and annotate Labubu images for AI model training</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateSampleData} disabled={isProcessing}>
            <Database className="h-4 w-4 mr-2" />
            Generate Sample Data
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Dataset
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Images</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.authentic}</div>
            <div className="text-sm text-muted-foreground">Authentic</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.fake}</div>
            <div className="text-sm text-muted-foreground">Counterfeit</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.approved}</div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upload">Upload Images</TabsTrigger>
          <TabsTrigger value="review">Review Data</TabsTrigger>
          <TabsTrigger value="export">Export & Train</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upload Area */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Training Images</CardTitle>
                <CardDescription>Drag and drop or select multiple Labubu images</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                    dragOver
                      ? "border-blue-500 bg-blue-50"
                      : "border-muted-foreground/25 hover:border-muted-foreground/50",
                  )}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOver(true)
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <div className="text-lg font-medium mb-2">Drop images here</div>
                  <div className="text-sm text-muted-foreground">or click to browse</div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>

                {uploadedImages.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Uploaded Images ({uploadedImages.length})</div>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {uploadedImages.map((file, index) => (
                        <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                          <span className="truncate">{file.name}</span>
                          <Badge variant="outline">{(file.size / 1024 / 1024).toFixed(1)}MB</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Annotation Form */}
            <Card>
              <CardHeader>
                <CardTitle>Annotate Current Image</CardTitle>
                <CardDescription>
                  {currentImage ? `Annotating: ${currentImage.name}` : "Select an image to annotate"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentImage && (
                  <div className="relative h-48 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={URL.createObjectURL(currentImage) || "/placeholder.svg"}
                      alt="Current image"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="series">Series</Label>
                    <Select
                      value={imageMetadata.series}
                      onValueChange={(value) => setImageMetadata((prev) => ({ ...prev, series: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select series" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Series 1">Series 1</SelectItem>
                        <SelectItem value="Series 2">Series 2</SelectItem>
                        <SelectItem value="Series 3">Series 3</SelectItem>
                        <SelectItem value="Series 4">Series 4</SelectItem>
                        <SelectItem value="Series 5">Series 5</SelectItem>
                        <SelectItem value="Series 6">Series 6</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="variant">Variant</Label>
                    <Input
                      id="variant"
                      value={imageMetadata.variant}
                      onChange={(e) => setImageMetadata((prev) => ({ ...prev, variant: e.target.value }))}
                      placeholder="e.g., Original Pink"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authenticity">Authenticity</Label>
                    <Select
                      value={imageMetadata.authenticity}
                      onValueChange={(value: "authentic" | "fake") =>
                        setImageMetadata((prev) => ({ ...prev, authenticity: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="authentic">Authentic</SelectItem>
                        <SelectItem value="fake">Counterfeit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="angle">Photo Angle</Label>
                    <Select
                      value={imageMetadata.angle}
                      onValueChange={(value: any) => setImageMetadata((prev) => ({ ...prev, angle: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="front">Front</SelectItem>
                        <SelectItem value="back">Back</SelectItem>
                        <SelectItem value="side">Side</SelectItem>
                        <SelectItem value="detail">Detail</SelectItem>
                        <SelectItem value="packaging">Packaging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Input
                    id="source"
                    value={imageMetadata.source}
                    onChange={(e) => setImageMetadata((prev) => ({ ...prev, source: e.target.value }))}
                    placeholder="e.g., official_store, marketplace_listing"
                  />
                </div>

                {/* Feature Sliders */}
                <div className="space-y-4">
                  <div className="text-sm font-medium">Quality Assessment</div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Paint Quality</Label>
                      <span>{imageMetadata.paintQuality}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={imageMetadata.paintQuality}
                      onChange={(e) => setImageMetadata((prev) => ({ ...prev, paintQuality: Number(e.target.value) }))}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Sculpt Details</Label>
                      <span>{imageMetadata.sculptDetails}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={imageMetadata.sculptDetails}
                      onChange={(e) => setImageMetadata((prev) => ({ ...prev, sculptDetails: Number(e.target.value) }))}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Packaging Auth</Label>
                      <span>{imageMetadata.packagingAuth}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={imageMetadata.packagingAuth}
                      onChange={(e) => setImageMetadata((prev) => ({ ...prev, packagingAuth: Number(e.target.value) }))}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Material Texture</Label>
                      <span>{imageMetadata.materialTexture}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={imageMetadata.materialTexture}
                      onChange={(e) =>
                        setImageMetadata((prev) => ({ ...prev, materialTexture: Number(e.target.value) }))
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                <Button
                  onClick={processCurrentImage}
                  disabled={!currentImage || isProcessing || !imageMetadata.series || !imageMetadata.variant}
                  className="w-full"
                >
                  {isProcessing ? "Processing..." : "Add to Training Set"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {isProcessing && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-2">Processing Images...</div>
                    <Progress value={(processedCount / Math.max(1, uploadedImages.length)) * 100} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {processedCount} / {uploadedImages.length}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <div className="space-y-4">
            {trainingData.map((image) => (
              <Card key={image.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{image.filename}</div>
                        <div className="text-sm text-muted-foreground">
                          {image.series} - {image.variant}
                        </div>
                        <div className="flex gap-2 mt-1">
                          <Badge variant={image.authenticity === "authentic" ? "secondary" : "destructive"}>
                            {image.authenticity}
                          </Badge>
                          <Badge variant="outline">{image.metadata.angle}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          image.status === "approved"
                            ? "secondary"
                            : image.status === "pending"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {image.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {image.status === "rejected" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {image.status}
                      </Badge>
                      {image.status === "pending" && (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setTrainingData((prev) =>
                                prev.map((img) => (img.id === image.id ? { ...img, status: "approved" } : img)),
                              )
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setTrainingData((prev) =>
                                prev.map((img) => (img.id === image.id ? { ...img, status: "rejected" } : img)),
                              )
                            }}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Dataset Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.authentic}</div>
                    <div className="text-sm">Authentic Images</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{stats.fake}</div>
                    <div className="text-sm">Counterfeit Images</div>
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {stats.approved < 100
                      ? `Need at least 100 approved images to start training. Currently have ${stats.approved}.`
                      : `Ready to train! ${stats.approved} approved images available.`}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export & Training</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-transparent" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Training Dataset
                </Button>

                <Button className="w-full" disabled={stats.approved < 10}>
                  <Database className="h-4 w-4 mr-2" />
                  Start Model Training
                </Button>

                <div className="text-xs text-muted-foreground">
                  Training will begin automatically once you have sufficient data. Recommended: 500+ images per class
                  for optimal results.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
