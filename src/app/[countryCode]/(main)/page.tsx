import { Metadata } from "next"

import RassvetSmoothScroll from "@modules/home/components/rassvet-smooth-scroll"
import RassvetVideoHero from "@modules/home/components/rassvet-video-hero"
import RassvetArchReveal from "@modules/home/components/rassvet-arch-reveal"
import RassvetZoomPin from "@modules/home/components/rassvet-zoom-pin"
import RassvetCategories from "@modules/home/components/rassvet-categories"

export const metadata: Metadata = {
  title: "РАССВЕТ — тактическая одежда и ограниченные коллекции",
  description:
    "Тактическая эстетика, городская форма и ограниченные коллекции одежды РАССВЕТ.",
}

export default function Home() {
  return (
    <>
      <RassvetSmoothScroll />
      <RassvetVideoHero />
      <RassvetArchReveal />
      <RassvetZoomPin />
      <RassvetCategories />
    </>
  )
}
