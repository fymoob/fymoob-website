/**
 * Remove redundant features when a more specific version exists.
 * e.g. "Portaria" is removed if "Portaria 24h" is present,
 *      "Elevador" is removed if "Elevador de Serviço" is present.
 */

const REDUNDANCY_RULES: [generic: string, specific: string[]][] = [
  ["Portaria", ["Portaria 24h", "Portaria 24 Horas"]],
  ["Elevador", ["Elevador de Serviço"]],
  ["Churrasqueira", ["Churrasqueira Coletiva", "Churrasqueira Individual"]],
  ["Piscina", ["Piscina Aquecida", "Piscina Adulto", "Piscina Infantil", "Piscina Coberta"]],
  ["Sauna", ["Sauna Seca", "Sauna Úmida", "Sauna a Vapor"]],
  ["Quadra", ["Quadra Poliesportiva", "Quadra de Tênis", "Quadra de Squash"]],
  ["Salão de Festas", ["Salão de Festas Adulto", "Salão de Festas Infantil"]],
]

export function deduplicateFeatures(features: string[]): string[] {
  const set = new Set(features.map((f) => f.trim()))

  for (const [generic, specifics] of REDUNDANCY_RULES) {
    if (set.has(generic) && specifics.some((s) => set.has(s))) {
      set.delete(generic)
    }
  }

  // Preserve original order
  return features.filter((f) => set.has(f.trim()))
}
