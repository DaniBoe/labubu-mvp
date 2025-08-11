import type React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Settings } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Admin Panel</span>
            <Badge variant="outline">Beta</Badge>
          </div>

          <nav className="ml-8 flex items-center space-x-6">
            <Link href="/admin/data-collection" className="text-sm font-medium transition-colors hover:text-primary">
              Data Collection
            </Link>
            <Link href="/admin/models" className="text-sm font-medium transition-colors hover:text-primary">
              Models
            </Link>
          </nav>
        </div>
      </div>

      <main className="container py-8 px-4">{children}</main>
    </div>
  )
}
