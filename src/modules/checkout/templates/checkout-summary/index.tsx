import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-24 flex flex-col-reverse gap-y-8 small:flex-col">
      <div className="card-brand flex w-full flex-col p-6 small:p-8">
        <Heading
          level="h2"
          className="heading-display flex flex-row items-baseline text-xl text-[var(--color-text)]"
        >
          В вашей корзине
        </Heading>
        <Divider className="my-6" />
        <CartTotals totals={cart} />
        <ItemsPreviewTemplate cart={cart} />
        <div className="mt-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
