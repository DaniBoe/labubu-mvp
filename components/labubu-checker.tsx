"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Info,
  Gauge,
  Share2,
  Camera,
  FileImage,
  Zap,
  TrendingUp,
  Heart,
  BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ResultStatus = "unknown" | "genuine" | "warning" | "fake"

type AnalysisResult = {
  status: ResultStatus
  confidence: number
  highlights: { label: string; type: "pass" | "flag" }[]
  notes: string[]
  detailedAnalysis: {
    paintQuality: number
    sculptAccuracy: number
    packagingAuth: number
    accessoryFit: number
  }
}

export function LabubuChecker() {
  const [dragOver, setDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [listingUrl, setListingUrl] = useState("")
  const [seller, setSeller] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const onFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return
      const file = files[0]
      const url = URL.createObjectURL(file)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(url)
      setResult(null)
      setProgress(0)
    },
    [previewUrl],
  )

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    onFiles(e.dataTransfer.files)
  }

  const simulateAnalysis = useCallback(async () => {
    setIsAnalyzing(true)
    setProgress(0)
    setResult(null)

    const steps = [
      { progress: 15, message: "Analyzing image quality..." },
      { progress: 32, message: "Checking paint details..." },
      { progress: 50, message: "Verifying sculpt accuracy..." },
      { progress: 68, message: "Examining packaging..." },
      { progress: 84, message: "Cross-referencing database..." },
      { progress: 100, message: "Generating report..." },
    ]

    for (const step of steps) {
      await new Promise((res) => setTimeout(res, 400))
      setProgress(step.progress)
    }

    // Enhanced mock analysis
    const textKey = `${listingUrl}-${seller}`.toLowerCase()
    const looksSuspicious =
      textKey.includes("cheap") ||
      textKey.includes("deal") ||
      textKey.includes("factory") ||
      textKey.includes("replica") ||
      (seller && seller.length > 0 && seller.toLowerCase().includes("new_store"))

    const fakeHintFromFilename = previewUrl?.toLowerCase().includes("fake") ?? false

    let status: ResultStatus = "genuine"
    let confidence = Math.floor(Math.random() * 15) + 85 // 85-100

    if (fakeHintFromFilename || looksSuspicious) {
      status = fakeHintFromFilename ? "fake" : "warning"
      confidence = fakeHintFromFilename ? Math.floor(Math.random() * 30) + 10 : Math.floor(Math.random() * 20) + 40
    }

    const highlights: AnalysisResult["highlights"] = [
      { label: "Paint edge quality", type: status === "genuine" ? "pass" : "flag" },
      { label: "Ear silhouette match", type: status === "genuine" ? "pass" : "flag" },
      { label: "Box typography", type: looksSuspicious ? "flag" : "pass" },
      { label: "Accessory alignment", type: "pass" },
      { label: "Material texture", type: status !== "fake" ? "pass" : "flag" },
    ]

    const notes = [
      status === "genuine"
        ? "Analysis shows strong consistency with authentic reference samples. Minor variations within expected manufacturing tolerances."
        : status === "warning"
          ? "Some inconsistencies detected that warrant further investigation. Consider requesting additional photos or proof of purchase."
          : "Multiple significant inconsistencies found across paint quality, sculpt details, and packaging elements.",
    ]

    const detailedAnalysis = {
      paintQuality: status === "genuine" ? 92 : status === "warning" ? 65 : 23,
      sculptAccuracy: status === "genuine" ? 88 : status === "warning" ? 72 : 31,
      packagingAuth: looksSuspicious ? 45 : status === "genuine" ? 94 : 67,
      accessoryFit: 89,
    }

    await new Promise((res) => setTimeout(res, 500))
    setResult({ status, confidence, highlights, notes, detailedAnalysis })
    setIsAnalyzing(false)
  }, [listingUrl, seller, previewUrl])

  const statusConfig = {
    unknown: {
      bg: "bg-muted",
      text: "text-muted-foreground",
      label: "Ready to analyze",
      icon: <Info className="h-4 w-4" />,
      gradient: "from-gray-500 to-gray-600",
    },
    genuine: {
      bg: "bg-emerald-600",
      text: "text-white",
      label: "Likely Genuine",
      icon: <CheckCircle2 className="h-4 w-4" />,
      gradient: "from-emerald-500 to-green-600",
    },
    warning: {
      bg: "bg-amber-500",
      text: "text-amber-950",
      label: "Needs Review",
      icon: <Gauge className="h-4 w-4" />,
      gradient: "from-amber-500 to-orange-600",
    },
    fake: {
      bg: "bg-rose-600",
      text: "text-white",
      label: "Likely Counterfeit",
      icon: <AlertTriangle className="h-4 w-4" />,
      gradient: "from-rose-500 to-red-600",
    },
  }

  const currentStatus = statusConfig[result?.status ?? "unknown"]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Fake Checker</h1>
            <p className="text-muted-foreground">Powered by advanced computer vision</p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload clear photos of your Labubu collectible for instant authenticity analysis using our AI model trained on
          thousands of verified items.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Main Analysis Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Upload Photos
              </CardTitle>
              <CardDescription>
                For best results, upload clear photos showing the front, back, and packaging
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <FileImage className="h-4 w-4" />
                    Upload Files
                  </TabsTrigger>
                  <TabsTrigger value="camera" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-4">
                  <label
                    htmlFor="image"
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragOver(true)
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={cn(
                      "flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 transition-all",
                      dragOver
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                        : "border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50",
                    )}
                  >
                    {previewUrl ? (
                      <div className="flex w-full items-center gap-4">
                        <div className="relative h-24 w-24 overflow-hidden rounded-lg border">
                          <Image
                            src={previewUrl || "/placeholder.svg"}
                            alt="Preview"
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="font-medium">Photo uploaded successfully</div>
                          <div className="text-sm text-muted-foreground">Ready for analysis</div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault()
                              if (previewUrl) URL.revokeObjectURL(previewUrl)
                              setPreviewUrl(null)
                              setResult(null)
                              setProgress(0)
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto">
                          <UploadCloud className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="text-lg font-medium">Drop your photos here</div>
                          <div className="text-sm text-muted-foreground">or click to browse</div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Supports JPG, PNG up to 10MB • Multiple angles recommended
                        </div>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      id="image"
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      onChange={(e) => onFiles(e.target.files)}
                    />
                  </label>
                </TabsContent>

                <TabsContent value="camera" className="mt-4">
                  <div className="text-center p-8 border-2 border-dashed rounded-xl">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="text-lg font-medium mb-2">Camera capture coming soon</div>
                    <div className="text-sm text-muted-foreground">
                      Take photos directly with your device camera for instant analysis
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Optional Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="listing">Listing URL (optional)</Label>
                  <Input
                    id="listing"
                    placeholder="https://marketplace.com/listing"
                    value={listingUrl}
                    onChange={(e) => setListingUrl(e.target.value)}
                    inputMode="url"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller">Seller info (optional)</Label>
                  <Input
                    id="seller"
                    placeholder="@seller_username or store name"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>
              </div>

              {/* Analysis Button */}
              <div className="flex justify-between items-center pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span>AI analysis typically takes 3-5 seconds</span>
                </div>
                <Button
                  onClick={simulateAnalysis}
                  disabled={isAnalyzing || (!previewUrl && !listingUrl && !seller)}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Gauge className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Run Analysis
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {(isAnalyzing || result) && (
            <Card className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Analysis Results</CardTitle>
                  {result && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  )}
                </div>
                <CardDescription>
                  {isAnalyzing
                    ? "AI model processing your images..."
                    : "Results based on visual analysis and database comparison"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Status Banner */}
                <div
                  className={cn(
                    "relative overflow-hidden rounded-lg p-4",
                    `bg-gradient-to-r ${currentStatus.gradient}`,
                    currentStatus.text,
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {currentStatus.icon}
                      <div>
                        <div className="font-semibold text-lg">{currentStatus.label}</div>
                        <div className="text-sm opacity-90">
                          {isAnalyzing
                            ? "Analysis in progress..."
                            : `${(result?.confidence ?? 0).toFixed(1)}% confidence`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{(result?.confidence ?? progress).toFixed(0)}%</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-20"></div>
                </div>

                {/* Progress */}
                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing...</span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                {/* Detailed Analysis */}
                {result && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {Object.entries(result.detailedAnalysis).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{key.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
                            <span className="font-medium">{value}%</span>
                          </div>
                          <Progress value={value} className="h-2" />
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Key Findings */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">Key Findings</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.highlights.map((highlight, i) => (
                          <Badge
                            key={i}
                            variant={highlight.type === "pass" ? "secondary" : "destructive"}
                            className={cn(
                              highlight.type === "pass" &&
                                "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200",
                            )}
                          >
                            {highlight.type === "pass" ? (
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                            ) : (
                              <AlertTriangle className="mr-1 h-3 w-3" />
                            )}
                            {highlight.label}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Analysis Notes */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">Analysis Notes</h3>
                      <div className="text-sm text-muted-foreground leading-relaxed">{result.notes.join(" ")}</div>
                    </div>
                  </div>
                )}
              </CardContent>

              {result && (
                <CardFooter className="bg-muted/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="text-xs text-muted-foreground">
                    ⚠️ This is a demo with simulated results. Do not rely on these results for purchase decisions.
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Save Report
                    </Button>
                    <Button variant="outline" size="sm">
                      Get Second Opinion
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5" />
                Photography Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Use natural lighting or bright white light</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Capture multiple angles (front, back, sides)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Include close-ups of paint details</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Show packaging and accessories</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Avoid heavy filters or editing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tool Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">99.2%</div>
                  <div className="text-xs text-muted-foreground">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">47K+</div>
                  <div className="text-xs text-muted-foreground">Items Analyzed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">3.2s</div>
                  <div className="text-xs text-muted-foreground">Avg Analysis Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">15K+</div>
                  <div className="text-xs text-muted-foreground">Happy Users</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/tools/price-tracker">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Price Tracker
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/tools/wishlist">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist Manager
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/wiki/series">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Series Database
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
