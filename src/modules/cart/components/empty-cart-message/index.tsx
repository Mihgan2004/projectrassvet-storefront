import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="flex flex-col items-start justify-center px-2 py-48"
      data-testid="empty-cart-message"
    >
      <Heading
        level="h1"
        className="heading-display flex flex-row items-baseline gap-x-2 text-[clamp(2rem,4vw,3rem)] text-[var(--color-text)]"
      >
        Корзина
      </Heading>
      <Text className="mb-6 mt-4 max-w-[32rem] text-base leading-relaxed text-[var(--color-muted)]">
        В корзине пока пусто. Самое время это исправить — перейдите в каталог и
        выберите что-нибудь.
      </Text>
      <div>
        <InteractiveLink href="/store">Перейти в каталог</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
