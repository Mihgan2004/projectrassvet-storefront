import { Metadata } from "next"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"
import RassvetCapsuleHeader from "@modules/home/components/rassvet-capsule-header"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import PageTopOffset from "@modules/layout/components/page-top-offset"
import Footer from "@modules/layout/templates/footer"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer()
  const cart = await retrieveCart()
  let shippingOptions: StoreCartShippingOption[] = []

  if (cart) {
    const { shipping_options } = await listCartOptions()

    shippingOptions = shipping_options
  }

  const cartCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0

  return (
    <>
      <RassvetCapsuleHeader cartCount={cartCount} />
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      <PageTopOffset>{props.children}</PageTopOffset>
      <Footer />
    </>
  )
}
