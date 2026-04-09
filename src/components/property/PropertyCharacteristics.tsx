import type { Property } from "@/types/property"
import { getPropertyFeatureIcon } from "@/components/property/propertyFeatureIcons"

interface PropertyCharacteristicsProps {
  property: Property
}

export function PropertyCharacteristics({ property }: PropertyCharacteristicsProps) {
  if (property.caracteristicas.length === 0) return null

  return (
    <section>
      <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950">
        Características da unidade
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
        {property.caracteristicas.map((item) => {
          const Icon = getPropertyFeatureIcon(item)

          return (
            <div key={item} className="flex items-center gap-3">
              <Icon className="h-6 w-6 shrink-0 text-neutral-600" strokeWidth={1.9} />
              <span className="text-sm text-neutral-700">{item}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
