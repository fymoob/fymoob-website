import type { Property } from "@/types/property"
import { MapPin, Maximize2, BedDouble, Bath, Car } from "lucide-react"
import { PropertyBadge } from "@/components/shared/PropertyBadge"
import { formatArea } from "@/lib/utils"

interface PropertyDetailsProps {
  property: Property
  shortTitle?: string
}

export function PropertyDetails({ property, shortTitle }: PropertyDetailsProps) {
  const specs = [
    { icon: Maximize2, value: property.areaPrivativa ? formatArea(property.areaPrivativa) : null, label: "Área" },
    { icon: BedDouble, value: property.dormitorios, label: property.dormitorios === 1 ? "Quarto" : "Quartos" },
    { icon: Bath, value: property.banheiros, label: property.banheiros === 1 ? "Banheiro" : "Banheiros" },
    { icon: Car, value: property.vagas, label: property.vagas === 1 ? "Vaga" : "Vagas" },
  ].filter((s) => s.value !== null && s.value !== 0)

  return (
    <div className="space-y-3">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <PropertyBadge variant="type">{property.tipo}</PropertyBadge>
        <PropertyBadge variant="sale">{property.finalidade}</PropertyBadge>
        <PropertyBadge variant="code">Cod: {property.codigo}</PropertyBadge>
      </div>

      {/* Title */}
      <h1 className="font-display text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
        {shortTitle || property.titulo}
      </h1>

      {/* Address */}
      {(property.endereco || property.bairro) && (
        <p className="flex items-center gap-1.5 text-sm text-neutral-500">
          <MapPin size={14} className="shrink-0 text-neutral-400" />
          {property.endereco
            ? `${property.endereco}, ${property.bairro}, ${property.cidade} - ${property.estado}`
            : `${property.bairro}, ${property.cidade} - ${property.estado}`}
        </p>
      )}

      {/* Specs bar with separators */}
      {specs.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 md:gap-x-6">
          {specs.map((spec, i) => (
            <div key={spec.label} className="flex items-center gap-4 md:gap-6">
              {i > 0 && <div className="hidden h-4 w-px bg-neutral-300 md:block" />}
              <div className="flex items-center gap-2">
                <spec.icon size={16} className="shrink-0 text-neutral-500" />
                <span className="text-sm font-medium text-neutral-600">
                  {spec.value} {spec.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
