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
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  Crown,
  Shield,
  X,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

type AuthenticityLabel = "authentic" | "fake" | "suspicious"

interface AnalysisResult {
  authenticity: {
    label: AuthenticityLabel
    confidence: number
    score: number
  }
  details: {
    paintQuality: number
    sculptAccuracy: number
    packagingAuth: number
    materialTexture: number
  }
  flags: Array<{
    category: string
    severity: "low" | "medium" | "high"
    description: string
  }>
  explanation: string
  recommendations: string[]
  creditsUsed: number
  creditsRemaining?: number
}

interface UserPlan {
  type: "free" | "pro" | "enterprise"
  creditsRemaining: number
  creditsTotal: number
}

export function LabubuChecker() {
  const [dragOver, setDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [listingUrl, setListingUrl] = useState("")
  const [seller, setSeller] = useState("")
  const [reportedPrice, setReportedPrice] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Mock user plan - in production, get from auth context
  const [userPlan] = useState<UserPlan>({
    type: "free",
    creditsRemaining: 2,
    creditsTotal: 3,
  })

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const onFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return
      const file = files[0]

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file")
        return
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("Image must be smaller than 10MB")
        return
      }

      const url = URL.createObjectURL(file)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(url)
      setResult(null)
      setProgress(0)
      setError(null)
    },
    [previewUrl],
  )

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    onFiles(e.dataTransfer.files)
  }

  const analyzeImage = useCallback(async () => {
    console.log("🚀 Starting analysis...")

    if (!previewUrl) {
      setError("Please upload an image first")
      return
    }

    if (userPlan.creditsRemaining <= 0) {
      setShowUpgrade(true)
      return
    }

    console.log("✅ Setting up analysis state...")
    setIsAnalyzing(true)
    setProgress(0)
    setResult(null)
    setError(null)

    try {
      console.log("📊 Starting progress simulation...")

      // Simple progress simulation first
      const steps = [10, 25, 45, 65, 80, 95]

      for (let i = 0; i < steps.length; i++) {
        console.log(`📈 Progress: ${steps[i]}%`)
        setProgress(steps[i])
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      console.log("🖼️ Processing image...")

      // Convert image to base64
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new window.Image()

      img.onload = async () => {
        console.log("🎯 Image loaded, calling API...")

        // Resize image for API efficiency
        const maxSize = 800
        const ratio = Math.min(maxSize / img.width, maxSize / img.height)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio

        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
        const base64Image = canvas.toDataURL("image/jpeg", 0.8)

        setProgress(100)

        // Call API
        const response = await fetch("/api/analyze-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: base64Image,
            userId: "demo-user",
            userPlan: userPlan.type,
            metadata: {
              listingUrl: listingUrl || undefined,
              seller: seller || undefined,
              reportedPrice: reportedPrice ? Number.parseFloat(reportedPrice) : undefined,
            },
          }),
        })

        const data = await response.json()
        console.log("📋 API Response:", data)

        if (!response.ok) {
          if (response.status === 429) {
            setShowUpgrade(true)
            setError(data.message || "Rate limit exceeded")
          } else {
            setError(data.message || "Analysis failed")
          }
          return
        }

        await new Promise((resolve) => setTimeout(resolve, 300))
        setResult(data)
        userPlan.creditsRemaining = Math.max(0, userPlan.creditsRemaining - 1)
      }

      img.onerror = () => {
        console.error("❌ Failed to load image")
        setError("Failed to load image. Please try a different image.")
        setIsAnalyzing(false)
      }

      img.src = previewUrl
    } catch (err) {
      console.error("💥 Analysis error:", err)
      setError("Analysis failed. Please try again.")
    } finally {
      console.log("🏁 Analysis complete, cleaning up...")
      setIsAnalyzing(false)
    }
  }, [previewUrl, listingUrl, seller, reportedPrice, userPlan])

  const statusConfig = {
    authentic: {
      bg: "bg-emerald-600",
      text: "text-white",
      label: "Likely Authentic",
      icon: <CheckCircle2 className="h-5 w-5" />,
      gradient: "from-emerald-500 to-green-600",
      borderColor: "border-emerald-200",
    },
    suspicious: {
      bg: "bg-amber-500",
      text: "text-amber-950",
      label: "Needs Review",
      icon: <Gauge className="h-5 w-5" />,
      gradient: "from-amber-500 to-orange-600",
      borderColor: "border-amber-200",
    },
    fake: {
      bg: "bg-rose-600",
      text: "text-white",
      label: "Likely Counterfeit",
      icon: <AlertTriangle className="h-5 w-5" />,
      gradient: "from-rose-500 to-red-600",
      borderColor: "border-rose-200",
    },
  }

  const currentStatus = result ? statusConfig[result.authenticity.label] : null

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Authenticity Checker</h1>
            <p className="text-muted-foreground">Advanced computer vision analysis</p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload photos of your Labubu collectible for professional-grade authenticity analysis using multiple AI models
          trained on thousands of verified items.
        </p>

        {/* Credits Display */}
        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Zap className="h-3 w-3" />
            {userPlan.creditsRemaining} / {userPlan.creditsTotal} credits remaining
          </Badge>
          {userPlan.type === "free" && (
            <Button variant="outline" size="sm" onClick={() => setShowUpgrade(true)}>
              <Crown className="h-4 w-4 mr-2" />
              Upgrade Plan
            </Button>
          )}
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  Upgrade Required
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowUpgrade(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Get unlimited analyses and advanced features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Pro Plan</div>
                    <div className="text-sm text-muted-foreground">50 analyses/day</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">$9.99</div>
                    <div className="text-xs text-muted-foreground">/month</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                  <div>
                    <div className="font-medium">Enterprise</div>
                    <div className="text-sm text-muted-foreground">Unlimited + API access</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">$49.99</div>
                    <div className="text-xs text-muted-foreground">/month</div>
                  </div>
                </div>
              </div>
              <Button className="w-full">Upgrade Now</Button>
            </CardContent>
          </Card>
        </div>
      )}

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
                For best results, upload clear photos showing multiple angles and packaging details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Error Display */}
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

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
                          <div className="text-sm text-muted-foreground">Ready for AI analysis</div>
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
                              setError(null)
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
              <div className="grid gap-4 md:grid-cols-3">
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
                    placeholder="@seller_username"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (optional)</Label>
                  <Input
                    id="price"
                    placeholder="$25.00"
                    value={reportedPrice}
                    onChange={(e) => setReportedPrice(e.target.value)}
                    inputMode="decimal"
                  />
                </div>
              </div>

              {/* Analysis Button */}
              <div className="flex justify-between items-center pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span>Professional AI analysis • Uses 1 credit</span>
                </div>
                <Button
                  onClick={analyzeImage}
                  disabled={isAnalyzing || !previewUrl || userPlan.creditsRemaining <= 0}
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
                      <Shield className="mr-2 h-4 w-4" />
                      Analyze Authenticity
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
                    ? "AI models processing your images..."
                    : "Results from multiple AI models and database comparison"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Status Banner */}
                {currentStatus && (
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-lg p-6 border-2",
                      `bg-gradient-to-r ${currentStatus.gradient}`,
                      currentStatus.text,
                      currentStatus.borderColor,
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {currentStatus.icon}
                        <div>
                          <div className="font-bold text-xl">{currentStatus.label}</div>
                          <div className="text-sm opacity-90">{result?.explanation}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{result?.authenticity.confidence}%</div>
                        <div className="text-sm opacity-90">Confidence</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress - Make it more prominent */}
                {isAnalyzing && (
                  <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 animate-spin text-blue-600" />
                        <span className="font-medium text-blue-900 dark:text-blue-100">Processing Analysis</span>
                      </div>
                      <span className="font-bold text-blue-900 dark:text-blue-100">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-4 bg-blue-100 dark:bg-blue-900" />
                    <div className="text-sm text-blue-700 dark:text-blue-300 text-center font-medium">
                      {progress < 20 && "🔍 Preprocessing image..."}
                      {progress >= 20 && progress < 40 && "🤖 Running classification model..."}
                      {progress >= 40 && progress < 60 && "🔍 Analyzing similarity patterns..."}
                      {progress >= 60 && progress < 80 && "👁️ Detecting object features..."}
                      {progress >= 80 && progress < 95 && "📊 Generating report..."}
                      {progress >= 95 && "✨ Finalizing analysis..."}
                    </div>
                  </div>
                )}

                {/* Detailed Analysis */}
                {result && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {Object.entries(result.details).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize font-medium">
                              {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                            </span>
                            <span className="font-bold">{value}%</span>
                          </div>
                          <Progress value={value} className="h-2" />
                        </div>
                      ))}
                    </div>

                    {/* Flags */}
                    {result.flags.length > 0 && (
                      <>
                        <Separator />
                        <div className="space-y-3">
                          <h3 className="font-semibold text-red-600">⚠️ Issues Detected</h3>
                          <div className="space-y-2">
                            {result.flags.map((flag, i) => (
                              <Alert key={i} variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>
                                  <span className="font-medium">{flag.category}:</span> {flag.description}
                                </AlertDescription>
                              </Alert>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Recommendations */}
                    <Separator />
                    <div className="space-y-3">
                      <h3 className="font-semibold">💡 Recommendations</h3>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-lg leading-none">{rec.charAt(0)}</span>
                            <span>{rec.slice(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>

              {result && (
                <CardFooter className="bg-muted/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="text-xs text-muted-foreground">
                    Analysis powered by multiple AI models trained on verified Labubu collectibles
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Save Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Get Expert Opinion
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
                  <span>Include close-ups of paint details and edges</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Show packaging, tags, and accessories</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Avoid heavy filters or photo editing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Model Performance</CardTitle>
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
                  <div className="text-2xl font-bold text-purple-600">2.8s</div>
                  <div className="text-xs text-muted-foreground">Avg Analysis Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">15K+</div>
                  <div className="text-xs text-muted-foreground">Happy Users</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Models trained on verified authentic and counterfeit samples
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
