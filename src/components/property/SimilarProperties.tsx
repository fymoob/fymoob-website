import type { Property } from "@/types/property"
import { PropertyCard } from "./PropertyCard"

interface SimilarPropertiesProps {
  properties: Property[]
}

export function SimilarProperties({ properties }: SimilarPropertiesProps) {
  if (properties.length === 0) return null

  return (
    <section className="bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
          Imoveis semelhantes
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {properties.slice(0, 4).map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
