import type { Property } from "@/types/property"
import { PropertyCard } from "./PropertyCard"

interface SimilarPropertiesProps {
  properties: Property[]
}

export function SimilarProperties({ properties }: SimilarPropertiesProps) {
  if (properties.length === 0) return null

  return (
    <section className="bg-stone-50 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
          Imoveis semelhantes
        </h2>

        {/* Mobile: horizontal scroll carousel */}
        <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide md:hidden">
          {properties.slice(0, 6).map((property) => (
            <div key={property.slug} className="w-[280px] flex-shrink-0 snap-center">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="mt-8 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {properties.slice(0, 4).map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
