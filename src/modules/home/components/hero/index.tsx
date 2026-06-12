import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden border-b border-ui-border-base bg-ui-bg-base">
      {/* Atmospheric layered background */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 0%, rgba(166,125,67,0.18) 0%, rgba(18,19,18,0) 55%), radial-gradient(90% 70% at 15% 100%, rgba(173,0,19,0.20) 0%, rgba(18,19,18,0) 50%), linear-gradient(180deg, #0d0e0d 0%, #121312 55%, #0e0f0e 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #f3ead7 0px, #f3ead7 1px, transparent 1px, transparent 80px)",
        }}
      />

      <div className="content-container relative z-10 flex min-h-[78vh] flex-col justify-center py-24 small:py-32">
        <div className="max-w-3xl">
          <span className="eyebrow">Limited tactical wear</span>

          <h1 className="heading-display mt-6 text-[clamp(3.5rem,11vw,9rem)] leading-[0.92] tracking-tight">
            РАССВЕТ
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ui-fg-subtle small:text-xl">
            Тактическая эстетика. Городская форма. Ограниченные коллекции.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <LocalizedClientLink href="/store" className="btn-primary">
              Перейти в каталог
            </LocalizedClientLink>
            <LocalizedClientLink href="/about" className="btn-secondary">
              О бренде
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
