"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Menu, BookOpen, Wrench, Users, Sparkles, X, ChevronDown } from "lucide-react"

export function HeaderWorking() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWikiDropdownOpen, setIsWikiDropdownOpen] = useState(false)
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            LabubuWiki
          </span>
          <Badge variant="secondary" className="text-xs">
            Beta
          </Badge>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex mx-6 items-center space-x-6">
          {/* Wiki Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center gap-1 h-10"
              onClick={() => {
                setIsWikiDropdownOpen(!isWikiDropdownOpen)
                setIsToolsDropdownOpen(false)
              }}
            >
              Wiki
              <ChevronDown className="h-4 w-4" />
            </Button>

            {isWikiDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Complete Database</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explore all Labubu series, variants, and collectibles with detailed information.
                  </p>
                </div>
                <div className="border-t">
                  <Link
                    href="/wiki/series"
                    className="flex items-center gap-2 p-3 hover:bg-muted transition-colors"
                    onClick={() => setIsWikiDropdownOpen(false)}
                  >
                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                    <div>
                      <div className="font-medium">Series Guide</div>
                      <div className="text-sm text-muted-foreground">Browse all official Labubu series</div>
                    </div>
                  </Link>
                  <Link
                    href="/wiki/variants"
                    className="flex items-center gap-2 p-3 hover:bg-muted transition-colors"
                    onClick={() => setIsWikiDropdownOpen(false)}
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <div>
                      <div className="font-medium">Variants & Rarities</div>
                      <div className="text-sm text-muted-foreground">Discover rare variants and special editions</div>
                    </div>
                  </Link>
                  <Link
                    href="/wiki/timeline"
                    className="flex items-center gap-2 p-3 hover:bg-muted transition-colors"
                    onClick={() => setIsWikiDropdownOpen(false)}
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <div>
                      <div className="font-medium">Release Timeline</div>
                      <div className="text-sm text-muted-foreground">Track release dates and upcoming drops</div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Tools Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center gap-1 h-10"
              onClick={() => {
                setIsToolsDropdownOpen(!isToolsDropdownOpen)
                setIsWikiDropdownOpen(false)
              }}
            >
              Tools
              <ChevronDown className="h-4 w-4" />
            </Button>

            {isToolsDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50">
                <div className="grid grid-cols-2 gap-2 p-2">
                  <Link
                    href="/tools/fake-checker"
                    className="flex flex-col items-start gap-2 p-3 rounded hover:bg-muted transition-colors"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-emerald-600 rounded" />
                      <span className="font-medium">Fake Checker</span>
                    </div>
                    <span className="text-xs text-muted-foreground">AI-powered authenticity verification</span>
                  </Link>
                  <Link
                    href="/tools/price-tracker"
                    className="flex flex-col items-start gap-2 p-3 rounded hover:bg-muted transition-colors"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-600 rounded" />
                      <span className="font-medium">Price Tracker</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Monitor market prices and trends</span>
                  </Link>
                  <Link
                    href="/tools/wishlist"
                    className="flex flex-col items-start gap-2 p-3 rounded hover:bg-muted transition-colors"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-pink-600 rounded" />
                      <span className="font-medium">Wishlist</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Track your wanted items</span>
                  </Link>
                  <Link
                    href="/tools/alerts"
                    className="flex flex-col items-start gap-2 p-3 rounded hover:bg-muted transition-colors"
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-600 rounded" />
                      <span className="font-medium">Price Alerts</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Get notified of price drops</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Community Link */}
          <Link href="/community" className="text-sm font-medium transition-colors hover:text-primary">
            Community
          </Link>
        </nav>

        {/* Search */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="header-search"
                name="search"
                type="search"
                placeholder="Search Labubu series, tools..."
                className="w-full md:w-[300px] pl-8"
                autoComplete="search"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/wiki"
                className="flex items-center space-x-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BookOpen className="h-5 w-5" />
                <span>Wiki</span>
              </Link>
              <Link
                href="/tools"
                className="flex items-center space-x-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Wrench className="h-5 w-5" />
                <span>Tools</span>
              </Link>
              <Link
                href="/tools/fake-checker"
                className="flex items-center space-x-2 text-lg font-medium hover:text-primary pl-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-4 h-4 bg-emerald-600 rounded" />
                <span>Fake Checker</span>
              </Link>
              <Link
                href="/community"
                className="flex items-center space-x-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users className="h-5 w-5" />
                <span>Community</span>
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(isWikiDropdownOpen || isToolsDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsWikiDropdownOpen(false)
            setIsToolsDropdownOpen(false)
          }}
        />
      )}
    </header>
  )
}
