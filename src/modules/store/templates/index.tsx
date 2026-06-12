import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="content-container section-y" data-testid="category-container">
      <div className="mb-12 flex flex-col gap-3 border-b border-ui-border-base pb-8">
        <span className="eyebrow">Каталог</span>
        <h1
          className="heading-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight"
          data-testid="store-page-title"
        >
          Все товары
        </h1>
      </div>
      <div className="flex flex-col gap-y-8 small:flex-row small:items-start small:gap-x-12">
        <RefinementList sortBy={sort} />
        <div className="w-full">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
