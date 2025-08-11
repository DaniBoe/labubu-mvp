import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, TrendingUp, Bell, Heart, Camera, BarChart3, Zap, ChevronRight } from "lucide-react"

const tools = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Fake Checker",
    description: "AI-powered authenticity verification using advanced image analysis",
    href: "/tools/fake-checker",
    badge: "Popular",
    color: "from-emerald-500 to-teal-600",
    features: ["99% accuracy", "Instant results", "Multiple angles"],
    isDisabled: true, // Added this property
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Price Tracker",
    description: "Monitor market prices across multiple platforms and marketplaces",
    href: "/tools/price-tracker",
    badge: "New",
    color: "from-blue-500 to-indigo-600",
    features: ["Real-time data", "Price history", "Market trends"],
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Price Alerts",
    description: "Get notified when your wanted items drop to your target price",
    href: "/tools/alerts",
    badge: "Smart",
    color: "from-orange-500 to-red-600",
    features: ["Custom alerts", "Email & SMS", "Smart suggestions"],
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Wishlist Manager",
    description: "Organize and track your most wanted Labubu collectibles",
    href: "/tools/wishlist",
    badge: null,
    color: "from-pink-500 to-rose-600",
    features: ["Personal lists", "Share with friends", "Priority ranking"],
  },
  {
    icon: <Camera className="h-6 w-6" />,
    title: "Collection Scanner",
    description: "Scan and catalog your collection with automatic identification",
    href: "/tools/scanner",
    badge: "Beta",
    color: "from-purple-500 to-violet-600",
    features: ["Auto-detect", "Bulk scanning", "Collection value"],
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Market Analytics",
    description: "Deep insights into Labubu market trends and investment potential",
    href: "/tools/analytics",
    badge: "Pro",
    color: "from-cyan-500 to-blue-600",
    features: ["Market insights", "ROI tracking", "Trend analysis"],
  },
]

export function QuickTools() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Tools for Collectors</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to authenticate, track, and manage your Labubu collection like a pro
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${tool.isDisabled ? "fake-checker-disabled" : ""}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.color} text-white`}>{tool.icon}</div>
                  {tool.badge && (
                    <Badge
                      variant={tool.badge === "New" ? "default" : tool.badge === "Popular" ? "secondary" : "outline"}
                    >
                      {tool.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription className="text-base">{tool.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <Zap className="w-3 h-3 mr-2 text-yellow-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full group" disabled={tool.isDisabled}>
                  <Link href={tool.href}>
                    Try Now
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/tools">
              View All Tools
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
