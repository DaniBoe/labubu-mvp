import { LabubuChecker } from "@/components/labubu-checker"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Labubu Fake Checker | LabubuWiki",
  description: "AI-powered authenticity verification for Labubu collectibles. Upload photos for instant analysis.",
}

export default function FakeCheckerPage() {
  return (
    <div className="container mx-auto py-8">
      <LabubuChecker />
    </div>
  )
}
