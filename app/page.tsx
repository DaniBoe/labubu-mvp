"use client"

import type React from "react"
import { Hero } from "@/components/hero"
import { FeaturedSeries } from "@/components/featured-series"
import { QuickTools } from "@/components/quick-tools"
import { CommunityStats } from "@/components/community-stats"
import { LatestUpdates } from "@/components/latest-updates"

import { useCallback, useMemo, useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  FileSearch,
  GalleryHorizontalEnd,
  Gauge,
  ImageIcon,
  Info,
  PackageSearch,
  Scan,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

type ResultStatus = "unknown" | "genuine" | "warning" | "fake"

type AnalysisResult = {
  status: ResultStatus
  confidence: number // 0-100
  highlights: { label: string; type: "pass" | "flag" }[]
  notes: string[]
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedSeries />
      <QuickTools />
      <CommunityStats />
      <LatestUpdates />
    </>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <Link href="#" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">LabubuCheck</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-6 md:flex">
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
            How it works
          </a>
          <a href="#examples" className="text-sm text-muted-foreground hover:text-foreground">
            Examples
          </a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">
            FAQ
          </a>
          <Button asChild variant="default" className="bg-emerald-600 hover:bg-emerald-700">
            <a href="#checker">Open Checker</a>
          </Button>
        </nav>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section id="checker" className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
      <Card className="order-2 md:order-1">
        <CardHeader>
          <CardTitle className="text-2xl">Labubu Fake Checker</CardTitle>
          <CardDescription>
            Upload photos or paste listing details. We’ll check markers like sculpt, paint, packaging, and accessories.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Uploader />
        </CardContent>
      </Card>

      <div className="order-1 grid gap-4 md:order-2">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src={
                  "/placeholder.svg?height=560&width=1000&query=labubu%20toy%20flatlay%20photo%20on%20neutral%20background" ||
                  "/placeholder.svg"
                }
                alt="Labubu collectible flat-lay"
                width={1000}
                height={560}
                className="h-56 w-full object-cover sm:h-64"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <Badge className="bg-emerald-600">AI Vision</Badge>
                <Badge variant="secondary" className="backdrop-blur">
                  Packaging Check
                </Badge>
                <Badge variant="secondary" className="backdrop-blur">
                  Paint Map
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">What we look for</CardTitle>
            <CardDescription>Fast heuristics before deeper analysis.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Feature icon={<Scan className="h-4 w-4" />} title="Sculpt & silhouette" />
            <Feature icon={<ImageIcon className="h-4 w-4" />} title="Paint edges & sheen" />
            <Feature icon={<PackageSearch className="h-4 w-4" />} title="Packaging & typography" />
            <Feature icon={<FileSearch className="h-4 w-4" />} title="Listing metadata & claims" />
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="ghost" size="sm" className="gap-1">
              Learn more
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md border p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">{icon}</div>
      <div className="text-sm font-medium">{title}</div>
    </div>
  )
}

function Uploader() {
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

    // Simulated progress
    const steps = [15, 32, 50, 68, 84, 100]
    for (const p of steps) {
      await new Promise((res) => setTimeout(res, 300))
      setProgress(p)
    }

    // Simple deterministic mock based on inputs
    const textKey = `${listingUrl}-${seller}`.toLowerCase()
    const looksSuspicious =
      textKey.includes("cheap") ||
      textKey.includes("deal") ||
      textKey.includes("factory") ||
      (seller && seller.length > 0 && seller.toLowerCase().includes("new_store_123"))

    const fakeHintFromFilename = previewUrl?.toLowerCase().includes("fake") ?? false

    let status: ResultStatus = "genuine"
    let confidence = 82

    if (fakeHintFromFilename || looksSuspicious) {
      status = fakeHintFromFilename ? "fake" : "warning"
      confidence = fakeHintFromFilename ? 18 : 42
    }

    const highlights: AnalysisResult["highlights"] = [
      { label: "Paint edges", type: status === "genuine" ? "pass" : "flag" },
      { label: "Ear silhouette", type: status === "genuine" ? "pass" : "flag" },
      { label: "Box typography", type: looksSuspicious ? "flag" : "pass" },
      { label: "Accessory fit", type: "pass" },
    ]

    const notes: string[] = [
      status === "genuine"
        ? "No obvious mismatches vs reference set. Minor variations possible due to lighting."
        : status === "warning"
          ? "Some inconsistencies found. Recommend requesting more photos and proof of purchase."
          : status === "fake"
            ? "Multiple high-confidence inconsistencies in paint and packaging detected."
            : "Upload an image to begin.",
    ]

    await new Promise((res) => setTimeout(res, 300))
    setResult({ status, confidence, highlights, notes })
    setIsAnalyzing(false)
  }, [listingUrl, seller, previewUrl])

  const statusUi = useMemo(() => {
    const s = result?.status ?? "unknown"
    const palette = {
      unknown: {
        bg: "bg-muted",
        text: "text-muted-foreground",
        label: "Awaiting analysis",
        icon: <Info className="h-4 w-4" />,
      },
      genuine: {
        bg: "bg-emerald-600",
        text: "text-white",
        label: "Likely Genuine",
        icon: <CheckCircle2 className="h-4 w-4" />,
      },
      warning: {
        bg: "bg-amber-500",
        text: "text-amber-950",
        label: "Inconclusive",
        icon: <Gauge className="h-4 w-4" />,
      },
      fake: {
        bg: "bg-rose-600",
        text: "text-white",
        label: "Likely Fake",
        icon: <AlertTriangle className="h-4 w-4" />,
      },
    } as const
    return palette[s]
  }, [result?.status])

  return (
    <div className="grid gap-6">
      <div>
        <Label htmlFor="image">Upload photos</Label>
        <label
          htmlFor="image"
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "mt-2 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-8 transition-colors",
            dragOver ? "border-emerald-600 bg-emerald-50/50" : "hover:bg-muted/50",
          )}
        >
          {previewUrl ? (
            <div className="flex w-full items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Uploaded preview"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid gap-1">
                <div className="text-sm font-medium">1 photo selected</div>
                <div className="text-xs text-muted-foreground">Drag&drop a new image to replace</div>
              </div>
              <div className="ml-auto">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
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
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <UploadCloud className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="text-sm">
                <span className="font-medium">Click to upload</span> or drag and drop
              </div>
              <div className="text-xs text-muted-foreground">JPG, PNG. Max 10MB.</div>
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
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="listing">Listing URL (optional)</Label>
          <Input
            id="listing"
            placeholder="https://example.com/your-listing"
            value={listingUrl}
            onChange={(e) => setListingUrl(e.target.value)}
            inputMode="url"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="seller">Seller username (optional)</Label>
          <Input id="seller" placeholder="@seller_handle" value={seller} onChange={(e) => setSeller(e.target.value)} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          Offline demo — results are simulated for this mockup
        </div>
        <Button
          type="button"
          className="bg-emerald-600 hover:bg-emerald-700"
          disabled={isAnalyzing || (!previewUrl && !listingUrl && !seller)}
          onClick={simulateAnalysis}
        >
          Run analysis
        </Button>
      </div>

      {(isAnalyzing || result) && (
        <Card className="border-dashed">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Results</CardTitle>
            <CardDescription>Early indicators. Not a substitute for official authentication.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className={cn("flex items-center gap-3 rounded-lg p-3", statusUi.bg, statusUi.text)}>
              {statusUi.icon}
              <div className="text-sm font-medium">{statusUi.label}</div>
              <div className="ml-auto text-sm font-medium">{(result?.confidence ?? 0).toFixed(0)}%</div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  Confidence
                </div>
                <div className="text-muted-foreground">{(result?.confidence ?? progress).toFixed(0)}%</div>
              </div>
              <Progress value={isAnalyzing ? progress : (result?.confidence ?? 0)} />
            </div>

            <div className="grid gap-2">
              <div className="text-sm font-medium">Highlights</div>
              <div className="flex flex-wrap gap-2">
                {(
                  result?.highlights ?? [
                    { label: "Paint edges", type: "pass" as const },
                    { label: "Ear silhouette", type: "pass" as const },
                    { label: "Box typography", type: "pass" as const },
                  ]
                ).map((h, i) => (
                  <Badge
                    key={i}
                    variant={h.type === "pass" ? "secondary" : "destructive"}
                    className={cn(
                      h.type === "pass" && "bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600/20",
                      h.type === "pass" && "border border-emerald-200",
                    )}
                  >
                    {h.type === "pass" ? (
                      <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                    ) : (
                      <AlertTriangle className="mr-1 h-3.5 w-3.5" />
                    )}
                    {h.label}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="grid gap-3">
              <div className="text-sm font-medium">Checklist</div>
              <ul className="grid gap-2 text-sm">
                <ChecklistItem ok label="Symmetrical ear tips and consistent silhouette" />
                <ChecklistItem ok={result?.status !== "fake"} label="Clean paint edges around eyes and mouth" />
                <ChecklistItem ok label="Matte-to-satin body sheen (not glossy plastic)" />
                <ChecklistItem ok={result?.status === "genuine"} label="Accurate box font spacing and alignment" />
                <ChecklistItem ok label="Accessory fit without gaps or wobble" />
              </ul>
            </div>

            <div className="grid gap-2">
              <div className="text-sm font-medium">Notes</div>
              <div className="text-sm text-muted-foreground">
                {(result?.notes ?? ["Upload a photo to generate notes."]).join(" ")}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-muted-foreground">
              This is a UI mockup. Do not rely on simulated results for purchase decisions.
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <GalleryHorizontalEnd className="h-4 w-4" />
              Compare with references
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

function ChecklistItem({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-start gap-2 rounded-md border p-2">
      <div
        className={cn(
          "mt-0.5 flex h-5 w-5 items-center justify-center rounded-full",
          ok ? "bg-emerald-600 text-white" : "bg-rose-600 text-white",
        )}
        aria-hidden="true"
      >
        {ok ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
      </div>
      <span className="text-sm">{label}</span>
    </li>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-emerald-600" />
        <h2 className="text-xl font-semibold">How it works</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Step
          number={1}
          title="Upload or paste"
          desc="Provide clear photos and any listing info like seller or URL."
          icon={<UploadCloud className="h-5 w-5" />}
        />
        <Step
          number={2}
          title="Analyze"
          desc="We compare against reference cues for sculpt, paint, and packaging."
          icon={<ShieldCheck className="h-5 w-5" />}
        />
        <Step
          number={3}
          title="Review"
          desc="Use the checklist and highlights to decide next steps."
          icon={<FileSearch className="h-5 w-5" />}
        />
      </div>
    </section>
  )
}

function Step({
  number = 1,
  title = "Step",
  desc = "Description",
  icon = <Info className="h-5 w-5" />,
}: {
  number?: number
  title?: string
  desc?: string
  icon?: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-600 text-white">{number}</div>
        <div className="grid">
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </div>
        <div className="ml-auto hidden rounded-md bg-muted p-2 text-muted-foreground md:block">{icon}</div>
      </CardHeader>
    </Card>
  )
}

function Examples() {
  return (
    <section id="examples" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-emerald-600" />
        <h2 className="text-xl font-semibold">Reference examples</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ExampleCard
          title="Official product angle"
          subtitle="Clean edges, even paint"
          img="/labubu-product-photo.png"
        />
        <ExampleCard
          title="Packaging typography"
          subtitle="Correct spacing & registration marks"
          img="/placeholder-ef47n.png"
        />
        <ExampleCard
          title="Common counterfeit tell"
          subtitle="Glossy plastic and soft print"
          img="/counterfeit-toy.png"
        />
      </div>
    </section>
  )
}

function ExampleCard({
  title = "Title",
  subtitle = "Subtitle",
  img = "/placeholder-image.png",
}: {
  title?: string
  subtitle?: string
  img?: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={img || "/placeholder.svg"}
          alt={title}
          width={720}
          height={480}
          className="h-48 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="ghost" size="sm" className="gap-1">
          View guide
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-center gap-2">
        <Info className="h-5 w-5 text-emerald-600" />
        <h2 className="text-xl font-semibold">FAQ</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="accuracy">
          <AccordionTrigger>How accurate is the checker?</AccordionTrigger>
          <AccordionContent>
            This mockup simulates results for demonstration. A real system would combine visual cues and metadata with a
            human-in-the-loop review.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="photos">
          <AccordionTrigger>What photos should I upload?</AccordionTrigger>
          <AccordionContent>
            Front 3/4 angle, close-ups of face and paint edges, box typography, and any accessories. Use neutral
            lighting and avoid heavy filters.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="privacy">
          <AccordionTrigger>Do you store my photos?</AccordionTrigger>
          <AccordionContent>
            For this demo, nothing leaves your browser. In production, we&apos;d clearly disclose retention and provide
            deletion controls.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          <span>LabubuCheck — UI Mockup</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Built with Next.js App Router and shadcn/ui. Componentized per React best practices [^1].
        </div>
      </div>
    </footer>
  )
}
