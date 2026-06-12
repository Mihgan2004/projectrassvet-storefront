import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Доставка и оплата",
  description: "Условия доставки и оплаты заказов в магазине РАССВЕТ.",
}

const blocks = [
  {
    title: "Доставка",
    items: [
      "Отправка по России и СНГ в течение 1-2 рабочих дней после оплаты.",
      "Доставка в пункт выдачи или курьером до двери за 3-5 рабочих дней.",
      "Трек-номер приходит на email сразу после отправки.",
    ],
  },
  {
    title: "Оплата",
    items: [
      "Онлайн-оплата банковской картой при оформлении заказа.",
      "Все платежи проходят по защищённому соединению.",
      "Чек об оплате отправляется на указанный email.",
    ],
  },
]

export default function ShippingPage() {
  return (
    <div className="content-container section-y">
      <div className="max-w-3xl border-b border-ui-border-base pb-10">
        <span className="eyebrow">Сервис</span>
        <h1 className="heading-display mt-6 text-[clamp(2rem,5vw,3.5rem)] leading-tight">
          Доставка и оплата
        </h1>
        <p className="mt-6 leading-relaxed text-ui-fg-subtle">
          Аккуратно упаковываем каждый заказ и отслеживаем его на всём пути до
          вас.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 small:grid-cols-2">
        {blocks.map((block, idx) => (
          <div
            key={idx}
            className="rounded-base border border-ui-border-base bg-ui-bg-subtle p-8"
          >
            <h2 className="heading-display text-xl">{block.title}</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm leading-relaxed text-ui-fg-subtle">
              {block.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
