const SAVED_SEARCH_KEY = "fymoob:saved_search"

export interface SavedSearch {
  query: string
  label: string
  timestamp: number
}

export function getSavedSearch(): SavedSearch | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(SAVED_SEARCH_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveSearch(query: string, label: string) {
  if (typeof window === "undefined") return
  try {
    const saved: SavedSearch = { query, label, timestamp: Date.now() }
    localStorage.setItem(SAVED_SEARCH_KEY, JSON.stringify(saved))
  } catch {
    // ignore
  }
}

export function removeSavedSearch() {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(SAVED_SEARCH_KEY)
  } catch {
    // ignore
  }
}

/** Build a human-readable label from search params */
export function buildSearchLabel(params: URLSearchParams): string {
  const parts: string[] = []

  const tipo = params.get("tipo")
  if (tipo) parts.push(tipo)

  const bairro = params.get("bairro")
  if (bairro) parts.push(`no ${bairro}`)

  const precoMax = params.get("precoMax")
  if (precoMax) {
    const val = Number(precoMax)
    if (val >= 1_000_000) {
      parts.push(`até R$ ${(val / 1_000_000).toFixed(1).replace(".0", "")}M`)
    } else if (val >= 1_000) {
      parts.push(`até R$ ${Math.round(val / 1000)}k`)
    }
  }

  const quartos = params.get("quartos")
  if (quartos) parts.push(`${quartos}+ quartos`)

  return parts.length > 0 ? parts.join(" ") : "Busca personalizada"
}
