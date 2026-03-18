"use client"

import { useEffect, useState } from "react"
import { ChevronUp, ChevronDown, MapPin } from "lucide-react"
import { getPropertyCoordinates } from "@/lib/bairro-coordinates"
import "leaflet/dist/leaflet.css"

interface PropertyMapProps {
  latitude: number | null
  longitude: number | null
  bairro: string
  titulo: string
}

export function PropertyMap({ latitude, longitude, bairro, titulo }: PropertyMapProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [MapComponent, setMapComponent] = useState<React.ReactNode>(null)

  const coords = getPropertyCoordinates(latitude, longitude, bairro)

  useEffect(() => {
    if (!coords || !isOpen) return

    let cancelled = false

    async function loadMap() {
      const L = (await import("leaflet")).default
      const { MapContainer, TileLayer, Marker } = await import("react-leaflet")

      // Custom marker icon
      const icon = L.icon({
        iconUrl: "/images/map-marker.svg",
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40],
      })

      if (cancelled) return

      setMapComponent(
        <MapContainer
          center={[coords!.lat, coords!.lng]}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coords!.lat, coords!.lng]} icon={icon} />
        </MapContainer>
      )
    }

    loadMap()

    return () => {
      cancelled = true
    }
  }, [coords, isOpen])

  if (!coords) return null

  return (
    <section>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
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
              {MapComponent || (
                <div className="flex h-full items-center justify-center text-neutral-400">
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
