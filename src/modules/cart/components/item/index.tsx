"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQuantity = item.variant?.manage_inventory ? 10 : 10

  // Compact row used inside the nav cart dropdown (rendered inside <Table>).
  if (type === "preview") {
    return (
      <Table.Row className="w-full" data-testid="product-row">
        <Table.Cell className="!pl-0 p-4 w-16">
          <LocalizedClientLink
            href={`/products/${item.product_handle}`}
            className="flex w-16 overflow-hidden rounded-soft"
          >
            <Thumbnail
              thumbnail={item.thumbnail}
              images={item.variant?.product?.images}
              size="square"
            />
          </LocalizedClientLink>
        </Table.Cell>

        <Table.Cell className="text-left">
          <Text
            className="text-sm font-medium text-[var(--color-text)]"
            data-testid="product-title"
          >
            {item.product_title}
          </Text>
          <LineItemOptions variant={item.variant} data-testid="product-variant" />
        </Table.Cell>

        <Table.Cell className="!pr-0">
          <span className="flex h-full flex-col items-end justify-center">
            <span className="flex gap-x-1 text-[var(--color-muted)]">
              <Text className="text-[var(--color-faint)]">{item.quantity}×</Text>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          </span>
        </Table.Cell>
      </Table.Row>
    )
  }

  // Full card used on the cart page (cart-item-01 style).
  return (
    <div
      className="card-brand flex gap-4 p-3"
      data-testid="product-row"
    >
      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="block w-24 shrink-0 overflow-hidden rounded-soft bg-[var(--color-bg)] small:w-28"
      >
        <Thumbnail
          thumbnail={item.thumbnail}
          images={item.variant?.product?.images}
          size="square"
        />
      </LocalizedClientLink>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <LocalizedClientLink href={`/products/${item.product_handle}`}>
              <Text
                className="truncate text-base font-medium text-[var(--color-text)]"
                data-testid="product-title"
              >
                {item.product_title}
              </Text>
            </LocalizedClientLink>
            <LineItemOptions
              variant={item.variant}
              data-testid="product-variant"
            />
            <div className="mt-1 text-sm text-[var(--color-muted)]">
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </div>
          </div>

          <DeleteButton
            id={item.id}
            className="!justify-end text-[var(--color-faint)] hover:text-[var(--color-red)]"
            data-testid="product-delete-button"
          />
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div
            className="inline-flex items-center rounded-rounded border border-[var(--color-border-strong)]"
            data-testid="product-select-button"
          >
            <button
              type="button"
              onClick={() => changeQuantity(item.quantity - 1)}
              disabled={updating || item.quantity <= 1}
              aria-label="Уменьшить количество"
              className="flex h-9 w-9 items-center justify-center text-lg leading-none text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>
            <span className="w-9 select-none text-center text-sm font-medium text-[var(--color-text)]">
              {updating ? <Spinner /> : item.quantity}
            </span>
            <button
              type="button"
              onClick={() => changeQuantity(item.quantity + 1)}
              disabled={updating || item.quantity >= maxQuantity}
              aria-label="Увеличить количество"
              className="flex h-9 w-9 items-center justify-center text-lg leading-none text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>

          <span className="text-base font-semibold text-[var(--color-text)]">
            <LineItemPrice item={item} style="tight" currencyCode={currencyCode} />
          </span>
        </div>

        <ErrorMessage error={error} data-testid="product-error-message" />
      </div>
    </div>
  )
}

export default Item
