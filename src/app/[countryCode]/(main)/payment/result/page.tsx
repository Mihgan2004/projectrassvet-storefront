import PaymentResultClient from "@modules/checkout/components/payment-result"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Результат оплаты",
  description: "Статус оплаты заказа",
}

type Props = {
  searchParams: Promise<{ cart_id?: string; order_id?: string }>
}

export default async function PaymentResultPage(props: Props) {
  const searchParams = await props.searchParams

  return (
    <PaymentResultClient
      cartId={searchParams.cart_id}
      orderId={searchParams.order_id}
    />
  )
}
