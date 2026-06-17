import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading } from "@medusajs/ui"

import Item from "@modules/cart/components/item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-baseline justify-between">
        <Heading className="heading-display text-[clamp(1.75rem,3vw,2.25rem)] leading-tight text-[var(--color-text)]">
          Корзина
        </Heading>
        {items?.length ? (
          <span className="text-sm text-[var(--color-muted)]">
            {items.length} поз.
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        {items
          ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency_code}
                  />
                )
              })
          : repeat(3).map((i) => {
              return (
                <div
                  key={i}
                  className="card-brand h-32 w-full animate-pulse bg-[var(--color-bg-elevated)]"
                />
              )
            })}
      </div>
    </div>
  )
}

export default ItemsTemplate
