"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { parallaxLayer } from "../_lib/placeholders"
import styles from "./osmo.module.css"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const LAYERS = [
  { layer: "1", yPercent: 70 },
  { layer: "2", yPercent: 55 },
  { layer: "3", yPercent: 40 },
  { layer: "4", yPercent: 10 },
]

/**
 * Block 2 — Osmo "Parallax Image Layers" (codepen.io/osmosupply/NWQevrB).
 *
 * Faithful port: a single scrubbed GSAP timeline tied to the layers container,
 * each `[data-parallax-layer]` tweened to its own yPercent with ease "none",
 * all starting at the same position ("<"). Smooth scrolling is provided by the
 * shared Lenis instance (RassvetSmoothScroll), exactly like the original pen.
 */
export default function RassvetOsmoBlock() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return
      }

      const triggerElement = root.current?.querySelector(
        "[data-parallax-layers]"
      )
      if (!triggerElement) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      })

      LAYERS.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(
            `[data-parallax-layer="${layerObj.layer}"]`
          ),
          {
            yPercent: layerObj.yPercent,
            ease: "none",
          },
          idx === 0 ? undefined : "<"
        )
      })
    },
    { scope: root }
  )

  return (
    <div ref={root} className={styles.parallax}>
      <section className={styles.header}>
        <div className={styles.visuals}>
          <div className={styles.blackLineOverflow} />
          <div data-parallax-layers className={styles.layers}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={parallaxLayer(1)}
              alt=""
              data-parallax-layer="1"
              className={styles.layerImg}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={parallaxLayer(2)}
              alt=""
              data-parallax-layer="2"
              className={styles.layerImg}
            />
            <div data-parallax-layer="3" className={styles.layerTitle}>
              <h2 className={styles.title}>Рассвет</h2>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={parallaxLayer(3)}
              alt=""
              data-parallax-layer="4"
              className={styles.layerImg}
            />
          </div>
          <div className={styles.fade} />
        </div>
      </section>

      <div className={styles.radialGradient} />

      <section className={styles.content}>
        <div className="content-container relative z-[2] flex flex-col items-center text-center">
          <span className="eyebrow">Глубина и слой</span>
          <h3 className="heading-display mt-5 text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            Форма, собранная по слоям
          </h3>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
            Каждая вещь РАССВЕТ — это структура: база, функция и характер.
            Прокрутите, чтобы увидеть, как слои расходятся.
          </p>
          <LocalizedClientLink href="/store" className="btn-secondary mt-8">
            Перейти в каталог
          </LocalizedClientLink>
        </div>
      </section>
    </div>
  )
}
