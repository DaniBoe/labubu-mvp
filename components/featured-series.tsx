import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Star, Calendar, Package } from "lucide-react"

const featuredSeries = [
  {
    id: "series-6",
    title: "The Monsters",
    series: "Series 6",
    description: "Latest release featuring spooky and cute monster-themed Labubu variants",
    image: "/dark-cute-monster.png",
    releaseDate: "2024-01-15",
    itemCount: 12,
    rarity: "New Release",
    isNew: true,
  },
  {
    id: "series-5",
    title: "Fairy Tale Forest",
    series: "Series 5",
    description: "Enchanting forest-themed collection with magical accessories",
    image: "/labubu-fairy-forest.png",
    releaseDate: "2023-11-20",
    itemCount: 10,
    rarity: "Popular",
    isNew: false,
  },
  {
    id: "series-4",
    title: "Space Adventure",
    series: "Series 4",
    description: "Cosmic journey with astronaut Labubu and alien friends",
    image: "/labubu-space-astronaut-cosmic-blue.png",
    releaseDate: "2023-08-10",
    itemCount: 8,
    rarity: "Classic",
    isNew: false,
  },
]

export function FeaturedSeries() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Series</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the most popular and latest Labubu series with detailed information about each variant
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredSeries.map((series) => (
            <Card key={series.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
                <Image
                  src={series.image || "/placeholder.svg"}
                  alt={series.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {series.isNew && (
                    <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">New</Badge>
                  )}
                  <Badge variant="secondary">{series.series}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/90">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    4.8
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {series.title}
                  <Badge variant={series.rarity === "New Release" ? "default" : "secondary"}>{series.rarity}</Badge>
                </CardTitle>
                <CardDescription>{series.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(series.releaseDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    {series.itemCount} items
                  </div>
                </div>

                <Button asChild className="w-full group">
                  <Link href={`/wiki/series/${series.id}`}>
                    View Series
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/wiki/series">
              View All Series
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
