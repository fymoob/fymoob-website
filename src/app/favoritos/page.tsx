"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import Link from "next/link"
import type { Property } from "@/types/property"
import { PropertyGrid } from "@/components/search/PropertyGrid"

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

    // Fetch each property by code
    Promise.all(
      codes.map((code) =>
        fetch(`/api/property/${code}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    ).then((results) => {
      const valid = results.filter(Boolean)
      setProperties(valid)
      setCount(valid.length)

      // Clean up invalid codes from localStorage
      if (valid.length < codes.length) {
        const validCodes = valid.map((p: Property) => p.codigo)
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(validCodes))
      }

      setLoading(false)
    })
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
        <PropertyGrid properties={properties} />
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
