"use client"

import { getYooKassaStatus, YooKassaPaymentStatus } from "@lib/data/yookassa"
import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"

const POLL_INTERVAL_MS = 3000
const MAX_POLLS = 10

type PaymentResultClientProps = {
  cartId?: string
  orderId?: string
}

const statusMessages: Record<string, { title: string; description: string }> = {
  pending: {
    title: "Платёж ожидает подтверждения",
    description:
      "Мы получили ваш платёж и ждём подтверждения от банка. Страница обновится автоматически.",
  },
  succeeded: {
    title: "Заказ оплачен",
    description: "Спасибо! Оплата прошла успешно.",
  },
  canceled: {
    title: "Платёж отменён",
    description:
      "Оплата была отменена или не завершена. Вы можете вернуться в корзину и попробовать снова.",
  },
  waiting_for_capture: {
    title: "Платёж ожидает подтверждения списания",
    description:
      "Средства зарезервированы и ожидают финального подтверждения.",
  },
}

export default function PaymentResultClient({
  cartId,
  orderId,
}: PaymentResultClientProps) {
  const [status, setStatus] = useState<YooKassaPaymentStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [pollCount, setPollCount] = useState(0)

  useEffect(() => {
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | undefined

    const fetchStatus = async () => {
      const result = await getYooKassaStatus({ cartId, orderId })

      if (cancelled) {
        return
      }

      setStatus(result)
      setLoading(false)

      const terminal =
        result?.paid ||
        result?.status === "succeeded" ||
        result?.status === "canceled"

      if (!terminal && pollCount < MAX_POLLS) {
        timer = setTimeout(() => {
          setPollCount((c) => c + 1)
        }, POLL_INTERVAL_MS)
      }
    }

    fetchStatus()

    return () => {
      cancelled = true
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [cartId, orderId, pollCount])

  const currentStatus = status?.status ?? "pending"
  const copy =
    statusMessages[currentStatus] ?? statusMessages.pending

  return (
    <div className="content-container flex flex-col items-center gap-6 py-16 text-center">
      <Heading level="h1" className="heading-display text-2xl text-[var(--color-text)]">
        {loading ? "Проверяем статус оплаты…" : copy.title}
      </Heading>

      {!loading && (
        <Text className="max-w-lg text-[var(--color-text-muted)]">
          {copy.description}
        </Text>
      )}

      {!loading && status?.orderId && status.paid && (
        <LocalizedClientLink href={`/order/${status.orderId}/confirmed`}>
          <Button
            size="large"
            className="!rounded-rounded !border-0 !bg-[var(--color-red)] !text-[var(--color-text)] uppercase tracking-wide hover:!bg-[var(--color-red-hover)]"
          >
            Перейти к заказу
          </Button>
        </LocalizedClientLink>
      )}

      {!loading && currentStatus === "canceled" && (
        <LocalizedClientLink href="/cart">
          <Button
            size="large"
            variant="secondary"
            className="!rounded-rounded uppercase tracking-wide"
          >
            Вернуться в корзину
          </Button>
        </LocalizedClientLink>
      )}

      {!loading && !status && (
        <LocalizedClientLink href="/checkout">
          <Button size="large" variant="secondary">
            Вернуться к оформлению
          </Button>
        </LocalizedClientLink>
      )}
    </div>
  )
}
