import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

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
    <html lang="ru" className="dark" data-mode="dark">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
