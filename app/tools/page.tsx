import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, TrendingUp, Bell, Heart, Camera, BarChart3, ChevronRight } from "lucide-react"

const tools = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Fake Checker",
    description: "AI-powered authenticity verification using advanced image analysis",
    href: "/tools/fake-checker",
    badge: "Popular",
    available: true,
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Price Tracker",
    description: "Monitor market prices across multiple platforms and marketplaces",
    href: "/tools/price-tracker",
    badge: "Coming Soon",
    available: false,
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Price Alerts",
    description: "Get notified when your wanted items drop to your target price",
    href: "/tools/alerts",
    badge: "Coming Soon",
    available: false,
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Wishlist Manager",
    description: "Organize and track your most wanted Labubu collectibles",
    href: "/tools/wishlist",
    badge: "Coming Soon",
    available: false,
  },
  {
    icon: <Camera className="h-6 w-6" />,
    title: "Collection Scanner",
    description: "Scan and catalog your collection with automatic identification",
    href: "/tools/scanner",
    badge: "Beta",
    available: false,
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Market Analytics",
    description: "Deep insights into Labubu market trends and investment potential",
    href: "/tools/analytics",
    badge: "Pro",
    available: false,
  },
]

export default function ToolsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Collector Tools</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Powerful tools to authenticate, track, and manage your Labubu collection
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  {tool.icon}
                </div>
                <Badge variant={tool.available ? "default" : "secondary"}>{tool.badge}</Badge>
              </div>
              <CardTitle className="text-xl">{tool.title}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {tool.available ? (
                <Button asChild className="w-full">
                  <Link href={tool.href}>
                    Try Now
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              ) : (
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
