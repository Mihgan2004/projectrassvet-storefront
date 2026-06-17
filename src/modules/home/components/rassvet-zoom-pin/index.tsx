"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import styles from "./zoom-pin.module.css"
import HERO_BG from "./assets/hero-bg.png"
import FOREGROUND_IMG from "./assets/foreground.png"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * GSAP pinned 3D zoom on scroll — ported from
 * https://codepen.io/GreenSock/pen/YzbPYMx
 *
 * Foreground = night-vision (NVG) view of the 4 soldiers. Background = the same
 * 4 soldiers in full color. On scroll the NVG layer zooms toward the viewer
 * (scale 2, z 350 under perspective) and dissolves, revealing the full-color
 * scene behind it.
 */
export default function RassvetZoomPin() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return
      }

      const scope = root.current
      if (!scope) return

      const img = scope.querySelector<HTMLImageElement>("[data-zoom-img]")
      const hero = scope.querySelector("[data-zoom-hero]")
      if (!img || !hero) return

      const run = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: true,
          },
        })

        tl.to(
          img,
          {
            scale: 2,
            z: 350,
            transformOrigin: "center center",
            ease: "power1.inOut",
            duration: 1,
          },
          0
        )
          .to(
            hero,
            {
              scale: 1.1,
              transformOrigin: "center center",
              ease: "power1.inOut",
              duration: 1,
            },
            "<"
          )
          // NVG layer dissolves in the latter part of the zoom so the
          // full-color soldiers are fully revealed at the end.
          .to(
            img,
            {
              autoAlpha: 0,
              ease: "power2.in",
              duration: 0.55,
            },
            0.45
          )
      }

      if (img.complete) {
        run()
      } else {
        img.addEventListener("load", run, { once: true })
        return () => img.removeEventListener("load", run)
      }
    },
    { scope: root }
  )

  return (
    <div ref={root} className={styles.wrapper}>
      <div className={styles.content}>
        <section
          className={`${styles.section} ${styles.hero}`}
          data-zoom-hero
          style={{ backgroundImage: `url(${HERO_BG.src})` }}
        />
      </div>
      <div className={styles.imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FOREGROUND_IMG.src}
          alt="Четыре бойца через прибор ночного видения"
          className={styles.image}
          data-zoom-img
          draggable={false}
        />
      </div>
    </div>
  )
}
