const Manifesto = () => {
  return (
    <section className="relative overflow-hidden border-y border-ui-border-base bg-ui-bg-base">
      <div
        aria-hidden
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(80% 120% at 100% 0%, rgba(173,0,19,0.14) 0%, rgba(18,19,18,0) 55%), radial-gradient(60% 90% at 0% 100%, rgba(166,125,67,0.12) 0%, rgba(18,19,18,0) 60%)",
        }}
      />
      <div className="content-container relative z-10 section-y">
        <div className="max-w-3xl">
          <span className="eyebrow">Манифест</span>
          <p className="heading-display mt-8 text-[clamp(1.75rem,4vw,3rem)] leading-[1.15]">
            Мы делаем форму для тех, кто двигается через город как через
            местность. Без лишнего. Сдержанная палитра, выверенная посадка,
            функция в каждой детали.
          </p>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ui-fg-subtle">
            РАССВЕТ — это дисциплина в крое и характер в материале. Мы не гонимся
            за трендами: мы создаём вещи, которые остаются актуальными дольше
            одного сезона.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Manifesto
