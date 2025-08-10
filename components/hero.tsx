import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Wrench } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-indigo-950/20">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                🎉 New: Series 6 "The Monsters" now available
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                The Ultimate{" "}
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Labubu
                </span>{" "}
                Resource
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Discover, authenticate, and track your favorite Labubu collectibles. Join thousands of collectors in the
                most comprehensive Labubu database and community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
              >
                <Link href="/wiki">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Wiki
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/tools/fake-checker">
                  <Wrench className="mr-2 h-5 w-5" />
                  Check Authenticity
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">500+</div>
                <div className="text-sm text-muted-foreground">Catalogued Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">50K+</div>
                <div className="text-sm text-muted-foreground">Community Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">99%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
              <Card className="relative overflow-hidden border-0 shadow-2xl">
                <CardContent className="p-0">
                  <Image
                    src="/labubu-display-showcase.png"
                    alt="Labubu Collection Showcase"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <Badge className="mb-2 bg-white/90 text-black hover:bg-white">Featured Collection</Badge>
                    <h3 className="text-white text-lg font-semibold">Series 1-6 Complete Set</h3>
                    <p className="text-white/80 text-sm">All variants and rarities documented</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
