"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { trackPageView } from "@/lib/gtag"

export default function AnalyticsListener() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
    console.log("GA pageview triggered:", url)
    trackPageView(url)
  }, [pathname, searchParams])

  return null
}
