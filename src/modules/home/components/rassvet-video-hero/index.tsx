import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { widePlaceholder } from "../_lib/placeholders"

/**
 * Premium video hero. Uses a native <video> (autoplay/muted/loop/playsInline)
 * with a brand gradient poster fallback so it degrades gracefully when the
 * media file is not present yet. A darkening overlay keeps text legible.
 *
 * TODO (content): drop a real clip at /public/rassvet-hero.mp4 (+ .webm) to
 * replace the placeholder background.
 */
export default function RassvetVideoHero() {
  const poster = widePlaceholder("РАССВЕТ", "red")

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[var(--color-bg)]">
      {/* Video / fallback background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src="/rassvet-hero.webm" type="video/webm" />
        <source src="/rassvet-hero.mp4" type="video/mp4" />
      </video>

      {/* Darkening + brand overlays */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,14,13,0.55) 0%, rgba(18,19,18,0.35) 40%, rgba(11,12,11,0.92) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #f3ead7 0px, #f3ead7 1px, transparent 1px, transparent 90px)",
        }}
      />

      {/* Content */}
      <div className="content-container relative z-10 flex h-full flex-col justify-end pb-20 small:pb-28">
        <div className="max-w-3xl">
          <span className="eyebrow">Limited tactical wear</span>
          <h1 className="heading-display mt-5 text-[clamp(3rem,11vw,9rem)] leading-[0.9] tracking-tight">
            РАССВЕТ
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted)] small:text-lg">
            Тактическая эстетика. Городская форма. Ограниченные коллекции.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <LocalizedClientLink href="/store" className="btn-primary">
              Перейти в каталог
            </LocalizedClientLink>
            <LocalizedClientLink href="/store" className="btn-secondary">
              Смотреть коллекции
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* Bottom seam to blend into next section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ backgroundColor: "var(--color-border)" }}
      />
    </section>
  )
}
