import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return
    }

    return convertToLocale({
      amount,
      currency_code: order.currency_code,
    })
  }

  return (
    <div>
      <h2 className="text-base-semi text-[var(--color-text)]">Итог заказа</h2>
      <div className="my-2 text-small-regular text-ui-fg-base">
        <div className="mb-2 flex items-center justify-between text-base-regular text-ui-fg-base">
          <span>Сумма</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {order.discount_total > 0 && (
            <div className="flex items-center justify-between">
              <span>Скидка</span>
              <span>- {getAmount(order.discount_total)}</span>
            </div>
          )}
          {order.gift_card_total > 0 && (
            <div className="flex items-center justify-between">
              <span>Подарочная карта</span>
              <span>- {getAmount(order.gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>Доставка</span>
            <span>{getAmount(order.shipping_total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Налоги</span>
            <span>{getAmount(order.tax_total)}</span>
          </div>
        </div>
        <div className="my-4 h-px w-full border-b border-dashed border-[var(--color-border)]" />
        <div className="mb-2 flex items-center justify-between text-base-regular text-ui-fg-base">
          <span>Итого</span>
          <span>{getAmount(order.total)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
