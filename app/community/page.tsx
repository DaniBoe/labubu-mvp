import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Star, Trophy, Calendar, TrendingUp } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Community</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with fellow Labubu collectors, share your collection, and stay updated with the latest news
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid gap-6 md:grid-cols-4 mb-12">
        <Card className="text-center">
          <CardContent className="p-6">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">52,341</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-sm text-muted-foreground">Daily Posts</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Star className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold">98.7%</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">15K+</div>
            <div className="text-sm text-muted-foreground">Collections</div>
          </CardContent>
        </Card>
      </div>

      {/* Community Features */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Discussion Forums
            </CardTitle>
            <CardDescription>Join conversations about collecting, trading, and more</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="mb-4">Coming Soon</Badge>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with other collectors, ask questions, and share your knowledge.
            </p>
            <Button disabled className="w-full">
              Join Discussions
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Collection Showcase
            </CardTitle>
            <CardDescription>Show off your amazing Labubu collections</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="mb-4">Coming Soon</Badge>
            <p className="text-sm text-muted-foreground mb-4">
              Share photos of your collection and get featured in our monthly showcase.
            </p>
            <Button disabled className="w-full">
              Share Collection
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trading Hub
            </CardTitle>
            <CardDescription>Safe and secure trading platform for collectors</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="mb-4">Coming Soon</Badge>
            <p className="text-sm text-muted-foreground mb-4">
              Trade duplicates and find missing pieces for your collection.
            </p>
            <Button disabled className="w-full">
              Start Trading
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Events & Meetups
            </CardTitle>
            <CardDescription>Local and virtual collector events</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="mb-4">Coming Soon</Badge>
            <p className="text-sm text-muted-foreground mb-4">
              Join collector meetups, conventions, and exclusive events.
            </p>
            <Button disabled className="w-full">
              View Events
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Collector Rewards
            </CardTitle>
            <CardDescription>Earn points and unlock exclusive benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="mb-4">Coming Soon</Badge>
            <p className="text-sm text-muted-foreground mb-4">
              Get rewarded for participating in the community and helping others.
            </p>
            <Button disabled className="w-full">
              Learn More
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Expert Network
            </CardTitle>
            <CardDescription>Connect with verified Labubu experts and authenticators</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="mb-4">Coming Soon</Badge>
            <p className="text-sm text-muted-foreground mb-4">
              Get professional advice and authentication services from experts.
            </p>
            <Button disabled className="w-full">
              Find Experts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
