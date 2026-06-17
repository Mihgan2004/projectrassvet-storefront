import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heart } from "@modules/common/icons/lucide"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

/**
 * CommerCN "Product Card 01" — adapted to РАССВЕТ (dark palette, Russian),
 * wired to Medusa products. Image + favorite, title, description, price and a
 * call-to-action that opens the product page (variant selection happens there).
 */
export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <div
      className="card-brand group relative flex flex-col overflow-hidden"
      data-testid="product-wrapper"
    >
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className="relative block overflow-hidden"
      >
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
          className="!rounded-none transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-circle border border-[var(--color-border)] bg-[rgba(13,14,13,0.55)] text-[var(--color-text)] backdrop-blur transition-colors hover:text-[var(--color-red)]"
          aria-hidden
        >
          <Heart size={18} />
        </span>
      </LocalizedClientLink>

      <div className="flex flex-1 flex-col p-4">
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <h3
            className="truncate text-base font-medium text-[var(--color-text)]"
            data-testid="product-title"
          >
            {product.title}
          </h3>
        </LocalizedClientLink>

        {product.description && (
          <p
            className="mt-1.5 text-xs leading-relaxed text-[var(--color-muted)]"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between gap-3 pt-1">
          <div className="flex shrink-0 items-center gap-x-2 text-lg font-semibold">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>

          <LocalizedClientLink
            href={`/products/${product.handle}`}
            className="btn-primary !px-4 !py-2 !text-xs"
          >
            В корзину
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
