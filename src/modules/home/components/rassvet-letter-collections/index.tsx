"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { widePlaceholder } from "../_lib/placeholders"
import styles from "./letters.module.css"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const COLLECTIONS = [
  { word: "РАССВЕТ", href: "/store" },
  { word: "КОЛЛЕКЦИИ", href: "/store" },
  { word: "ГОРОД", href: "/store" },
  { word: "ФОРМА", href: "/store" },
  { word: "LIMITED", href: "/store" },
]

// clamp + map, identical to the demo's utils.js
const clamp = (num: number, min: number, max: number) =>
  num <= min ? min : num >= max ? max : num
const map = (x: number, a: number, b: number, c: number, d: number) =>
  clamp(((x - a) * (d - c)) / (b - a) + c, Math.min(c, d), Math.max(c, d))

/**
 * Block 4 — Codrops "On-Scroll Letter Animations" (Demo 1).
 *
 * Re-implements the original mechanic without Splitting.js / Locomotive Scroll
 * (Splitting is replaced by per-character spans; the scroll-velocity source is
 * the shared Lenis-driven window scroll). On each frame we map the scroll
 * distance into [-50, 50] and bend each word: the middle characters get the
 * largest translateY using the demo's exact `factor` formula. Images get a
 * light parallax, echoing the original `data-scroll-speed`.
 */
export default function RassvetLetterCollections() {
  const root = useRef<HTMLDivElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
  }, [])

  // Letter bending driven by scroll velocity (the core demo effect).
  useEffect(() => {
    if (reduced) return

    let raf = 0
    const scroll = { cache: window.scrollY, current: window.scrollY }

    const tick = () => {
      scroll.current = window.scrollY
      const distance = scroll.current - scroll.cache
      scroll.cache = scroll.current

      // distance of [150, -150] maps to translateY of [-50, 50]
      const translateY = map(distance, 150, -150, -50, 50)

      const words =
        root.current?.querySelectorAll<HTMLElement>("[data-word]") ?? []
      for (const word of Array.from(words)) {
        const chars = word.querySelectorAll<HTMLElement>("[data-char]")
        const charsTotal = chars.length
        chars.forEach((char, j) => {
          const factor =
            j < Math.ceil(charsTotal / 2)
              ? j
              : Math.ceil(charsTotal / 2) -
                Math.abs(Math.floor(charsTotal / 2) - j) -
                1
          char.style.transform = `translate3d(0,${factor * translateY}px,0)`
        })
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  // Light image parallax (echoes the original data-scroll-speed="1").
  useGSAP(
    () => {
      if (reduced || !root.current) return
      const imgs = root.current.querySelectorAll<HTMLElement>("[data-letter-img]")
      imgs.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(`.${styles.content}`),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      })
    },
    { scope: root, dependencies: [reduced] }
  )

  return (
    <div
      ref={root}
      className={`${styles.root} ${reduced ? styles.reduced : ""}`}
    >
      {COLLECTIONS.map((item, index) => (
        <section key={item.word} className={styles.content}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-letter-img
            className={styles.img}
            src={widePlaceholder(item.word, index % 2 === 0 ? "gold" : "red")}
            alt=""
          />
          <LocalizedClientLink
            href={item.href}
            className={styles.text}
            data-word
          >
            {item.word.split("").map((ch, j) => (
              <span key={j} data-char className={styles.char}>
                {ch}
              </span>
            ))}
          </LocalizedClientLink>
        </section>
      ))}
    </div>
  )
}
