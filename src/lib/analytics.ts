declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

type AnalyticsValue = string | number | boolean | null | undefined

export function pushAnalyticsEvent(
  event: string,
  params: Record<string, AnalyticsValue> = {}
) {
  if (typeof window === "undefined") return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    ...params,
  })
}
