import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight } from "@modules/common/icons/lucide"
import { HttpTypes } from "@medusajs/types"

function productCountLabel(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  let word = "товаров"
  if (mod10 === 1 && mod100 !== 11) word = "товар"
  else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
    word = "товара"
  return `${n} ${word}`
}

function categoryImage(category: HttpTypes.StoreProductCategory): string | null {
  const metaImage = (category.metadata?.image ?? category.metadata?.thumbnail) as
    | string
    | undefined
  if (metaImage) return metaImage
  const firstProduct = category.products?.find((p) => p.thumbnail)
  return firstProduct?.thumbnail ?? null
}

/**
 * CommerCN "Category 02" — adapted to РАССВЕТ (dark palette, Russian) and wired
 * to real Medusa product categories. Left featured card + right 2×2 grid of
 * category tiles.
 */
export default async function RassvetCategories() {
  const categories = await listCategories({ limit: 20 }).catch(() => [])

  const topLevel = categories.filter((c) => !c.parent_category)
  const visible = (topLevel.length ? topLevel : categories).slice(0, 4)

  if (!visible.length) {
    return null
  }

  return (
    <section className="content-container section-y">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Featured left card */}
        <div className="card-brand relative flex flex-col justify-between overflow-hidden p-8 small:p-10">
          <div>
            <span className="eyebrow">Каталог</span>
            <h2 className="heading-display mt-5 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">
              Новинки
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">
              Свежие поступления в магазине РАССВЕТ. Ассортимент обновляется
              регулярно.
            </p>
          </div>

          <LocalizedClientLink
            href="/store"
            className="btn-secondary mt-10 w-fit"
          >
            Смотреть все
            <ArrowRight size={16} />
          </LocalizedClientLink>
        </div>

        {/* Right grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
          {visible.map((category) => {
            const image = categoryImage(category)
            const count = category.products?.length ?? 0

            return (
              <LocalizedClientLink
                key={category.id}
                href={`/categories/${category.handle}`}
                className="card-brand group flex items-center gap-4 overflow-hidden p-3"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-soft bg-[var(--color-bg)]">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={category.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[var(--color-faint)]">
                      <span className="text-2xl font-semibold">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-medium text-[var(--color-text)]">
                    {category.name}
                  </h3>
                  {count > 0 && (
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      {productCountLabel(count)}
                    </p>
                  )}
                </div>

                <ArrowRight
                  size={20}
                  className="shrink-0 text-[var(--color-gold)] opacity-0 transition-all duration-200 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </LocalizedClientLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}
