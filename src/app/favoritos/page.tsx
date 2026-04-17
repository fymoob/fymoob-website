"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import Link from "next/link"
import type { Property } from "@/types/property"
import { PropertyCard } from "@/components/property/PropertyCard"

const WISHLIST_KEY = "fymoob:wishlist"

function getWishlistCodes(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(WISHLIST_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function FavoritosGrid({
  properties,
  onRemove,
}: {
  properties: Property[]
  onRemove: (codigo: string) => void
}) {
  return (
    <section className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
      {properties.map((property, index) => (
        <PropertyCard
          key={property.slug}
          property={property}
          prioritizeFirstImage={index < 3}
          variant="responsive"
          wishlistAction="remove"
          hideSecondaryFeatures
          onRemove={onRemove}
        />
      ))}
    </section>
  )
}

export default function FavoritosPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)

    const codes = getWishlistCodes()
    setCount(codes.length)

    if (codes.length === 0) {
      setLoading(false)
      return
    }

    // Fetch all properties in a single batch request
    fetch("/api/properties/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codes }),
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((valid: Property[]) => {
        setProperties(valid)
        setCount(valid.length)

        // Clean up invalid codes from localStorage
        if (valid.length < codes.length) {
          const validCodes = valid.map((p) => p.codigo)
          localStorage.setItem(WISHLIST_KEY, JSON.stringify(validCodes))
        }

        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <Heart className="size-6 text-brand-primary" />
        <h1 className="text-2xl font-bold text-neutral-900">Meus Favoritos</h1>
        {count > 0 && (
          <span className="rounded-full bg-brand-primary/10 px-2.5 py-0.5 text-sm font-medium text-brand-primary">
            {count}
          </span>
        )}
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: count || 3 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-xl bg-neutral-100" />
          ))}
        </div>
      ) : properties.length > 0 ? (
        <FavoritosGrid
          properties={properties}
          onRemove={(codigo) => {
            setProperties((prev) => {
              const next = prev.filter((p) => p.codigo !== codigo)
              setCount(next.length)
              return next
            })
          }}
        />
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 py-20 text-center">
          <Heart className="mx-auto size-12 text-neutral-300" />
          <p className="mt-4 text-lg font-medium text-neutral-600">
            Nenhum imovel salvo ainda
          </p>
          <p className="mt-2 text-sm text-neutral-400">
            Clique no coracao nos imoveis que gostar para salva-los aqui
          </p>
          <Link
            href="/busca"
            className="mt-6 inline-block rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
          >
            Explorar imoveis
          </Link>
        </div>
      )}
    </div>
  )
}
