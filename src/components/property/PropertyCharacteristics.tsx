import type { Property } from "@/types/property"
import { getPropertyFeatureIcon } from "@/components/property/propertyFeatureIcons"

interface PropertyCharacteristicsProps {
  property: Property
}

export function PropertyCharacteristics({ property }: PropertyCharacteristicsProps) {
  const details: { label: string; value: string }[] = []

  if (property.face) {
    details.push({ label: "Face", value: property.face })
  }
  if (property.aceitaFinanciamento) {
    details.push({ label: "Financiamento", value: "Aceita" })
  }
  if (property.aceitaPermuta) {
    details.push({ label: "Permuta", value: "Aceita" })
  }
  if (property.garagemTipo) {
    details.push({ label: "Garagem", value: property.garagemTipo })
  }
  if (property.topografia) {
    details.push({ label: "Topografia", value: property.topografia })
  }
  if (property.situacao) {
    details.push({ label: "Situação", value: property.situacao })
  }
  if (property.ocupacao) {
    details.push({ label: "Ocupação", value: property.ocupacao })
  }
  if (property.anoConstrucao) {
    details.push({ label: "Ano de construção", value: property.anoConstrucao })
  }

  if (property.caracteristicas.length === 0 && details.length === 0) return null

  return (
    <section>
      {property.caracteristicas.length > 0 && (
        <>
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
        </>
      )}

      {details.length > 0 && (
        <div className={property.caracteristicas.length > 0 ? "mt-8 border-t border-slate-200 pt-8" : ""}>
          <h3 className="text-base font-semibold text-slate-900">
            Detalhes complementares
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2 xl:grid-cols-3">
            {details.map((item) => (
              <p key={item.label} className="text-sm">
                <span className="text-slate-400">{item.label}: </span>
                <span className="font-medium text-slate-800">{item.value}</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
