/**
 * Lightweight `cn` helper (clsx-style) for conditional class names.
 * Mirrors the shadcn `cn` API used by the ported CommerCN components, but
 * without pulling in clsx + tailwind-merge.
 */
type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>

function toVal(mix: ClassValue): string {
  let str = ""

  if (typeof mix === "string" || typeof mix === "number") {
    str += mix
  } else if (Array.isArray(mix)) {
    for (const item of mix) {
      const resolved = toVal(item)
      if (resolved) {
        str && (str += " ")
        str += resolved
      }
    }
  } else if (mix && typeof mix === "object") {
    for (const key in mix) {
      if (mix[key]) {
        str && (str += " ")
        str += key
      }
    }
  }

  return str
}

export function cn(...inputs: ClassValue[]): string {
  let str = ""
  for (const input of inputs) {
    const resolved = toVal(input)
    if (resolved) {
      str && (str += " ")
      str += resolved
    }
  }
  return str
}

export default cn
