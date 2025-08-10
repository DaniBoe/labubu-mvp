import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Star, TrendingUp, Globe, Zap } from "lucide-react"

const stats = [
  {
    icon: <Users className="h-8 w-8" />,
    value: "52,341",
    label: "Active Collectors",
    change: "+12%",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    value: "1,247",
    label: "Daily Discussions",
    change: "+8%",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: <Star className="h-8 w-8" />,
    value: "98.7%",
    label: "Satisfaction Rate",
    change: "+2%",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    value: "$2.4M",
    label: "Items Tracked",
    change: "+25%",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    value: "127",
    label: "Countries",
    change: "+5",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    value: "99.2%",
    label: "Tool Accuracy",
    change: "+0.3%",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

export function CommunityStats() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Live Statistics
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Trusted by Collectors Worldwide</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join the largest and most active Labubu community with real-time insights and collaboration
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-full ${stat.bgColor} ${stat.color} mb-4`}>{stat.icon}</div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change} this month
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live data updated every 5 minutes</span>
          </div>
        </div>
      </div>
    </section>
  )
}
