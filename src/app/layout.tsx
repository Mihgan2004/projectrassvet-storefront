import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import "styles/globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "РАССВЕТ",
    template: "%s | РАССВЕТ",
  },
  description:
    "РАССВЕТ — тактическая эстетика, городская форма и ограниченные коллекции одежды.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      className={`dark ${inter.variable} ${manrope.variable}`}
      data-mode="dark"
    >
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
