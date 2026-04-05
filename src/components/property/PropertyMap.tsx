"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronUp, ChevronDown, MapPin } from "lucide-react"
import { getPropertyCoordinates } from "@/lib/bairro-coordinates"
// CSS loaded dynamically inside initMap() to avoid 271KB bundle on initial load

interface PropertyMapProps {
  latitude: number | null
  longitude: number | null
  bairro: string
  titulo: string
}

export function PropertyMap({ latitude, longitude, bairro, titulo }: PropertyMapProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)

  const handleToggle = () => {
    setIsOpen((prev) => {
      if (prev && mapRef.current) {
        (mapRef.current as { remove: () => void }).remove()
        mapRef.current = null
        setLoaded(false)
      }
      return !prev
    })
  }

  const coords = useMemo(
    () => getPropertyCoordinates(latitude, longitude, bairro),
    [latitude, longitude, bairro]
  )

  useEffect(() => {
    if (!coords || !isOpen || !mapContainerRef.current || mapRef.current) return

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
  }, [coords, isOpen])

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
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between pt-2 pb-4"
      >
        <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950">
          Mapa do imóvel
        </h2>
        {isOpen ? (
          <ChevronUp size={20} className="text-neutral-400" />
        ) : (
          <ChevronDown size={20} className="text-neutral-400" />
        )}
      </button>

      {isOpen && (
        <div>
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
            <div className="relative z-0 h-[350px] sm:h-[400px]">
              <div ref={mapContainerRef} className="h-full w-full rounded-xl" />
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                  <MapPin size={24} className="mr-2 animate-pulse" />
                  Carregando mapa...
                </div>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            Localização aproximada
          </p>
        </div>
      )}
    </section>
  )
}
