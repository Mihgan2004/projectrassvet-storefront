"use client"

import Image from "next/image"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const NAV_LINKS = [
  { href: "/store", label: "КАТАЛОГ" },
  { href: "/store", label: "КОЛЛЕКЦИИ" },
  { href: "/about", label: "О БРЕНДЕ" },
  { href: "/shipping", label: "ДОСТАВКА" },
  { href: "/cart", label: "КОРЗИНА" },
]

type RassvetCapsuleHeaderProps = {
  cartCount?: number
}

function useLocalizedPath() {
  const pathname = usePathname() || ""
  const { countryCode } = useParams()
  const prefix = `/${countryCode}`

  if (pathname === prefix || pathname === `${prefix}/`) {
    return "/"
  }

  if (pathname.startsWith(`${prefix}/`)) {
    return pathname.slice(prefix.length)
  }

  return pathname
}

export default function RassvetCapsuleHeader({
  cartCount = 0,
}: RassvetCapsuleHeaderProps) {
  const path = useLocalizedPath()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let rafId = 0
    let prev = false

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const next = window.scrollY > 50
        if (next !== prev) {
          prev = next
          setScrolled(next)
        }
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [path])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const isActive = (href: string) => {
    if (href === "/") {
      return path === "/"
    }

    return path === href || path.startsWith(`${href}/`)
  }

  return (
    <>
      <nav
        className={`fixed left-1/2 z-50 w-max max-w-[calc(100%-1.5rem)] -translate-x-1/2 transition-all duration-500 ease-out sm:max-w-[min(88vw,680px)] sm:top-4 md:top-5 lg:max-w-[min(90vw,760px)] top-[max(0.75rem,env(safe-area-inset-top))]`}
      >
        <div className="relative rounded-full">
          <div
            className={`relative flex min-h-[38px] items-center gap-1.5 overflow-hidden rounded-full border px-2.5 py-1.5 transition-all duration-500 sm:min-h-0 sm:gap-5 sm:px-4 sm:py-2 md:gap-7 md:px-5 md:py-2 lg:gap-8 lg:px-6 lg:py-2.5 ${
              scrolled
                ? "border-white/[0.06] bg-[#0c0e13]/96 shadow-[0_8px_32px_rgba(0,0,0,0.5)] lg:border-white/[0.08] lg:shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
                : "border-white/[0.04] bg-[#0c0e13]/85 shadow-[0_4px_20px_rgba(0,0,0,0.3)] lg:border-white/[0.06] lg:bg-[#0c0e13]/88 lg:shadow-[0_8px_28px_rgba(0,0,0,0.4)] lg:backdrop-blur-md"
            }`}
          >
            <LocalizedClientLink
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex shrink-0 items-center pl-0.5"
            >
              <Image
                src="/header/logo.png"
                alt="РАССВЕТ"
                width={59}
                height={32}
                sizes="59px"
                className="h-[18px] w-auto opacity-90 transition-opacity duration-200 hover:opacity-100 md:h-5 lg:h-6"
                priority
              />
            </LocalizedClientLink>

            <div className="z-10 hidden items-center gap-5 text-[11px] font-medium tracking-[0.14em] text-white/40 md:flex lg:gap-8 lg:text-[12px] lg:tracking-[0.16em] lg:text-white/45">
              {NAV_LINKS.filter((link) => link.href !== "/cart").map((link) => (
                <LocalizedClientLink
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 hover:text-white/80 ${
                    isActive(link.href) ? "text-white/90" : ""
                  }`}
                >
                  {link.label}
                </LocalizedClientLink>
              ))}
            </div>

            <div className="z-10 hidden items-center gap-3 text-[10px] font-mono tracking-wider text-white/35 md:flex lg:gap-4 lg:text-[11px] lg:text-white/40">
              <LocalizedClientLink
                href="/cart"
                className="flex items-center gap-1.5 transition-colors duration-200 hover:text-white/70"
              >
                <span className="text-white/40">CART</span>
                <span className="tabular-nums text-white/60">[{cartCount}]</span>
              </LocalizedClientLink>
            </div>

            <div className="flex shrink-0 items-center gap-0.5 md:hidden">
              <LocalizedClientLink
                href="/store"
                onClick={() => setMenuOpen(false)}
                className={`rounded-md px-2.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 ${
                  isActive("/store") ? "text-white/90" : "text-white/45 hover:text-white/70"
                }`}
              >
                Каталог
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/cart"
                aria-label={`Корзина${cartCount > 0 ? `, товаров: ${cartCount}` : ""}`}
                className="capsule-btn-icon relative"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full border border-white/10 bg-white/12 px-0.5 text-[9px] font-medium leading-none tabular-nums text-white/90">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </LocalizedClientLink>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label="Меню"
                aria-expanded={menuOpen}
                className="capsule-btn-icon flex flex-col items-center justify-center gap-[3.5px]"
              >
                <span
                  className={`block h-[1.2px] w-[14px] origin-center bg-current transition-all duration-300 ${
                    menuOpen ? "translate-y-[4.7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.2px] w-[14px] bg-current transition-all duration-300 ${
                    menuOpen ? "scale-x-0 opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.2px] w-[14px] origin-center bg-current transition-all duration-300 ${
                    menuOpen ? "-translate-y-[4.7px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Закрыть меню"
          className="absolute inset-0 bg-[#060709]/97 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10">
          {NAV_LINKS.map((link) => (
            <LocalizedClientLink
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-[18px] font-medium uppercase tracking-[0.3em] transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-white/90"
                  : "text-white/35 hover:text-white/60"
              }`}
            >
              {link.label}
              {link.href === "/cart" && cartCount > 0 && (
                <span className="ml-2 text-[13px] tabular-nums text-white/25">
                  [{cartCount}]
                </span>
              )}
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </>
  )
}
