"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import TITLE_IMG from "./assets/title-layer.png"
import PEOPLE_IMG from "./assets/people-layer.png"
import styles from "./parallax.module.css"

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll parallax section — Osmo "Parallax Image Layers" mechanic
 * (codepen.io/osmosupply/NWQevrB), composed from two separate layers:
 * title behind, people in front. Smooth scrolling is provided by the shared
 * Lenis instance (RassvetSmoothScroll) on the home route.
 */
export default function RassvetParallaxSection() {
  const root = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = root.current
      const viewportEl = viewport.current
      if (!section || !viewportEl) return

      const titleLayer = section.querySelector<HTMLElement>(
        "[data-parallax-title]"
      )
      const peopleLayer = section.querySelector<HTMLElement>(
        "[data-parallax-people]"
      )
      if (!titleLayer || !peopleLayer) return

      const images = Array.from(
        section.querySelectorAll<HTMLImageElement>("img")
      )
      const allLoaded = images.every((img) => img.complete)

      const build = () => {
        const mm = gsap.matchMedia()

        mm.add(
          {
            isDesktop: "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
            isMobile: "(max-width: 768px) and (prefers-reduced-motion: no-preference)",
          },
          (context) => {
            const { isDesktop } = context.conditions as {
              isDesktop: boolean
            }

            const title = isDesktop
              ? { yPercent: 40, scale: 1.03 }
              : { yPercent: 18, scale: 1.015 }
            const people = isDesktop
              ? { yPercent: 10, scale: 1.012 }
              : { yPercent: 6, scale: 1.006 }

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: "+=100%",
                  scrub: true,
                  pin: viewportEl,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                },
              })
              .to(
                titleLayer,
                { yPercent: title.yPercent, scale: title.scale, ease: "none" },
                0
              )
              .to(
                peopleLayer,
                {
                  yPercent: people.yPercent,
                  scale: people.scale,
                  ease: "none",
                },
                0
              )
          }
        )

        return () => mm.revert()
      }

      if (allLoaded) {
        const cleanup = build()
        ScrollTrigger.refresh()
        return cleanup
      }

      let loaded = 0
      let teardown: (() => void) | undefined

      const onReady = () => {
        loaded += 1
        if (loaded < images.length) return
        teardown = build()
        ScrollTrigger.refresh()
      }

      images.forEach((img) => {
        img.addEventListener("load", onReady)
        img.addEventListener("error", onReady)
      })

      return () => {
        teardown?.()
        images.forEach((img) => {
          img.removeEventListener("load", onReady)
          img.removeEventListener("error", onReady)
        })
      }
    },
    { scope: root }
  )

  return (
    <section ref={root} className={styles.section}>
      <div ref={viewport} className={styles.viewport}>
        <div className={styles.layers}>
          <div className={styles.background} />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={TITLE_IMG.src}
            alt=""
            className={`${styles.layer} ${styles.titleLayer}`}
            data-parallax-title
            draggable={false}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PEOPLE_IMG.src}
            alt=""
            className={`${styles.layer} ${styles.peopleLayer}`}
            data-parallax-people
            draggable={false}
          />

          <div className={styles.vignette} />
        </div>
      </div>
    </section>
  )
}
