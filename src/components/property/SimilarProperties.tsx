import type { Property } from "@/types/property"
import { PropertyCard } from "./PropertyCard"
import { HomeCarousel } from "@/components/home/HomeCarousel"

interface SimilarPropertiesProps {
  properties: Property[]
}

export function SimilarProperties({ properties }: SimilarPropertiesProps) {
  if (properties.length === 0) return null

  const items = properties.slice(0, 8)

  return (
    <section className="bg-stone-50 py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950 md:text-2xl">
          Imóveis semelhantes
        </h2>
        {/* Mobile: Netflix carousel */}
        <div className="mt-5 md:hidden">
          <HomeCarousel properties={items} autoPlay={false} fadeFrom="from-stone-50" />
        </div>
        {/* Desktop: grid */}
        <div className="mt-6 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 4).map((property) => (
            <PropertyCard key={property.slug} property={property} compactFeatures />
          ))}
        </div>
      </div>
    </section>
  )
}
