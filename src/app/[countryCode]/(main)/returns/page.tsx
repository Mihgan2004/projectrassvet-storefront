import { Metadata } from "next"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Возврат и обмен",
  description: "Условия возврата и обмена товаров в магазине РАССВЕТ.",
}

const steps = [
  {
    title: "Оформите заявку",
    text: "Свяжитесь с нами и укажите номер заказа и причину возврата.",
  },
  {
    title: "Упакуйте товар",
    text: "Верните вещь в сохранном виде с биркой и оригинальной упаковкой.",
  },
  {
    title: "Получите возврат",
    text: "После проверки оформим возврат средств тем же способом оплаты.",
  },
]

export default function ReturnsPage() {
  return (
    <div className="content-container section-y">
      <div className="max-w-3xl border-b border-ui-border-base pb-10">
        <span className="eyebrow">Сервис</span>
        <h1 className="heading-display mt-6 text-[clamp(2rem,5vw,3.5rem)] leading-tight">
          Возврат и обмен
        </h1>
        <p className="mt-6 leading-relaxed text-ui-fg-subtle">
          Не подошёл размер или передумали? Вернуть или обменять товар можно в
          установленный законом срок — без лишней бюрократии.
        </p>
      </div>

      <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-base border border-ui-border-base bg-ui-border-base sm:grid-cols-3">
        {steps.map((step, idx) => (
          <li key={idx} className="flex flex-col gap-3 bg-ui-bg-base p-8">
            <span className="text-sm font-semibold text-[var(--color-gold)]">
              Шаг {idx + 1}
            </span>
            <h2 className="heading-display text-xl">{step.title}</h2>
            <p className="text-sm leading-relaxed text-ui-fg-subtle">
              {step.text}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-16">
        <LocalizedClientLink href="/store" className="btn-secondary">
          Вернуться в каталог
        </LocalizedClientLink>
      </div>
    </div>
  )
}
