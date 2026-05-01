/**
 * Client-side wrappers pra rotas /api/* — Fase 20.W2.2.
 *
 * Antes: 5 componentes faziam `fetch("/api/lead", ...)` diretamente,
 * com lógica de erro/payload duplicada e diferente em cada lugar.
 * Agora cada caller chama `submitLead(...)` ou `getFacets(...)`.
 *
 * Beneficios:
 * - Mockavel em testes (1 funcao por endpoint)
 * - Mudancas de payload centralizadas
 * - Compatibilidade com server actions futura sem alterar callers
 */

export interface LeadResponse {
  ok: boolean
  message?: string
  error?: string
  [key: string]: unknown
}

/**
 * Submete lead pra /api/lead. Aceita payload arbitrario pra acomodar
 * formatos diferentes dos formularios (ContactForm, ContactSidebar, etc).
 *
 * Tratamento uniforme de erro:
 * - HTTP 4xx/5xx → `{ ok: false, error: msg }`
 * - Network error → `{ ok: false, error: 'Erro de rede' }`
 * - 200 → propaga response do backend
 */
export async function submitLead(
  payload: Record<string, unknown>
): Promise<LeadResponse> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
      return { ok: false, error: data.error || `HTTP ${res.status}` }
    }

    return (await res.json()) as LeadResponse
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erro de rede"
    return { ok: false, error: msg }
  }
}

export interface FacetFiltersPayload {
  finalidades?: string[]
  cidades?: string[]
  bairros?: string[]
  tipos?: string[]
  /** API aceita string ou number — pendingFilters do hook usa string */
  quartosMin?: string | number
  quartosMax?: string | number
  scope?: Record<string, string>
}

/**
 * Busca facets dinamicas (counts por bairro/tipo/preco) baseadas nos
 * filtros atuais. AbortSignal aceito pra cancelar em debounce.
 *
 * Sem cache: "no-store" — facets revalidam a cada 1h via unstable_cache.
 * Cache HTTP padrao economiza roundtrips (Fase 20.W1.4).
 */
export async function getFacets(
  payload: FacetFiltersPayload,
  signal?: AbortSignal
): Promise<unknown> {
  const res = await fetch("/api/search/facets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  })
  if (!res.ok) throw new Error(`Facets API error: ${res.status}`)
  return res.json()
}
