import * as React from "react"

/**
 * Inline lucide-style icons (24×24, stroke 2, round caps).
 * Used by the ported CommerCN components instead of the lucide-react package
 * to avoid an extra runtime dependency. Paths mirror lucide-icons 1:1.
 */
type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string
}

function Base({
  size = 24,
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const ArrowRight = (props: IconProps) => (
  <Base {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Base>
)

export const ChevronLeft = (props: IconProps) => (
  <Base {...props}>
    <path d="m15 18-6-6 6-6" />
  </Base>
)

export const ChevronRight = (props: IconProps) => (
  <Base {...props}>
    <path d="m9 18 6-6-6-6" />
  </Base>
)

export const Minus = (props: IconProps) => (
  <Base {...props}>
    <path d="M5 12h14" />
  </Base>
)

export const Plus = (props: IconProps) => (
  <Base {...props}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </Base>
)

export const Star = (props: IconProps) => (
  <Base {...props}>
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </Base>
)

export const Trash2 = (props: IconProps) => (
  <Base {...props}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </Base>
)

export const Bookmark = (props: IconProps) => (
  <Base {...props}>
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </Base>
)

export const Heart = (props: IconProps) => (
  <Base {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </Base>
)
