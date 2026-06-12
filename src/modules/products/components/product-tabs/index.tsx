"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Характеристики",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Доставка и возврат",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-ui-fg-base">Материал</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-ui-fg-base">
              Страна производства
            </span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-ui-fg-base">Тип</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-ui-fg-base">Вес</span>
            <p>{product.weight ? `${product.weight} г` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-ui-fg-base">Габариты</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-3">
          <FastDelivery />
          <div>
            <span className="font-semibold text-ui-fg-base">
              Быстрая доставка
            </span>
            <p className="max-w-sm">
              Заказ приедет в пункт выдачи или к двери за 3-5 рабочих дней с
              трекингом на каждом этапе.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <Refresh />
          <div>
            <span className="font-semibold text-ui-fg-base">
              Простой обмен
            </span>
            <p className="max-w-sm">
              Не подошёл размер? Обменяем вещь на нужную без лишних вопросов.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <Back />
          <div>
            <span className="font-semibold text-ui-fg-base">
              Лёгкий возврат
            </span>
            <p className="max-w-sm">
              Верните товар в течение установленного срока — оформим возврат
              средств быстро и без бюрократии.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
