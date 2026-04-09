"use client"

import { useEffect } from "react"

import type { PropertyPageVariant } from "@/types/property"
import { pushAnalyticsEvent } from "@/lib/analytics"

interface PropertyPageAnalyticsProps {
  propertyCode: string
  variant: PropertyPageVariant
  isConsultPrice: boolean
  priceBucket: string
  price: number | null
}

export function PropertyPageAnalytics({
  propertyCode,
  variant,
  isConsultPrice,
  priceBucket,
  price,
}: PropertyPageAnalyticsProps) {
  useEffect(() => {
    const key = `fymoob:pdp-analytics:${propertyCode}:${variant}`
    if (window.sessionStorage.getItem(key)) return

    pushAnalyticsEvent("property_page_view", {
      property_code: propertyCode,
      page_variant: variant,
      is_consult_price: isConsultPrice,
      price_bucket: priceBucket,
      price: isConsultPrice ? null : price,
    })

    window.sessionStorage.setItem(key, "1")
  }, [isConsultPrice, price, priceBucket, propertyCode, variant])

  return null
}
