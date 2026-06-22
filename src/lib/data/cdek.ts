"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders } from "./cookies"

export type CdekCity = {
  code: number
  city: string
  region?: string
  country?: string
}

export type CdekDeliveryPoint = {
  code: string
  name: string
  address: string
  city: string
  workTime?: string
  phones?: string[]
  location?: {
    latitude: number
    longitude: number
  }
}

export type CdekCalculatePayload = {
  delivery_type: "pickup" | "courier"
  city_code: number
  delivery_point_code?: string
  address?: string
  items?: Array<{
    quantity: number
    weight?: number
    length?: number
    width?: number
    height?: number
  }>
}

export type CdekCalculateResult = {
  price: number
  period_min?: number
  period_max?: number
  tariff_code: number
}

export type CdekShippingMethodData = {
  delivery_type: "pickup" | "courier"
  tariff_code: number
  cdek_city_code: number
  delivery_point_code?: string
  delivery_point_address?: string
  delivery_point_name?: string
  address?: string
  period_min?: number
  period_max?: number
}

export async function searchCdekCities(
  query: string
): Promise<CdekCity[]> {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const response = await sdk.client.fetch<{ cities: CdekCity[] }>(
    `/store/cdek/cities`,
    {
      method: "GET",
      query: { query },
      headers,
      cache: "no-store",
    }
  )

  return response.cities ?? []
}

export async function listCdekDeliveryPoints(
  cityCode: number
): Promise<CdekDeliveryPoint[]> {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const response = await sdk.client.fetch<{
    delivery_points: CdekDeliveryPoint[]
  }>(`/store/cdek/delivery-points`, {
    method: "GET",
    query: { city_code: cityCode },
    headers,
    cache: "no-store",
  })

  return response.delivery_points ?? []
}

export async function calculateCdekDelivery(
  payload: CdekCalculatePayload
): Promise<CdekCalculateResult> {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client.fetch<CdekCalculateResult>(`/store/cdek/calculate`, {
    method: "POST",
    body: payload,
    headers,
    cache: "no-store",
  })
}