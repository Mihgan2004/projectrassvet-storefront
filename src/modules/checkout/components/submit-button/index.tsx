"use client"

import { Button, clx } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  const brand =
    variant === "primary"
      ? "!rounded-rounded !border-0 !bg-[var(--color-red)] !text-[var(--color-text)] uppercase tracking-wide hover:!bg-[var(--color-red-hover)]"
      : variant === "secondary"
      ? "!rounded-rounded !border-[var(--color-border-strong)] !bg-transparent !text-[var(--color-text)] hover:!bg-[var(--color-gold-soft)]"
      : ""

  return (
    <Button
      size="large"
      className={clx(brand, className)}
      type="submit"
      isLoading={pending}
      variant={variant || "primary"}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  )
}
