import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const CollectionBanner = ({
  collection,
}: {
  collection?: HttpTypes.StoreCollection
}) => {
  const href = collection ? `/collections/${collection.handle}` : "/store"
  const title = collection?.title ?? "Новая коллекция"

  return (
    <section className="content-container section-y">
      <div className="relative overflow-hidden rounded-base border border-ui-border-base bg-ui-bg-subtle">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(173,0,19,0.16) 0%, rgba(18,19,18,0) 45%), radial-gradient(90% 140% at 100% 0%, rgba(166,125,67,0.18) 0%, rgba(18,19,18,0) 60%)",
          }}
        />
        <div className="relative z-10 flex flex-col gap-8 p-10 small:flex-row small:items-end small:justify-between small:p-16">
          <div className="max-w-xl">
            <span className="eyebrow">Новая коллекция</span>
            <h2 className="heading-display mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]">
              {title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ui-fg-subtle">
              Первая партия сезона уже в каталоге. Ограниченный тираж — пока есть
              в наличии.
            </p>
          </div>
          <LocalizedClientLink href={href} className="btn-secondary shrink-0">
            Смотреть коллекцию
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default CollectionBanner
