import { Metadata } from "next"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "О бренде",
  description:
    "РАССВЕТ — тактическая эстетика, городская форма и ограниченные коллекции одежды.",
}

const values = [
  {
    title: "Крой",
    text: "Выверенная посадка и анатомичные лекала. Каждая вещь садится так, как задумано.",
  },
  {
    title: "Материалы",
    text: "Плотные ткани и фурнитура, рассчитанные на ежедневную носку в городе.",
  },
  {
    title: "Тираж",
    text: "Малые партии без переизданий. Вещь остаётся редкой и узнаваемой.",
  },
]

export default function AboutPage() {
  return (
    <div className="content-container section-y">
      <div className="max-w-3xl">
        <span className="eyebrow">О бренде</span>
        <h1 className="heading-display mt-6 text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02]">
          РАССВЕТ
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-ui-fg-subtle">
          Мы делаем форму для тех, кто двигается через город как через
          местность. Тактическая эстетика без театральности: сдержанная палитра,
          функциональные детали и геометрия, проверенная на практике.
        </p>
        <p className="mt-6 max-w-2xl leading-relaxed text-ui-fg-subtle">
          РАССВЕТ — это дисциплина в крое и характер в материале. Мы не гонимся
          за трендами и выпускаем ограниченные коллекции, которые остаются
          актуальными дольше одного сезона.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-base border border-ui-border-base bg-ui-border-base sm:grid-cols-3">
        {values.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-3 bg-ui-bg-base p-8">
            <span className="text-sm font-semibold text-[var(--color-gold)]">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <h2 className="heading-display text-xl">{item.title}</h2>
            <p className="text-sm leading-relaxed text-ui-fg-subtle">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col gap-4 sm:flex-row">
        <LocalizedClientLink href="/store" className="btn-primary">
          Перейти в каталог
        </LocalizedClientLink>
        <LocalizedClientLink href="/shipping" className="btn-secondary">
          Доставка и оплата
        </LocalizedClientLink>
      </div>
    </div>
  )
}
