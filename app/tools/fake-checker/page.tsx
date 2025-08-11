"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Upload,
  Camera,
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  Palette,
  Package,
  Sparkles,
  TrendingUp,
  Share2,
  Info,
} from "lucide-react"
import { CameraCapture } from "@/components/camera-capture"
import { useAnalytics } from "@/hooks/use-analytics" // Ensure this import is present

interface AnalysisResult {
  authenticity: "authentic" | "fake" | "uncertain"
  confidence: number
  overallScore: number
  details: {
    paintQuality: number
    sculptDetails: number
    packagingAuth: number
    materialTexture: number
  }
  redFlags: string[]
  positiveIndicators: string[]
  recommendation: string
  estimatedValue?: string
  rarity?: string
}

// Set this to true to disable the fake checker
const IS_FAKE_CHECKER_DISABLED = true

export default function FakeCheckerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const { trackEvent, trackFakeChecker } = useAnalytics() // Destructure useAnalytics

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (IS_FAKE_CHECKER_DISABLED) return // Prevent upload if disabled

    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setSelectedImage(imageData)
        analyzeImage(imageData)
      }
      reader.readAsDataURL(file)

      trackEvent({
        action: "image_uploaded",
        category: "Fake Checker",
        label: "file_upload",
      })
    }
  }

  const handleCameraCapture = (imageData: string) => {
    if (IS_FAKE_CHECKER_DISABLED) return // Prevent capture if disabled

    setSelectedImage(imageData)
    analyzeImage(imageData)

    trackEvent({
      action: "image_captured",
      category: "Fake Checker",
      label: "camera_capture",
    })
  }

  const analyzeImage = async (imageData: string) => {
    if (IS_FAKE_CHECKER_DISABLED) return // Prevent analysis if disabled

    setIsAnalyzing(true)
    setAnalysisResult(null)

    try {
      // Simulate analysis delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock analysis result - in real app, this would call your AI API
      const mockResult: AnalysisResult = {
        authenticity: Math.random() > 0.3 ? "authentic" : "fake",
        confidence: Math.random() * 40 + 60, // 60-100%
        overallScore: Math.random() * 40 + 60,
        details: {
          paintQuality: Math.random() * 30 + 70,
          sculptDetails: Math.random() * 30 + 70,
          packagingAuth: Math.random() * 30 + 70,
          materialTexture: Math.random() * 30 + 70,
        },
        redFlags: [],
        positiveIndicators: [],
        recommendation: "",
        estimatedValue: "$15-25",
        rarity: "Common",
      }

      // Generate red flags and positive indicators based on authenticity
      if (mockResult.authenticity === "fake") {
        mockResult.redFlags = [
          "Paint edges appear rough and uneven",
          "Ear proportions don't match official specifications",
          "Material texture feels too glossy",
          "Missing holographic security elements on packaging",
        ]
        mockResult.recommendation =
          "This item shows multiple signs of being counterfeit. We recommend avoiding this purchase."
      } else {
        mockResult.positiveIndicators = [
          "Clean, precise paint application",
          "Correct ear shape and proportions",
          "Authentic matte finish texture",
          "Official packaging with security features",
          "Proper weight and material feel",
        ]
        mockResult.recommendation = "This appears to be an authentic Labubu with high confidence."
      }

      setAnalysisResult(mockResult)
      trackFakeChecker(mockResult.authenticity === "authentic" ? "authentic" : "counterfeit")
    } catch (error) {
      console.error("Analysis failed:", error)
      trackEvent({
        action: "analysis_failed",
        category: "Fake Checker",
        label: "error",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const shareResults = () => {
    if (navigator.share && analysisResult) {
      navigator.share({
        title: "Labubu Authenticity Check",
        text: `My Labubu analysis: ${analysisResult.authenticity} (${analysisResult.confidence.toFixed(1)}% confidence)`,
        url: window.location.href,
      })
      trackEvent({
        action: "results_shared",
        category: "Fake Checker",
        label: "social_share",
      })
    }
  }

  return (
    <div className={`container mx-auto py-8 px-4 max-w-4xl ${IS_FAKE_CHECKER_DISABLED ? "fake-checker-disabled" : ""}`}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">🔍 Labubu Fake Checker</h1>
        <p className="text-xl text-muted-foreground mb-2">
          AI-powered authenticity verification for your Labubu collectibles
        </p>
        <p className="text-sm text-muted-foreground">Upload a photo or use your camera to get instant analysis</p>
      </div>

      {IS_FAKE_CHECKER_DISABLED && (
        <Alert className="mb-8 border-blue-200 bg-blue-50 text-blue-800">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="font-medium">
            The Fake Checker is currently undergoing maintenance for AI model upgrades. Please check back soon!
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
          </TabsTrigger>
          <TabsTrigger value="camera">
            <Camera className="h-4 w-4 mr-2" />
            Use Camera
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Labubu Photo</CardTitle>
              <CardDescription>Choose a clear, well-lit photo of your Labubu for best results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={IS_FAKE_CHECKER_DISABLED}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <div className="text-lg font-medium mb-2">Drop your image here</div>
                  <div className="text-sm text-muted-foreground">or click to browse</div>
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="camera" className="space-y-6">
          <div className="flex justify-center">
            <CameraCapture
              onCapture={handleCameraCapture}
              isAnalyzing={isAnalyzing}
              isDisabled={IS_FAKE_CHECKER_DISABLED}
            />
          </div>
        </TabsContent>
      </Tabs>

      {selectedImage && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Selected Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video max-w-md mx-auto">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Selected Labubu"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {isAnalyzing && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Analyzing your Labubu...</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI is examining paint quality, sculpt details, and authenticity markers
                </p>
              </div>
              <Progress value={66} className="w-full max-w-sm mx-auto" />
            </div>
          </CardContent>
        </Card>
      )}

      {analysisResult && (
        <div className="mt-6 space-y-6">
          {/* Main Result Card */}
          <Card
            className={`border-2 ${
              analysisResult.authenticity === "authentic" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
            }`}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {analysisResult.authenticity === "authentic" ? (
                  <CheckCircle className="h-16 w-16 text-green-600" />
                ) : (
                  <AlertTriangle className="h-16 w-16 text-red-600" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {analysisResult.authenticity === "authentic" ? "Likely Authentic" : "Likely Counterfeit"}
              </CardTitle>
              <CardDescription className="text-lg">Confidence: {analysisResult.confidence.toFixed(1)}%</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge
                  variant={analysisResult.authenticity === "authentic" ? "secondary" : "destructive"}
                  className="text-sm px-4 py-2"
                >
                  Overall Score: {analysisResult.overallScore.toFixed(1)}/100
                </Badge>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription className="text-sm">{analysisResult.recommendation}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Quality Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <span className="text-sm">Paint Quality</span>
                    </div>
                    <span className="text-sm font-medium">{analysisResult.details.paintQuality.toFixed(1)}%</span>
                  </div>
                  <Progress value={analysisResult.details.paintQuality} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">Sculpt Details</span>
                    </div>
                    <span className="text-sm font-medium">{analysisResult.details.sculptDetails.toFixed(1)}%</span>
                  </div>
                  <Progress value={analysisResult.details.sculptDetails} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span className="text-sm">Packaging Auth</span>
                    </div>
                    <span className="text-sm font-medium">{analysisResult.details.packagingAuth.toFixed(1)}%</span>
                  </div>
                  <Progress value={analysisResult.details.packagingAuth} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-sm">Material Texture</span>
                    </div>
                    <span className="text-sm font-medium">{analysisResult.details.materialTexture.toFixed(1)}%</span>
                  </div>
                  <Progress value={analysisResult.details.materialTexture} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Findings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisResult.positiveIndicators.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Positive Indicators
                    </h4>
                    <ul className="text-sm space-y-1">
                      {analysisResult.positiveIndicators.map((indicator, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">•</span>
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult.redFlags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      Red Flags
                    </h4>
                    <ul className="text-sm space-y-1">
                      {analysisResult.redFlags.map((flag, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-600 mt-0.5">•</span>
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult.estimatedValue && (
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Estimated Value:</span>
                      <span className="font-medium">{analysisResult.estimatedValue}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Rarity:</span>
                      <span className="font-medium">{analysisResult.rarity}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => {
                setSelectedImage(null)
                setAnalysisResult(null)
                setActiveTab("upload")
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Check Another Item
            </Button>

            <Button variant="outline" onClick={shareResults}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Results
            </Button>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>📸 Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Photo Quality</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use good lighting (natural light preferred)</li>
                <li>• Keep the image sharp and in focus</li>
                <li>• Include the entire figure in frame</li>
                <li>• Avoid shadows and reflections</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">What to Include</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Front view of the figure</li>
                <li>• Close-up of paint details</li>
                <li>• Packaging (if available)</li>
                <li>• Any accessories or tags</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
