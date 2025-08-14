"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackEvent, trackFakeChecker, trackPageView } from "@/lib/gtag"
import * as gtag from "@/lib/gtag"
console.log(gtag)


export function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname)
    }
  }, [pathname])

  return {
    trackEvent,
    trackFakeChecker,
    trackPageView,
  }
}
