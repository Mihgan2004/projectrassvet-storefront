import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-6">
      <Heading className="text-base-semi text-[var(--color-text)]">
        Нужна помощь?
      </Heading>
      <div className="text-base-regular my-2">
        <ul className="flex flex-col gap-y-2">
          <li>
            <LocalizedClientLink href="/contact">Связаться с нами</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact">
              Обмен и возврат
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
