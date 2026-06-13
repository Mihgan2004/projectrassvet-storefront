"use client"

import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { tilePlaceholder } from "../_lib/placeholders"
import styles from "./sticky-grid.module.css"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const GALLERY = Array.from({ length: 12 }, (_, i) => tilePlaceholder(i + 1))
const INTRO_IMAGE = tilePlaceholder(8, "08")

/**
 * Block 3 — Codrops "Sticky Grid Scroll" (Theo Plawinski).
 *
 * Direct port of the original StickyGridScroll class into a React/useGSAP
 * lifecycle. The element lookups now use refs instead of class selectors, but
 * every animation (wrapper parallax, title fade, column reveal with staggered
 * top/bottom entrances, grid zoom with lateral spread + central vertical split,
 * and the scroll-direction-aware content toggle) is reproduced 1:1, including
 * timings, eases, scrub and ScrollTrigger start/end values.
 */
export default function RassvetStickyGrid() {
  const root = useRef<HTMLDivElement>(null)
  const block = useRef<HTMLElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const description = useRef<HTMLParagraphElement>(null)
  const button = useRef<HTMLAnchorElement>(null)
  const grid = useRef<HTMLUListElement>(null)

  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
  }, [])

  useGSAP(
    () => {
      if (
        reduced ||
        !block.current ||
        !wrapper.current ||
        !content.current ||
        !title.current ||
        !description.current ||
        !button.current ||
        !grid.current
      ) {
        return
      }

      const blockEl = block.current
      const wrapperEl = wrapper.current
      const contentEl = content.current
      const titleEl = title.current
      const descriptionEl = description.current
      const buttonEl = button.current
      const gridEl = grid.current
      const items = Array.from(gridEl.children) as HTMLElement[]

      // --- initContent -------------------------------------------------------
      gsap.set([descriptionEl, buttonEl], {
        opacity: 0,
        pointerEvents: "none",
      })

      const dy = (contentEl.offsetHeight - titleEl.offsetHeight) / 2
      const titleOffsetY = (dy / contentEl.offsetHeight) * 100
      gsap.set(titleEl, { yPercent: titleOffsetY })

      // --- groupItemsByColumn ------------------------------------------------
      const numColumns = 3
      const columns: HTMLElement[][] = Array.from(
        { length: numColumns },
        () => []
      )
      items.forEach((item, index) => {
        columns[index % numColumns].push(item)
      })

      // --- addParallaxOnScroll ----------------------------------------------
      gsap.from(wrapperEl, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: blockEl,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      })

      // --- animateTitleOnScroll ---------------------------------------------
      gsap.from(titleEl, {
        opacity: 0,
        duration: 0.7,
        ease: "power1.out",
        scrollTrigger: {
          trigger: blockEl,
          start: "top 57%",
          toggleActions: "play none none reset",
        },
      })

      // --- gridRevealTimeline ------------------------------------------------
      const gridRevealTimeline = () => {
        const timeline = gsap.timeline()
        const wh = window.innerHeight
        const revealDy = wh - (wh - gridEl.offsetHeight) / 2

        columns.forEach((column, colIndex) => {
          const fromTop = colIndex % 2 === 0
          timeline.from(
            column,
            {
              y: revealDy * (fromTop ? -1 : 1),
              stagger: {
                each: 0.06,
                from: fromTop ? "end" : "start",
              },
              ease: "power1.inOut",
            },
            "grid-reveal"
          )
        })

        return timeline
      }

      // --- gridZoomTimeline --------------------------------------------------
      const gridZoomTimeline = () => {
        const timeline = gsap.timeline({
          defaults: { duration: 1, ease: "power3.inOut" },
        })

        timeline.to(gridEl, { scale: 2.05 })
        timeline.to(columns[0], { xPercent: -40 }, "<")
        timeline.to(columns[2], { xPercent: 40 }, "<")
        timeline.to(
          columns[1],
          {
            yPercent: (index: number) =>
              (index < Math.floor(columns[1].length / 2) ? -1 : 1) * 40,
            duration: 0.5,
            ease: "power1.inOut",
          },
          "-=0.5"
        )

        return timeline
      }

      // --- toggleContent -----------------------------------------------------
      const toggleContent = (isVisible = true) => {
        gsap
          .timeline({ defaults: { overwrite: true } })
          .to(titleEl, {
            yPercent: isVisible ? 0 : titleOffsetY,
            duration: 0.7,
            ease: "power2.inOut",
          })
          .to(
            [descriptionEl, buttonEl],
            {
              opacity: isVisible ? 1 : 0,
              duration: 0.4,
              ease: `power1.${isVisible ? "inOut" : "out"}`,
              pointerEvents: isVisible ? "all" : "none",
            },
            isVisible ? "-=90%" : "<"
          )
      }

      // --- animateGridOnScroll ----------------------------------------------
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: blockEl,
          start: "top 25%",
          end: "bottom bottom",
          scrub: true,
        },
      })

      timeline
        .add(gridRevealTimeline())
        .add(gridZoomTimeline(), "-=0.6")
        .add(
          () =>
            toggleContent(
              timeline.scrollTrigger
                ? timeline.scrollTrigger.direction === 1
                : true
            ),
          "-=0.32"
        )

      ScrollTrigger.refresh()
    },
    { scope: root, dependencies: [reduced] }
  )

  return (
    <div
      ref={root}
      className={`${styles.root} ${reduced ? styles.reduced : ""}`}
    >
      <section className={styles.blockIntro}>
        <figure className={styles.media}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.mediaImage} src={INTRO_IMAGE} alt="" />
          <figcaption className={styles.mediaCaption}>
            Scroll-driven gallery experiment
          </figcaption>
        </figure>
      </section>

      <section ref={block} className={styles.blockMain}>
        <div ref={wrapper} className={styles.wrapper}>
          <div ref={content} className={styles.content}>
            <h2 ref={title} className={styles.title}>
              Городская форма
            </h2>
            <p ref={description} className={styles.description}>
              Сетка образов РАССВЕТ — каждая вещь как кадр из городской хроники.
            </p>
            <a
              ref={button}
              className={styles.button}
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Открыть лукбук
            </a>
          </div>
          <div className={styles.gallery}>
            <ul ref={grid} className={styles.grid}>
              {GALLERY.map((src, i) => (
                <li key={i} className={styles.item}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={styles.image} src={src} alt="" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
