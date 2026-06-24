"use client"

import { usePathname } from "next/navigation"

/**
 * Adds top padding for the fixed capsule header on every page except home,
 * where the hero is full-viewport and the header floats over it.
 */
export default function PageTopOffset({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() || ""
  const isHome = /^\/[^/]+\/?$/.test(pathname)

  return <div className={isHome ? undefined : "pt-24"}>{children}</div>
}
