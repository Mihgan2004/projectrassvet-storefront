"use client"

import { useEffect, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const navLinks = [
  { label: "Каталог", href: "/store" },
  { label: "Коллекции", href: "/store" },
  { label: "О бренде", href: "/about" },
  { label: "Доставка", href: "/shipping" },
]

/**
 * Floating "capsule" header for the home page: a dark translucent pill with
 * blur, a thin gold border and red accents. Becomes slightly more solid once
 * the user scrolls past the hero. Replaces the global storefront nav on home
 * (see NavGate) while keeping countryCode-aware LocalizedClientLink routing.
 */
export default function RassvetCapsuleHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-4 small:pt-6">
      <header
        className="pointer-events-auto w-full max-w-[1180px] rounded-rounded border backdrop-blur-xl transition-all duration-300"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: scrolled
            ? "rgba(18,19,18,0.86)"
            : "rgba(18,19,18,0.55)",
          boxShadow: scrolled
            ? "0 12px 40px -20px rgba(0,0,0,0.9), inset 0 0 0 1px var(--color-gold-soft)"
            : "inset 0 0 0 1px var(--color-gold-soft)",
        }}
      >
        <div className="flex h-14 items-center justify-between gap-4 px-4 small:h-16 small:px-6">
          {/* Logo */}
          <LocalizedClientLink
            href="/"
            onClick={() => setOpen(false)}
            className="heading-display flex items-center gap-2 text-lg uppercase tracking-[0.28em] text-[var(--color-text)]"
          >
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-circle"
              style={{ backgroundColor: "var(--color-red)" }}
            />
            РАССВЕТ
          </LocalizedClientLink>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 small:flex">
            {navLinks.map((link) => (
              <LocalizedClientLink
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-text)]"
              >
                {link.label}
              </LocalizedClientLink>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <LocalizedClientLink
              href="/cart"
              className="hidden rounded-base border px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--color-text)] transition-colors duration-200 small:inline-block"
              style={{ borderColor: "var(--color-border)" }}
            >
              Корзина
            </LocalizedClientLink>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label="Меню"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-base border small:hidden"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span className="relative flex h-3 w-4 flex-col justify-between">
                <span
                  className="block h-[2px] w-full transition-transform duration-200"
                  style={{
                    backgroundColor: "var(--color-text)",
                    transform: open ? "translateY(5px) rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="block h-[2px] w-full transition-opacity duration-200"
                  style={{
                    backgroundColor: "var(--color-text)",
                    opacity: open ? 0 : 1,
                  }}
                />
                <span
                  className="block h-[2px] w-full transition-transform duration-200"
                  style={{
                    backgroundColor: "var(--color-text)",
                    transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
                  }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="overflow-hidden transition-[max-height] duration-300 small:hidden"
          style={{ maxHeight: open ? 320 : 0 }}
        >
          <nav
            className="flex flex-col gap-1 border-t px-4 py-3"
            style={{ borderColor: "var(--color-border)" }}
          >
            {navLinks.map((link) => (
              <LocalizedClientLink
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-base px-3 py-2 text-sm uppercase tracking-[0.14em] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-gold-soft)] hover:text-[var(--color-text)]"
              >
                {link.label}
              </LocalizedClientLink>
            ))}
            <LocalizedClientLink
              href="/cart"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-base px-3 py-2 text-sm uppercase tracking-[0.14em] text-[var(--color-text)]"
              style={{ backgroundColor: "var(--color-red-soft)" }}
            >
              Корзина
            </LocalizedClientLink>
          </nav>
        </div>
      </header>
    </div>
  )
}
