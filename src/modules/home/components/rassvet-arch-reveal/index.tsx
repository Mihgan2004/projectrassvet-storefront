"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import styles from "./arch.module.css"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const BG_COLORS = ["#EDF9FF", "#FFECF2", "#FFE8DB"]

const SECTIONS = [
  {
    id: "green-arch",
    title: "Green Cityscape",
    desc: "Vibrant streets with vertical gardens and solar buildings. This oasis thrives on renewable energy, smart transport, and green spaces for biodiversity.",
    linkColor: "#D5FF37",
    image:
      "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/cu8978xjlsjjpjk52ta0.webp",
    alt: "Green Architecture",
    dataIndex: 4,
  },
  {
    id: "blue-arch",
    title: "Blue Urban Oasis",
    desc: "Avenues with azure facades and eco-structures. This hub uses clean energy, smart transit, and parks for urban wildlife.",
    linkColor: "#7DD6FF",
    image:
      "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/trh7c8ufv1dqfrofdytd.webp",
    alt: "Blue Architecture",
    dataIndex: 3,
  },
  {
    id: "pink-arch",
    title: "Fluid Architecture",
    desc: "Desert refuge with fluid architecture and glowing interiors. This sanctuary harnesses solar power, sustainable design, and natural harmony for resilient living.",
    linkColor: "#FFA0B0",
    image:
      "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/aw6qwur0pggp5r03whjq.webp",
    alt: "Pink Architecture",
    dataIndex: 2,
  },
  {
    id: "orange-arch",
    title: "Martian Arches",
    desc: "Ethereal structures arc over tranquil waters, bathed in the glow of a setting Martian sun. This desolate beauty showcases the stark, captivating landscape of the red planet.",
    linkColor: "#FFA17B",
    image:
      "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/sqwn8u84zd1besgl0zpd.webp",
    alt: "Orange Architecture",
    dataIndex: 1,
  },
] as const

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
    <path
      fill="#121212"
      d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
    />
  </svg>
)

/**
 * GSAP pinned image mask reveal on scroll.
 * Ported from the ImageKit / GSAP scroll demo (pinned arch + clip-path reveal).
 */
export default function RassvetArchReveal() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return
      }

      const scope = root.current
      if (!scope) return

      const imgWrappers = gsap.utils.toArray<HTMLElement>(
        scope.querySelectorAll("[data-arch-img-wrapper]")
      )
      const imgs = gsap.utils.toArray<HTMLImageElement>(
        scope.querySelectorAll("[data-arch-img]")
      )
      const leftItems = gsap.utils.toArray<HTMLElement>(
        scope.querySelectorAll("[data-arch-info]")
      )
      const rightItems = gsap.utils.toArray<HTMLElement>(
        scope.querySelectorAll("[data-arch-img-wrapper]")
      )

      imgWrappers.forEach((element) => {
        const order = element.getAttribute("data-index")
        if (order !== null) {
          element.style.zIndex = order
        }
      })

      const handleMobileLayout = () => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches

        if (isMobile) {
          leftItems.forEach((item, i) => {
            item.style.order = String(i * 2)
          })
          rightItems.forEach((item, i) => {
            item.style.order = String(i * 2 + 1)
          })
        } else {
          leftItems.forEach((item) => {
            item.style.order = ""
          })
          rightItems.forEach((item) => {
            item.style.order = ""
          })
        }
      }

      handleMobileLayout()

      let resizeTimeout: ReturnType<typeof setTimeout>
      const onResize = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(handleMobileLayout, 100)
      }
      window.addEventListener("resize", onResize)

      const bgTarget = scope

      ScrollTrigger.matchMedia({
        "(min-width: 769px)": () => {
          const mainTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: scope.querySelector("[data-arch]"),
              start: "top top",
              end: "bottom bottom",
              pin: scope.querySelector("[data-arch-right]"),
              scrub: true,
            },
          })

          gsap.set(imgs, {
            clipPath: "inset(0)",
            objectPosition: "0px 0%",
          })

          imgs.forEach((_, index) => {
            const currentImage = imgs[index]
            const nextImage = imgs[index + 1] ?? null
            const sectionTimeline = gsap.timeline()

            if (nextImage) {
              sectionTimeline
                .to(
                  bgTarget,
                  {
                    backgroundColor: BG_COLORS[index],
                    duration: 1.5,
                    ease: "power2.inOut",
                  },
                  0
                )
                .to(
                  currentImage,
                  {
                    clipPath: "inset(0px 0px 100%)",
                    objectPosition: "0px 60%",
                    duration: 1.5,
                    ease: "none",
                  },
                  0
                )
                .to(
                  nextImage,
                  {
                    objectPosition: "0px 40%",
                    duration: 1.5,
                    ease: "none",
                  },
                  0
                )
            }

            mainTimeline.add(sectionTimeline)
          })
        },
        "(max-width: 768px)": () => {
          const mbTimeline = gsap.timeline()
          gsap.set(imgs, {
            objectPosition: "0px 60%",
          })

          imgs.forEach((image, index) => {
            const innerTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: image,
                start: "top-=70% top+=50%",
                end: "bottom+=200% bottom",
                scrub: true,
              },
            })

            innerTimeline
              .to(image, {
                objectPosition: "0px 30%",
                duration: 5,
                ease: "none",
              })
              .to(bgTarget, {
                backgroundColor: BG_COLORS[index],
                duration: 1.5,
                ease: "power2.inOut",
              })

            mbTimeline.add(innerTimeline)
          })
        },
      })

      return () => {
        window.removeEventListener("resize", onResize)
        clearTimeout(resizeTimeout)
      }
    },
    { scope: root }
  )

  return (
    <section ref={root} className={styles.root}>
      <div className={styles.container}>
        <div className={styles.spacer} />

        <div className={styles.arch} data-arch>
          <div className={styles.archLeft}>
            {SECTIONS.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className={styles.archInfo}
                data-arch-info
              >
                <div>
                  <h2 className={styles.header}>{section.title}</h2>
                  <p className={styles.desc}>{section.desc}</p>
                  <LocalizedClientLink
                    href="/store"
                    className={styles.link}
                    style={{ backgroundColor: section.linkColor }}
                  >
                    <LinkIcon />
                    <span>Learn More</span>
                  </LocalizedClientLink>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.archRight} data-arch-right>
            {SECTIONS.map((section) => (
              <div
                key={section.id}
                className={styles.imgWrapper}
                data-arch-img-wrapper
                data-index={section.dataIndex}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={section.image}
                  alt={section.alt}
                  className={styles.img}
                  data-arch-img
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.spacer} />
      </div>
    </section>
  )
}
