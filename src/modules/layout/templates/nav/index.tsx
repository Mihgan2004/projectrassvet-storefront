import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

const navLinks = [
  { label: "Каталог", href: "/store" },
  { label: "Коллекции", href: "/store" },
  { label: "О бренде", href: "/about" },
  { label: "Доставка", href: "/shipping" },
]

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 border-b border-ui-border-base bg-[rgba(18,19,18,0.8)] backdrop-blur-xl duration-200">
        <nav className="content-container flex h-full items-center justify-between text-sm text-ui-fg-subtle">
          <div className="flex h-full flex-1 basis-0 items-center">
            <div className="h-full small:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
            <div className="hidden small:flex items-center gap-x-8 h-full">
              {navLinks.map((link) => (
                <LocalizedClientLink
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  className="uppercase tracking-wide transition-colors duration-200 hover:text-ui-fg-base"
                >
                  {link.label}
                </LocalizedClientLink>
              ))}
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="heading-display text-2xl uppercase tracking-[0.2em] text-ui-fg-base"
              data-testid="nav-store-link"
            >
              РАССВЕТ
            </LocalizedClientLink>
          </div>

          <div className="flex flex-1 basis-0 items-center justify-end gap-x-6 h-full">
            <LocalizedClientLink
              className="hidden uppercase tracking-wide transition-colors duration-200 hover:text-ui-fg-base small:inline"
              href="/account"
              data-testid="nav-account-link"
            >
              Аккаунт
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex gap-2 uppercase tracking-wide transition-colors duration-200 hover:text-ui-fg-base"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Корзина (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
