import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MessageSquare, Eye, ChevronRight } from "lucide-react"

const updates = [
  {
    type: "Series Release",
    title: "Series 6 'The Monsters' Complete Guide",
    description: "Comprehensive breakdown of all 12 variants including hidden rarities and accessories.",
    author: "LabubuExpert",
    avatar: "/avatar-expert.png",
    date: "2024-01-15",
    views: 2847,
    comments: 156,
    badge: "New",
    href: "/wiki/series/6-monsters",
  },
  {
    type: "Tool Update",
    title: "Fake Checker AI Model v3.0 Released",
    description: "Improved accuracy with new training data from 10,000+ verified authentic items.",
    author: "DevTeam",
    avatar: "/avatar-developer.png",
    date: "2024-01-12",
    views: 1923,
    comments: 89,
    badge: "Update",
    href: "/tools/fake-checker",
  },
  {
    type: "Market Analysis",
    title: "Q4 2023 Labubu Market Report",
    description: "Price trends, most valuable variants, and investment insights for collectors.",
    author: "MarketAnalyst",
    avatar: "/avatar-analyst.png",
    date: "2024-01-10",
    views: 3421,
    comments: 234,
    badge: "Trending",
    href: "/community/market-report-q4-2023",
  },
  {
    type: "Community",
    title: "January Collection Showcase Winners",
    description: "Amazing collections from our community members with detailed photography tips.",
    author: "CommunityMod",
    avatar: "/avatar-moderator.png",
    date: "2024-01-08",
    views: 1567,
    comments: 78,
    badge: "Featured",
    href: "/community/showcase/january-2024",
  },
]

export function LatestUpdates() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Latest Updates</h2>
            <p className="text-muted-foreground text-lg">
              Stay up to date with new releases, tool updates, and community highlights
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/updates">
              View All
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {updates.map((update, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline">{update.type}</Badge>
                  <Badge
                    variant={update.badge === "New" ? "default" : update.badge === "Trending" ? "secondary" : "outline"}
                  >
                    {update.badge}
                  </Badge>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  <Link href={update.href}>{update.title}</Link>
                </CardTitle>
                <CardDescription className="text-base">{update.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={update.avatar || "/placeholder.svg"} alt={update.author} />
                      <AvatarFallback>{update.author.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium">{update.author}</div>
                      <div className="text-muted-foreground flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(update.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {update.views.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {update.comments}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
