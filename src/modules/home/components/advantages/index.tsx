const advantages = [
  {
    title: "Качество",
    text: "Плотные ткани, усиленные швы и фурнитура, рассчитанная на ежедневную носку.",
  },
  {
    title: "Ограниченные партии",
    text: "Каждая коллекция выпускается малым тиражом. Без переизданий и масс-маркета.",
  },
  {
    title: "Доставка",
    text: "Отправляем по России и СНГ. Аккуратная упаковка и трекинг на каждом этапе.",
  },
  {
    title: "Оплата",
    text: "Удобные способы оплаты онлайн. Безопасно и без скрытых комиссий.",
  },
]

const Advantages = () => {
  return (
    <section className="content-container section-y">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-base border border-ui-border-base bg-ui-border-base sm:grid-cols-2 large:grid-cols-4">
        {advantages.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-3 bg-ui-bg-base p-8"
          >
            <span className="text-sm font-semibold text-[var(--color-gold)]">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="heading-display text-xl">{item.title}</h3>
            <p className="text-sm leading-relaxed text-ui-fg-subtle">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Advantages
