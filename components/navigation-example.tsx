"use client"

// Example of how to add to your existing Pages Router navigation
import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"

export function NavigationExample() {
  const router = useRouter()

  return (
    <nav className="flex items-center gap-6">
      {/* Your existing nav items */}
      <Link href="/" className={`text-sm font-medium ${router.pathname === "/" ? "text-primary" : ""}`}>
        Home
      </Link>
      <Link href="/about" className={`text-sm font-medium ${router.pathname === "/about" ? "text-primary" : ""}`}>
        About
      </Link>

      {/* Tools dropdown or direct link */}
      <div className="relative group">
        <Link
          href="/tools"
          className={`text-sm font-medium ${router.pathname.startsWith("/tools") ? "text-primary" : ""}`}
        >
          Tools
        </Link>
        {/* Optional dropdown */}
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          <Link href="/tools/fake-checker" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted">
            <ShieldCheck className="h-4 w-4" />
            Fake Checker
          </Link>
        </div>
      </div>

      {/* Or as a prominent CTA button */}
      <Button asChild variant="default" className="bg-emerald-600 hover:bg-emerald-700">
        <Link href="/tools/fake-checker" className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          Check Authenticity
        </Link>
      </Button>
    </nav>
  )
}
