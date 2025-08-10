import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Wrench, ChevronRight } from "lucide-react"

export default function ToolsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-4xl font-bold">Tools</h1>
        <p className="text-xl text-muted-foreground">Helpful utilities for collectors and enthusiasts</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Labubu Fake Checker</CardTitle>
                <CardDescription>AI-powered authenticity verification</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Upload photos to analyze paint quality, sculpt details, and packaging authenticity markers.
            </p>
            <Button asChild className="w-full group-hover:bg-emerald-700">
              <Link href="/tools/fake-checker" className="flex items-center gap-2">
                Open Checker
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Add more tools here */}
        <Card className="group hover:shadow-lg transition-shadow opacity-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Price Tracker</CardTitle>
                <CardDescription>Coming soon</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track market prices and get alerts for your favorite collectibles.
            </p>
            <Button disabled className="w-full">
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow opacity-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Collection Manager</CardTitle>
                <CardDescription>Coming soon</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Organize and catalog your collectible collection with photos and notes.
            </p>
            <Button disabled className="w-full">
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
