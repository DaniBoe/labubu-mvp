import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ChevronRight } from "lucide-react"

export default function WikiPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Labubu Wiki</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Complete database of all Labubu series, variants, and collectibles
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Series Guide
            </CardTitle>
            <CardDescription>Browse all official Labubu series</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Explore Series 1-6 with detailed information about each variant and rarity.
            </p>
            <Button asChild className="w-full">
              <Link href="/wiki/series">
                View Series
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Variants & Rarities</CardTitle>
            <CardDescription>Discover rare variants and special editions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Learn about chase figures, secret variants, and limited editions.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/wiki/variants">
                View Variants
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Release Timeline</CardTitle>
            <CardDescription>Track release dates and upcoming drops</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Complete chronological timeline of all Labubu releases.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/wiki/timeline">
                View Timeline
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
