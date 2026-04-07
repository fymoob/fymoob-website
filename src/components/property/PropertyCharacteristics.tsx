import type { Property } from "@/types/property"
import { formatArea, formatPrice } from "@/lib/utils"

interface PropertyCharacteristicsProps {
  property: Property
}

export function PropertyCharacteristics({ property }: PropertyCharacteristicsProps) {
  // Exclude items already shown in Quick Glance (quartos, banheiros, vagas, área privativa)
  const items: { label: string; value: string }[] = []

  items.push({ label: "Tipo", value: property.tipo })
  items.push({ label: "Finalidade", value: property.finalidade })

  if (property.suites) {
    items.push({ label: "Suítes", value: String(property.suites) })
  }
  if (property.areaTotal) {
    items.push({ label: "Área total", value: `${formatArea(property.areaTotal)} m²` })
  }
  if (property.valorCondominio && property.valorCondominio > 0) {
    items.push({ label: "Condomínio", value: `${formatPrice(property.valorCondominio)}/mês` })
  }
  if (property.valorIptu && property.valorIptu > 0) {
    items.push({ label: "IPTU", value: `${formatPrice(property.valorIptu)}/ano` })
  }
  if (property.anoConstrucao && property.anoConstrucao !== "0") {
    items.push({ label: "Ano", value: property.anoConstrucao })
  }
  if (property.face) {
    items.push({ label: "Face", value: property.face })
  }
  if (property.aceitaFinanciamento) {
    items.push({ label: "Financiamento", value: "Aceita" })
  }
  if (property.aceitaPermuta) {
    items.push({ label: "Permuta", value: "Aceita" })
  }

  if (items.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3">
      {items.map((item) => (
        <p key={item.label} className="text-sm">
          <span className="text-slate-400">{item.label}: </span>
          <span className="font-medium text-slate-800">{item.value}</span>
        </p>
      ))}
    </div>
  )
}
