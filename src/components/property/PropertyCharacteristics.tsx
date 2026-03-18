import {
  Bath,
  BedDouble,
  Building2,
  Car,
  Home,
  LucideIcon,
  MapPin,
  Square,
} from "lucide-react"

import type { Property } from "@/types/property"
import { formatArea } from "@/lib/utils"

interface PropertyCharacteristicsProps {
  property: Property
}

interface CharacteristicItem {
  label: string
  value: string | null
  icon: LucideIcon
}

export function PropertyCharacteristics({ property }: PropertyCharacteristicsProps) {
  const characteristics: CharacteristicItem[] = [
    { label: "Tipo", value: property.tipo, icon: Home },
    { label: "Finalidade", value: property.finalidade, icon: Building2 },
    {
      label: "Dormitorios",
      value: property.dormitorios ? String(property.dormitorios) : null,
      icon: BedDouble,
    },
    {
      label: "Banheiros",
      value: property.banheiros ? String(property.banheiros) : null,
      icon: Bath,
    },
    {
      label: "Vagas",
      value: property.vagas ? String(property.vagas) : null,
      icon: Car,
    },
    {
      label: "Area privativa",
      value: property.areaPrivativa ? formatArea(property.areaPrivativa) : null,
      icon: Square,
    },
    {
      label: "Area total",
      value: property.areaTotal ? formatArea(property.areaTotal) : null,
      icon: Square,
    },
    {
      label: "Localizacao",
      value: `${property.bairro}, ${property.cidade}`,
      icon: MapPin,
    },
  ].filter((item) => item.value !== null)

  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-[#0B1120]">
        Caracteristicas
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {characteristics.map((item) => (
          <article
            key={item.label}
            className="rounded-xl border border-neutral-200 bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <item.icon className="mt-0.5 size-4 shrink-0 text-neutral-500" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0B1120]">
                  {item.value}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
