export function isCdekShippingOption(option: {
  provider_id?: string | null
  type?: { code?: string | null } | null
}): boolean {
  return (
    option.provider_id === "fp_cdek_cdek" ||
    option.type?.code === "cdek_pickup" ||
    option.type?.code === "cdek_courier"
  )
}

export function getCdekDeliveryTypeFromOption(option: {
  type?: { code?: string | null } | null
  name?: string | null
}): "pickup" | "courier" {
  if (option.type?.code === "cdek_courier") {
    return "courier"
  }

  if (option.name?.toLowerCase().includes("курьер")) {
    return "courier"
  }

  return "pickup"
}

export function formatCdekDeliveryPeriod(
  periodMin?: number,
  periodMax?: number
): string | null {
  if (periodMin !== undefined && periodMax !== undefined) {
    if (periodMin === periodMax) {
      return `${periodMin} дн.`
    }
    return `${periodMin}–${periodMax} дн.`
  }

  if (periodMin !== undefined) {
    return `от ${periodMin} дн.`
  }

  if (periodMax !== undefined) {
    return `до ${periodMax} дн.`
  }

  return null
}
