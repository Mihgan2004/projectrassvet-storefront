"use client"

import { setShippingMethod } from "@lib/data/cart"
import {
  calculateCdekDelivery,
  CdekCity,
  CdekDeliveryPoint,
  CdekShippingMethodData,
  listCdekDeliveryPoints,
  searchCdekCities,
} from "@lib/data/cdek"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import {
  formatCdekDeliveryPeriod,
  getCdekDeliveryTypeFromOption,
} from "@lib/util/cdek"
import { convertToLocale } from "@lib/util/money"
import { Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { clx, Text } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import Input from "@modules/common/components/input"
import { useCallback, useEffect, useMemo, useState } from "react"

type CdekShippingProps = {
  cart: HttpTypes.StoreCart
  option: HttpTypes.StoreCartShippingOption
  isSelected: boolean
  onSelect: (optionId: string) => void
  onError: (message: string | null) => void
  onLoadingChange: (loading: boolean) => void
}

function formatShippingAddress(address?: HttpTypes.StoreCartAddress | null) {
  if (!address) {
    return ""
  }

  return [address.address_1, address.address_2, address.city, address.postal_code]
    .filter(Boolean)
    .join(", ")
}

const CdekShipping: React.FC<CdekShippingProps> = ({
  cart,
  option,
  isSelected,
  onSelect,
  onError,
  onLoadingChange,
}) => {
  const deliveryType = getCdekDeliveryTypeFromOption(option)

  const [cityQuery, setCityQuery] = useState("")
  const [cityResults, setCityResults] = useState<CdekCity[]>([])
  const [selectedCity, setSelectedCity] = useState<CdekCity | null>(null)
  const [deliveryPoints, setDeliveryPoints] = useState<CdekDeliveryPoint[]>([])
  const [selectedPoint, setSelectedPoint] = useState<CdekDeliveryPoint | null>(
    null
  )
  const [isSearchingCities, setIsSearchingCities] = useState(false)
  const [isLoadingPoints, setIsLoadingPoints] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [quote, setQuote] = useState<{
    price: number
    period_min?: number
    period_max?: number
    tariff_code: number
  } | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  const courierAddress = useMemo(
    () => formatShippingAddress(cart.shipping_address),
    [cart.shipping_address]
  )

  useEffect(() => {
    if (!isSelected) {
      return
    }

    const savedData = cart.shipping_methods?.at(-1)?.data as
      | CdekShippingMethodData
      | undefined

    if (!savedData || savedData.delivery_type !== deliveryType) {
      return
    }

    if (savedData.cdek_city_code && savedData.tariff_code) {
      setQuote({
        price: cart.shipping_methods?.at(-1)?.amount
          ? Number(cart.shipping_methods.at(-1)!.amount) / 100
          : 0,
        period_min: savedData.period_min,
        period_max: savedData.period_max,
        tariff_code: savedData.tariff_code,
      })
    }
  }, [cart.shipping_methods, deliveryType, isSelected])

  useEffect(() => {
    if (!isSelected || cityQuery.trim().length < 2) {
      setCityResults([])
      return
    }

    const timer = setTimeout(async () => {
      setIsSearchingCities(true)
      setLocalError(null)

      try {
        const cities = await searchCdekCities(cityQuery.trim())
        setCityResults(cities)
      } catch {
        setLocalError("Не удалось найти города СДЭК")
      } finally {
        setIsSearchingCities(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [cityQuery, isSelected])

  const applyShipping = useCallback(
    async (city: CdekCity, point?: CdekDeliveryPoint | null) => {
      setLocalError(null)
      onError(null)
      setIsCalculating(true)
      onLoadingChange(true)

      try {
        const address =
          deliveryType === "courier" ? courierAddress : undefined

        if (deliveryType === "courier" && !address) {
          throw new Error("Укажите адрес доставки на предыдущем шаге")
        }

        if (deliveryType === "pickup" && !point) {
          throw new Error("Выберите пункт выдачи СДЭК")
        }

        const calculation = await calculateCdekDelivery({
          delivery_type: deliveryType,
          city_code: city.code,
          delivery_point_code: point?.code,
          address,
        })

        setQuote(calculation)

        const shippingData: CdekShippingMethodData = {
          delivery_type: deliveryType,
          tariff_code: calculation.tariff_code,
          cdek_city_code: city.code,
          period_min: calculation.period_min,
          period_max: calculation.period_max,
          delivery_point_code: point?.code,
          delivery_point_address: point?.address,
          delivery_point_name: point?.name,
          address,
        }

        onSelect(option.id)

        await setShippingMethod({
          cartId: cart.id,
          shippingMethodId: option.id,
          data: shippingData,
        })

        await calculatePriceForShippingOption(option.id, cart.id, shippingData)
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Не удалось рассчитать доставку СДЭК"
        setLocalError(message)
        onError(message)
      } finally {
        setIsCalculating(false)
        onLoadingChange(false)
      }
    },
    [
      cart.id,
      cart.shipping_address,
      courierAddress,
      deliveryType,
      onError,
      onLoadingChange,
      onSelect,
      option.id,
    ]
  )

  const handleCitySelect = async (city: CdekCity) => {
    setSelectedCity(city)
    setCityQuery(city.city)
    setCityResults([])
    setSelectedPoint(null)
    setQuote(null)

    if (deliveryType === "pickup") {
      setIsLoadingPoints(true)
      setLocalError(null)

      try {
        const points = await listCdekDeliveryPoints(city.code)
        setDeliveryPoints(points)

        if (!points.length) {
          setLocalError("В выбранном городе нет пунктов выдачи СДЭК")
        }
      } catch {
        setLocalError("Не удалось загрузить пункты выдачи СДЭК")
      } finally {
        setIsLoadingPoints(false)
      }
    } else if (courierAddress) {
      await applyShipping(city)
    } else {
      setLocalError("Укажите адрес доставки на предыдущем шаге")
    }
  }

  const handlePointSelect = async (point: CdekDeliveryPoint) => {
    if (!selectedCity) {
      return
    }

    setSelectedPoint(point)
    await applyShipping(selectedCity, point)
  }

  if (!isSelected) {
    return null
  }

  return (
    <div className="mb-6 rounded-rounded border border-ui-border-base p-4">
      <Text className="txt-medium-plus text-ui-fg-base mb-4">
        Настройка доставки СДЭК
      </Text>

      <div className="flex flex-col gap-y-4">
        <div>
          <Input
            label="Город"
            name="cdek_city"
            value={cityQuery}
            onChange={(e) => setCityQuery(e.target.value)}
            autoComplete="off"
            data-testid="cdek-city-search"
          />
          {isSearchingCities && (
            <div className="mt-2 flex items-center gap-x-2 text-ui-fg-muted">
              <Loader />
              <span className="text-small-regular">Поиск городов...</span>
            </div>
          )}
          {cityResults.length > 0 && (
            <ul className="mt-2 max-h-48 overflow-y-auto rounded-rounded border border-ui-border-base">
              {cityResults.map((city) => (
                <li key={city.code}>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left text-small-regular hover:bg-ui-bg-subtle"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.city}
                    {city.region ? `, ${city.region}` : ""}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {deliveryType === "pickup" && selectedCity && (
          <div>
            <Text className="txt-medium text-ui-fg-base mb-2">
              Пункт выдачи
            </Text>
            {isLoadingPoints ? (
              <div className="flex items-center gap-x-2 text-ui-fg-muted">
                <Loader />
                <span className="text-small-regular">Загрузка ПВЗ...</span>
              </div>
            ) : (
              <ul className="max-h-64 overflow-y-auto rounded-rounded border border-ui-border-base">
                {deliveryPoints.map((point) => (
                  <li key={point.code}>
                    <button
                      type="button"
                      className={clx(
                        "w-full px-4 py-3 text-left hover:bg-ui-bg-subtle",
                        {
                          "bg-ui-bg-subtle": selectedPoint?.code === point.code,
                        }
                      )}
                      onClick={() => handlePointSelect(point)}
                      disabled={isCalculating}
                    >
                      <div className="text-small-regular font-medium">
                        {point.name}
                      </div>
                      <div className="text-small-regular text-ui-fg-muted">
                        {point.address}
                      </div>
                      {point.workTime && (
                        <div className="text-small-regular text-ui-fg-muted">
                          {point.workTime}
                        </div>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {deliveryType === "courier" && selectedCity && courierAddress && (
          <Text className="text-small-regular text-ui-fg-subtle">
            Адрес доставки: {courierAddress}
          </Text>
        )}

        {quote && (
          <div className="rounded-rounded bg-ui-bg-subtle px-4 py-3">
            <Text className="text-small-regular text-ui-fg-base">
              Стоимость:{" "}
              {convertToLocale({
                amount: Math.round(quote.price * 100),
                currency_code: cart.currency_code,
              })}
            </Text>
            {formatCdekDeliveryPeriod(quote.period_min, quote.period_max) && (
              <Text className="text-small-regular text-ui-fg-subtle">
                Срок:{" "}
                {formatCdekDeliveryPeriod(quote.period_min, quote.period_max)}
              </Text>
            )}
          </div>
        )}

        {isCalculating && (
          <div className="flex items-center gap-x-2 text-ui-fg-muted">
            <Loader />
            <span className="text-small-regular">Расчёт доставки...</span>
          </div>
        )}

        <ErrorMessage error={localError} data-testid="cdek-shipping-error" />
      </div>
    </div>
  )
}

export default CdekShipping
