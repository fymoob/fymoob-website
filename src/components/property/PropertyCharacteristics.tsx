import type { Property } from "@/types/property"
import { formatArea, formatPrice } from "@/lib/utils"

interface PropertyCharacteristicsProps {
  property: Property
}

export function PropertyCharacteristics({ property }: PropertyCharacteristicsProps) {
  // Only show data NOT already in Quick Glance (quartos, banheiros, vagas, área privativa)
  const items: { label: string; value: string }[] = []

  items.push({ label: "Tipo de imóvel", value: property.tipo })
  items.push({ label: "Finalidade", value: property.finalidade })

  if (property.areaTotal) {
    items.push({ label: "Área total", value: `${formatArea(property.areaTotal)} m²` })
  }
  if (property.areaPrivativa) {
    items.push({ label: "Área privativa", value: `${formatArea(property.areaPrivativa)} m²` })
  }
  if (property.suites) {
    items.push({ label: "Suítes", value: String(property.suites) })
  }
  if (property.valorCondominio && property.valorCondominio > 0) {
    items.push({ label: "Condomínio", value: formatPrice(property.valorCondominio) })
  }
  if (property.valorIptu && property.valorIptu > 0) {
    items.push({ label: "IPTU", value: formatPrice(property.valorIptu) })
  }
  if (property.anoConstrucao) {
    items.push({ label: "Ano de construção", value: property.anoConstrucao })
  }
  if (property.face) {
    items.push({ label: "Face", value: property.face })
  }
  items.push({ label: "Localização", value: `${property.bairro}, ${property.cidade}` })

  if (property.aceitaFinanciamento) {
    items.push({ label: "Aceita financiamento", value: "Sim" })
  }
  if (property.aceitaPermuta) {
    items.push({ label: "Aceita permuta", value: "Sim" })
  }
  if (property.codigo) {
    items.push({ label: "Código", value: property.codigo })
  }

  if (items.length === 0) return null

  return (
    <section>
      <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950">
        Ficha técnica
      </h2>

      <div className="mt-4">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="flex items-center justify-between border-b border-gray-100 py-3"
          >
            <span className="text-sm text-slate-500">{item.label}</span>
            <span className="text-sm font-medium text-slate-800">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
