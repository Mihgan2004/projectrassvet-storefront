import { Metadata } from "next"

import RassvetSmoothScroll from "@modules/home/components/rassvet-smooth-scroll"
import RassvetCapsuleHeader from "@modules/home/components/rassvet-capsule-header"
import RassvetVideoHero from "@modules/home/components/rassvet-video-hero"
import RassvetOsmoBlock from "@modules/home/components/rassvet-osmo-block"
import RassvetStickyGrid from "@modules/home/components/rassvet-sticky-grid"
import RassvetLetterCollections from "@modules/home/components/rassvet-letter-collections"
import RassvetScanFinale from "@modules/home/components/rassvet-scan-finale"

export const metadata: Metadata = {
  title: "РАССВЕТ — тактическая одежда и ограниченные коллекции",
  description:
    "Тактическая эстетика, городская форма и ограниченные коллекции одежды РАССВЕТ.",
}

/**
 * Home page — server composition.
 *
 * The page itself does no blocking data fetch: every section below is a
 * self-contained brand/animation block (placeholder content), so the first
 * HTML streams immediately. Browser-only animation logic lives inside the
 * individual "use client" sections; the storefront's Medusa data flows
 * (cart, account, footer categories) remain on their existing server patterns.
 */
export default function Home() {
  return (
    <>
      {/* Smooth scrolling (Lenis) + GSAP ScrollTrigger sync, home only */}
      <RassvetSmoothScroll />

      {/* 1. Capsule header */}
      <RassvetCapsuleHeader />

      {/* 2. Video hero */}
      <RassvetVideoHero />

      {/* 3. Osmo parallax image layers */}
      <RassvetOsmoBlock />

      {/* 4. Sticky grid scroll gallery */}
      <RassvetStickyGrid />

      {/* 5. On-scroll letter animations / collections */}
      <RassvetLetterCollections />

      {/* 6. Scan effect finale + CTA */}
      <RassvetScanFinale />

      {/* 7. Footer is rendered by the (main) layout */}
    </>
  )
}
