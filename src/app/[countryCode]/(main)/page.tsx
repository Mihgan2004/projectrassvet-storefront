import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import CollectionBanner from "@modules/home/components/collection-banner"
import Manifesto from "@modules/home/components/manifesto"
import Advantages from "@modules/home/components/advantages"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "РАССВЕТ — тактическая одежда и ограниченные коллекции",
  description:
    "Тактическая эстетика, городская форма и ограниченные коллекции одежды РАССВЕТ.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />

      <CollectionBanner collection={collections[0]} />

      <section className="content-container section-y">
        <div className="mb-12 flex flex-col gap-3">
          <span className="eyebrow">Избранные товары</span>
          <h2 className="heading-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight">
            Отобрано вручную
          </h2>
        </div>
        <ul className="flex flex-col gap-y-20">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </section>

      <Manifesto />

      <Advantages />
    </>
  )
}
