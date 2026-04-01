"use client"

import { useEffect, useState } from "react"
import type { Property } from "@/types/property"
import { PropertyCard } from "@/components/property/PropertyCard"

interface PropertyGridProps {
  properties: Property[]
}

const ABOVE_THE_FOLD_PRIORITY_CARDS = 3

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)")
    setIsMobile(mql.matches)

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  return isMobile
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  const isMobile = useIsMobile()

  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
        <p className="text-lg text-neutral-500">
          Nenhum imovel encontrado para os filtros atuais.
        </p>
      </div>
    )
  }

  return (
    <section
      aria-live="polite"
      className={
        isMobile
          ? "flex flex-col gap-3"
          : "grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6"
      }
    >
      {properties.map((property, index) => (
        <PropertyCard
          key={property.slug}
          property={property}
          prioritizeFirstImage={index < ABOVE_THE_FOLD_PRIORITY_CARDS}
          variant={isMobile ? "horizontal" : "vertical"}
        />
      ))}
    </section>
  )
}
