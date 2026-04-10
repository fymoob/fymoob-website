"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ExternalLink, MapPin, Navigation } from "lucide-react"
import { getPropertyCoordinates } from "@/lib/bairro-coordinates"

interface PropertyMapProps {
  latitude: number | null
  longitude: number | null
  bairro: string
  titulo: string
  endereco?: string
  numero?: string
  cidade?: string
  estado?: string
}

function buildAddressLine(props: Pick<PropertyMapProps, "endereco" | "numero" | "bairro" | "cidade" | "estado">) {
  const parts = [props.endereco, props.numero, props.bairro].filter(Boolean).join(", ")
  const cityState = [props.cidade, props.estado].filter(Boolean).join(" - ")
  return parts ? `${parts}, ${cityState}` : `${props.bairro}, ${cityState}`
}

function buildMapsUrl(coords: { lat: number; lng: number }, address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}&query_place_id=${encodeURIComponent(address)}`
}

export function PropertyMap({ latitude, longitude, bairro, titulo, endereco, numero, cidade, estado }: PropertyMapProps) {
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)

  const coords = useMemo(
    () => getPropertyCoordinates(latitude, longitude, bairro),
    [latitude, longitude, bairro]
  )

  const addressLine = buildAddressLine({ endereco, numero, bairro, cidade, estado })
  const mapsUrl = coords ? buildMapsUrl(coords, addressLine) : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`

  // IntersectionObserver — trigger maplibre load when container approaches viewport
  useEffect(() => {
    if (!coords || !mapContainerRef.current) return
    const el = mapContainerRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [coords])

  // Load maplibre when container enters viewport
  useEffect(() => {
    if (!coords || !hasEnteredViewport || !mapContainerRef.current || mapRef.current) return

    let cancelled = false

    async function initMap() {
      const maplibregl = (await import("maplibre-gl")).default

      // Inject maplibre CSS dynamically (avoid bundling 271KB on initial load)
      if (!document.querySelector('link[href*="maplibre-gl"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.css"
        document.head.appendChild(link)
      }

      if (cancelled || !mapContainerRef.current) return

      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
        center: [coords!.lng, coords!.lat],
        zoom: 15,
        attributionControl: false,
      })

      map.addControl(new maplibregl.NavigationControl(), "top-right")
      map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left")

      // Custom marker
      const markerEl = document.createElement("div")
      markerEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 32 40"><path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 24 16 24s16-12 16-24C32 7.16 24.84 0 16 0zm0 22a6 6 0 110-12 6 6 0 010 12z" fill="#29ABE2"/></svg>`
      markerEl.style.cursor = "pointer"

      new maplibregl.Marker({ element: markerEl })
        .setLngLat([coords!.lng, coords!.lat])
        .addTo(map)

      mapRef.current = map
      setLoaded(true)

      // Disable scroll zoom for better UX
      map.scrollZoom.disable()
    }

    initMap()

    return () => {
      cancelled = true
    }
  }, [coords, hasEnteredViewport])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current && typeof (mapRef.current as { remove: () => void }).remove === "function") {
        (mapRef.current as { remove: () => void }).remove()
        mapRef.current = null
      }
    }
  }, [])

  if (!coords) return null

  return (
    <section>
      {/* Mobile: compact address card — no map rendering, opens Google Maps */}
      <div className="md:hidden">
        <h2 className="pt-2 pb-4 font-display text-xl font-semibold tracking-tight text-neutral-950">
          Localização
        </h2>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-colors active:bg-slate-50"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
            <MapPin className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-slate-800">
              {addressLine}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
              <Navigation className="size-3" />
              Toque para abrir no mapa
            </p>
          </div>
          <ExternalLink className="size-4 shrink-0 text-slate-400" />
        </a>
        <p className="mt-2 text-xs text-neutral-500">
          Localização aproximada
        </p>
      </div>

      {/* Desktop: interactive map */}
      <div className="hidden md:block">
        <h2 className="pt-2 pb-4 font-display text-xl font-semibold tracking-tight text-neutral-950">
          Mapa do imóvel
        </h2>
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
          <div className="relative z-0 h-[350px] sm:h-[400px]">
            <div ref={mapContainerRef} className="h-full w-full rounded-xl" />
            {!loaded && (
              <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-neutral-100 text-neutral-400">
                <MapPin size={24} className="mr-2" />
                Carregando mapa...
              </div>
            )}
          </div>
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          Localização aproximada
        </p>
      </div>
    </section>
  )
}
