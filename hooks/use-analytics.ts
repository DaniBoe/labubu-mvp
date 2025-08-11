"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { pageview, event, trackFakeChecker, trackPageView } from "@/lib/gtag"

export function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      pageview(pathname)
    }
  }, [pathname])

  return {
    trackEvent: event,
    trackFakeChecker,
    trackPageView,
  }
}
