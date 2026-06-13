"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

gsap.registerPlugin(ScrollTrigger)

/**
 * Home-only smooth scrolling.
 *
 * Both the Osmo "Parallax Image Layers" pen and the Codrops "Sticky Grid
 * Scroll" tutorial drive their GSAP ScrollTriggers through a single Lenis
 * instance synced to the GSAP ticker. We reproduce that exact setup here, but
 * scope it to the home route: Lenis is created on mount and fully destroyed on
 * unmount, so the cart, checkout and account flows keep native scrolling.
 *
 * Respects `prefers-reduced-motion`: when set, no smoothing is installed and
 * the page falls back to native scroll.
 */
export default function RassvetSmoothScroll() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.1,
    })

    lenis.on("scroll", ScrollTrigger.update)

    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return null
}
