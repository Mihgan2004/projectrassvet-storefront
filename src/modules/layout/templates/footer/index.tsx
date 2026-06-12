import { listCategories } from "@lib/data/categories"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const productCategories = await listCategories()

  return (
    <footer className="w-full border-t border-ui-border-base bg-ui-bg-base">
      <div className="content-container flex w-full flex-col">
        <div className="flex flex-col gap-y-12 py-16 small:flex-row small:justify-between small:py-24">
          <div className="flex max-w-sm flex-col gap-y-5">
            <LocalizedClientLink
              href="/"
              className="heading-display text-2xl uppercase tracking-[0.2em] text-ui-fg-base"
            >
              РАССВЕТ
            </LocalizedClientLink>
            <Text className="text-sm leading-relaxed text-ui-fg-subtle">
              Тактическая эстетика и городская форма. Ограниченные коллекции для
              тех, кто двигается через город как через местность.
            </Text>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm small:grid-cols-3 md:gap-x-16">
            <div className="flex flex-col gap-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-ui-fg-interactive">
                Магазин
              </span>
              <ul className="flex flex-col gap-y-2 text-ui-fg-subtle">
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="transition-colors hover:text-ui-fg-base"
                  >
                    Каталог
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="transition-colors hover:text-ui-fg-base"
                  >
                    Коллекции
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/about"
                    className="transition-colors hover:text-ui-fg-base"
                  >
                    О бренде
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {productCategories && productCategories.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-ui-fg-interactive">
                  Категории
                </span>
                <ul
                  className="grid grid-cols-1 gap-2 text-ui-fg-subtle"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "transition-colors hover:text-ui-fg-base",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="ml-3 grid grid-cols-1 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="transition-colors hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-ui-fg-interactive">
                Сервис
              </span>
              <ul className="flex flex-col gap-y-2 text-ui-fg-subtle">
                <li>
                  <LocalizedClientLink
                    href="/shipping"
                    className="transition-colors hover:text-ui-fg-base"
                  >
                    Доставка и оплата
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/returns"
                    className="transition-colors hover:text-ui-fg-base"
                  >
                    Возврат
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="transition-colors hover:text-ui-fg-base"
                  >
                    Аккаунт
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-ui-fg-interactive">
                Контакты
              </span>
              <ul className="flex flex-col gap-y-2 text-ui-fg-subtle">
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-[var(--color-red)]"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-[var(--color-red)]"
                  >
                    VK
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@rassvet.example"
                    className="transition-colors hover:text-[var(--color-red)]"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-y-3 border-t border-ui-border-base py-8 text-ui-fg-muted small:flex-row small:items-center small:justify-between">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} РАССВЕТ. Все права защищены.
          </Text>
          <Text className="txt-compact-small uppercase tracking-[0.2em]">
            Тактическая эстетика · Городская форма
          </Text>
        </div>
      </div>
    </footer>
  )
}
