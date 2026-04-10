"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { MapPin, Hand } from "lucide-react"
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

export function PropertyMap({ latitude, longitude, bairro, titulo, endereco, numero, cidade, estado }: PropertyMapProps) {
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [interactive, setInteractive] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)

  const coords = useMemo(
    () => getPropertyCoordinates(latitude, longitude, bairro),
    [latitude, longitude, bairro]
  )

  const addressLine = buildAddressLine({ endereco, numero, bairro, cidade, estado })

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
        interactive: false,
      })

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
    }

    initMap()

    return () => {
      cancelled = true
    }
  }, [coords, hasEnteredViewport])

  // Enable interactivity
  useEffect(() => {
    if (!interactive || !mapRef.current) return
    const map = mapRef.current as {
      scrollZoom: { enable: () => void }
      dragPan: { enable: () => void }
      touchZoomRotate: { enable: () => void }
      doubleClickZoom: { enable: () => void }
      addControl: (ctrl: unknown, pos: string) => void
    }
    map.scrollZoom.enable()
    map.dragPan.enable()
    map.touchZoomRotate.enable()
    map.doubleClickZoom.enable()

    import("maplibre-gl").then(({ default: maplibregl }) => {
      map.addControl(new maplibregl.NavigationControl(), "top-right")
    })
  }, [interactive])

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

  const activateMap = () => {
    if (!interactive) setInteractive(true)
  }

  return (
    <section>
      <div className="flex items-center gap-3 pb-4">
        <MapPin className="size-4 shrink-0 text-brand-primary" />
        <p className="text-sm text-slate-600">{addressLine}</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
        <div
          className="relative z-0 h-[200px] md:h-[350px] lg:h-[400px]"
          onClick={activateMap}
        >
          <div ref={mapContainerRef} className="h-full w-full" />

          {!loaded && (
            <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-neutral-100 text-neutral-400">
              <MapPin size={24} className="mr-2" />
              Carregando mapa...
            </div>
          )}

          {loaded && !interactive && (
            <button
              type="button"
              onClick={activateMap}
              className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/0 transition-colors hover:bg-black/5"
            >
              <span className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-slate-700 shadow-lg backdrop-blur-sm">
                <Hand className="size-4" />
                Toque para interagir
              </span>
            </button>
          )}
        </div>
      </div>

      <p className="mt-2 text-xs text-neutral-500">Localização aproximada</p>
    </section>
  )
}
