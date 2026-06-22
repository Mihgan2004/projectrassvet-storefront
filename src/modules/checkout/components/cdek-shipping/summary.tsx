import { CdekShippingMethodData } from "@lib/data/cdek"
import { formatCdekDeliveryPeriod } from "@lib/util/cdek"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type CdekShippingSummaryProps = {
  cart: HttpTypes.StoreCart
  shippingMethod?: HttpTypes.StoreCartShippingMethod
}

export function CdekShippingSummary({
  cart,
  shippingMethod,
}: CdekShippingSummaryProps) {
  const method = shippingMethod ?? cart.shipping_methods?.at(-1)
  const data = method?.data as CdekShippingMethodData | undefined

  if (!data?.delivery_type) {
    return null
  }

  const title =
    data.delivery_type === "pickup" ? "СДЭК ПВЗ" : "СДЭК курьером"

  const period = formatCdekDeliveryPeriod(data.period_min, data.period_max)
  const amount = method?.amount ?? cart.shipping_methods?.at(-1)?.amount

  return (
    <div className="flex flex-col gap-y-1">
      <Text className="txt-medium-plus text-ui-fg-base">{title}</Text>
      {data.delivery_type === "pickup" ? (
        <Text className="txt-medium text-ui-fg-subtle">
          ПВЗ: {data.delivery_point_address ?? data.delivery_point_name ?? "—"}
        </Text>
      ) : (
        <Text className="txt-medium text-ui-fg-subtle">
          Адрес: {data.address ?? "—"}
        </Text>
      )}
      {period && (
        <Text className="txt-medium text-ui-fg-subtle">Срок: {period}</Text>
      )}
      {amount !== undefined && amount !== null && (
        <Text className="txt-medium text-ui-fg-subtle">
          Стоимость:{" "}
          {convertToLocale({
            amount,
            currency_code: cart.currency_code,
          })}
        </Text>
      )}
    </div>
  )
}
