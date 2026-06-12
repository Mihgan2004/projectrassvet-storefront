import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-full bg-ui-bg-base small:min-h-screen">
      <div className="h-20 border-b border-ui-border-base bg-[rgba(18,19,18,0.8)] backdrop-blur-xl">
        <nav className="content-container flex h-full items-center justify-between">
          <LocalizedClientLink
            href="/cart"
            className="flex flex-1 basis-0 items-center gap-x-2 text-small-semi uppercase text-ui-fg-subtle transition-colors hover:text-ui-fg-base"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden txt-compact-plus small:block">
              Назад в корзину
            </span>
            <span className="mt-px block txt-compact-plus small:hidden">
              Назад
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="heading-display text-xl uppercase tracking-[0.2em] text-ui-fg-base"
            data-testid="store-link"
          >
            РАССВЕТ
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-4 w-full flex items-center justify-center">
        <MedusaCTA />
      </div>
    </div>
  )
}
