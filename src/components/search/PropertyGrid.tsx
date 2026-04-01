import type { Property } from "@/types/property"
import { PropertyCard } from "@/components/property/PropertyCard"

interface PropertyGridProps {
  properties: Property[]
}

const ABOVE_THE_FOLD_PRIORITY_CARDS = 3

export function PropertyGrid({ properties }: PropertyGridProps) {
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
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6"
    >
      {properties.map((property, index) => (
        <PropertyCard
          key={property.slug}
          property={property}
          prioritizeFirstImage={index < ABOVE_THE_FOLD_PRIORITY_CARDS}
        />
      ))}
    </section>
  )
}
