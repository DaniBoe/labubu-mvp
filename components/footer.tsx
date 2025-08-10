import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Twitter, Instagram, Youtube, Github, Mail, BookOpen, Wrench, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                LabubuWiki
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              The ultimate resource for Labubu collectors worldwide. Authenticate, track, and discover your favorite
              collectibles.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Wiki */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Wiki
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/wiki/series" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Series
                </Link>
              </li>
              <li>
                <Link href="/wiki/variants" className="text-muted-foreground hover:text-foreground transition-colors">
                  Variants & Rarities
                </Link>
              </li>
              <li>
                <Link href="/wiki/timeline" className="text-muted-foreground hover:text-foreground transition-colors">
                  Release Timeline
                </Link>
              </li>
              <li>
                <Link href="/wiki/guides" className="text-muted-foreground hover:text-foreground transition-colors">
                  Collector Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center">
              <Wrench className="h-4 w-4 mr-2" />
              Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tools/fake-checker"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Fake Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/price-tracker"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Price Tracker
                </Link>
              </li>
              <li>
                <Link href="/tools/alerts" className="text-muted-foreground hover:text-foreground transition-colors">
                  Price Alerts
                </Link>
              </li>
              <li>
                <Link href="/tools/wishlist" className="text-muted-foreground hover:text-foreground transition-colors">
                  Wishlist Manager
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground">
              Get notified about new releases, tool updates, and community highlights.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Heart className="h-3 w-3 text-red-500" />
              <span>Join 15,000+ collectors</span>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2024 LabubuWiki. All rights reserved.</span>
            <Badge variant="outline" className="text-xs">
              Made with ❤️ for collectors
            </Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
