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
        Área privativa
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 xl:grid-cols-3">
        {property.caracteristicas.map((item) => {
          const Icon = getPropertyFeatureIcon(item)

          return (
            <div key={item} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" strokeWidth={1.9} />
              <span className="text-sm text-neutral-700">{item}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
