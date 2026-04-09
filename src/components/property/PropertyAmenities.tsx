import { Building2 } from "lucide-react"

import { getPropertyFeatureIcon } from "@/components/property/propertyFeatureIcons"

interface PropertyAmenitiesProps {
  infraestrutura: string[]
}

export function PropertyAmenities({ infraestrutura }: PropertyAmenitiesProps) {
  if (infraestrutura.length === 0) return null

  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
          <Building2 className="size-5" strokeWidth={2} />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950">
            Infraestrutura do condomínio
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Itens cadastrados no CRM para a área comum e estrutura do empreendimento.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
        {infraestrutura.map((item) => {
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
