"use client"

import { usePathname } from "next/navigation"

/**
 * The РАССВЕТ home page renders its own floating capsule header
 * (`RassvetCapsuleHeader`). To avoid stacking two navigations there, this gate
 * hides the global storefront `Nav` on the exact home route (`/[countryCode]`)
 * while keeping it on every other page. Routing and data fetching are
 * untouched; only the rendered output is suppressed on home.
 */
export default function NavGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ""

  // Home is a single path segment: the country code (e.g. "/us", "/ru").
  const isHome = /^\/[^/]+\/?$/.test(pathname)

  if (isHome) {
    return null
  }

  return <>{children}</>
}
