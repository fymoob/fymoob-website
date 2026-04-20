import type { Property } from "@/types/property"

/**
 * Servico de taxonomia dinamica — lista de caracteristicas e infra
 * agregadas a partir de todos imoveis ativos, com contagem de ocorrencia
 * pra ranking na UI (feature mais comum primeiro).
 *
 * Zero hardcode de taxonomia: tudo deriva do que a API Loft/Vista retorna
 * nos objects Caracteristicas + InfraEstrutura. Bruno adiciona campo novo
 * no CRM → aparece automaticamente nos filtros em ate 1h (TTL cache).
 */

export interface CaracteristicaOption {
  /** Label humano-legivel pra exibir na UI (ja passou por humanizeCaracLabel) */
  label: string
  /** Quantidade de imoveis ativos que tem esta caracteristica */
  count: number
  /** Grupo heuristico: "unidade" (dentro do imovel) ou "condominio" (area comum) */
  group: "unidade" | "condominio"
}

/**
 * Heuristica simples pra decidir se uma caracteristica pertence a unidade
 * (propriedades do imovel em si) ou ao condominio (areas comuns/infra).
 *
 * Se o label contem keywords de area coletiva, agrupa em "condominio".
 * Senao, assume "unidade". A Loft API ja separa em `Caracteristicas` vs
 * `InfraEstrutura`, mas aqui a gente mantem a distincao no nivel do
 * campo pra quando o servico for chamado com array mixto.
 */
const CONDOMINIO_KEYWORDS = [
  "coletiv", "condom", "portaria", "salão", "salao", "playground",
  "elevador", "guarita", "sauna", "spa", "academia", "fitness",
  "brinquedoteca", "bicicletario", "bicicletário", "coworking",
  "deposito", "depósito", "heliponto", "pilotis", "parque",
  "quadra", "quiosque", "gerador", "vigilancia", "vigilância",
  "seguranca", "segurança", "zelador", "interfone", "porteiro",
  "pet place", "terraco coletivo", "terraço coletivo",
]

function inferGroup(label: string): "unidade" | "condominio" {
  const lower = label.toLowerCase()
  if (CONDOMINIO_KEYWORDS.some((kw) => lower.includes(kw))) return "condominio"
  return "unidade"
}

/**
 * Agrega caracteristicas/infra de uma lista de imoveis em opcoes de filtro
 * ordenadas por frequencia. Top features aparecem primeiro na UI.
 *
 * Separacao `group` vem de 2 fontes:
 * 1. Source do array: Property.caracteristicas (unidade) vs .infraestrutura (condominio)
 * 2. Override heuristico via inferGroup pra casos de borda
 */
export function aggregateCaracteristicas(properties: Property[]): CaracteristicaOption[] {
  const counts = new Map<string, { count: number; group: "unidade" | "condominio" }>()

  for (const p of properties) {
    for (const carac of p.caracteristicas ?? []) {
      const existing = counts.get(carac)
      if (existing) existing.count++
      else counts.set(carac, { count: 1, group: inferGroup(carac) })
    }
    for (const infra of p.infraestrutura ?? []) {
      const existing = counts.get(infra)
      if (existing) existing.count++
      else counts.set(infra, { count: 1, group: "condominio" })
    }
  }

  return Array.from(counts.entries())
    .map(([label, { count, group }]) => ({ label, count, group }))
    .sort((a, b) => b.count - a.count)
}
