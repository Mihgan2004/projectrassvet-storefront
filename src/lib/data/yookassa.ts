"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders } from "./cookies"

export type YooKassaPaymentStatus = {
  orderId?: string
  paymentId?: string
  status: "pending" | "succeeded" | "canceled" | "waiting_for_capture" | string
  paid: boolean
  confirmationUrl?: string
}

export async function getYooKassaStatus(params: {
  cartId?: string
  orderId?: string
}): Promise<YooKassaPaymentStatus | null> {
  const { cartId, orderId } = params

  if (!cartId && !orderId) {
    return null
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const query: Record<string, string> = {}

  if (cartId) {
    query.cart_id = cartId
  }

  if (orderId) {
    query.order_id = orderId
  }

  return sdk.client
    .fetch<YooKassaPaymentStatus>("/store/yookassa/status", {
      method: "GET",
      query,
      headers,
      cache: "no-store",
    })
    .catch(() => null)
}
