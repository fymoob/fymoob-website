const VIEWS_KEY = "fymoob:views"
const VIEWS_TODAY_KEY = "fymoob:views_today"

interface ViewRecord {
  count: number
  lastView: number
}

type ViewsMap = Record<string, ViewRecord>

function getViewsMap(): ViewsMap {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(VIEWS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveViewsMap(map: ViewsMap) {
  try {
    localStorage.setItem(VIEWS_KEY, JSON.stringify(map))
  } catch {
    // ignore
  }
}

/** Increment view count for a property. Returns the new total count. */
export function trackView(codigo: string): number {
  const map = getViewsMap()
  const existing = map[codigo]
  const now = Date.now()

  if (existing) {
    // Don't count multiple views within 5 minutes
    if (now - existing.lastView < 5 * 60 * 1000) return existing.count
    map[codigo] = { count: existing.count + 1, lastView: now }
  } else {
    map[codigo] = { count: 1, lastView: now }
  }

  saveViewsMap(map)
  return map[codigo].count
}

/** Get view count for a single property */
export function getViewCount(codigo: string): number {
  const map = getViewsMap()
  return map[codigo]?.count ?? 0
}

/** Get the top N most viewed property codes */
export function getTopViewedCodes(topPercent = 0.15): Set<string> {
  const map = getViewsMap()
  const entries = Object.entries(map)
  if (entries.length < 5) return new Set() // Need minimum data

  entries.sort((a, b) => b[1].count - a[1].count)
  const cutoff = Math.max(1, Math.ceil(entries.length * topPercent))
  const minViews = entries[cutoff - 1]?.[1].count ?? 3

  // Only mark as "most viewed" if at least 3 views
  if (minViews < 3) return new Set()

  return new Set(
    entries
      .filter((e) => e[1].count >= minViews)
      .slice(0, cutoff)
      .map((e) => e[0])
  )
}
