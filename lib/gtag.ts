// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID!

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

// Send a pageview
export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,              // SPA path like /tools/fake-checker
      page_location: window.location.href, // optional, full URL
    })
  }
}

// Send a custom event
export const trackEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    })
  }
}

// Track fake checker usage
export const trackFakeChecker = (result: "authentic" | "counterfeit" | "uncertain") => {
  trackEvent({
    action: "fake_check_completed",
    category: "Tools",
    label: result,
    value: 1,
  })
}
