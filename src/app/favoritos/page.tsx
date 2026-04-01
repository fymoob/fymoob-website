"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import Link from "next/link"
import { getWishlistProperties } from "@/components/property/PropertyCard"

export default function FavoritosPage() {
  const [codes, setCodes] = useState<string[]>([])

  useEffect(() => {
    setCodes(getWishlistProperties())
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="size-6 text-brand-primary" />
        <h1 className="text-2xl font-bold text-neutral-900">
          Meus Favoritos
        </h1>
        {codes.length > 0 && (
          <span className="rounded-full bg-brand-primary/10 px-2.5 py-0.5 text-sm font-medium text-brand-primary">
            {codes.length}
          </span>
        )}
      </div>

      {codes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 py-20 text-center">
          <Heart className="mx-auto size-12 text-neutral-300" />
          <p className="mt-4 text-lg font-medium text-neutral-600">
            Nenhum imóvel salvo ainda
          </p>
          <p className="mt-2 text-sm text-neutral-400">
            Clique no coração nos imóveis que gostar para salvá-los aqui
          </p>
          <Link
            href="/busca"
            className="mt-6 inline-block rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
          >
            Explorar imóveis
          </Link>
        </div>
      ) : (
        <div>
          <p className="mb-6 text-neutral-500">
            Você salvou {codes.length} {codes.length === 1 ? "imóvel" : "imóveis"}.
            Para ver os detalhes, clique em um deles.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {codes.map((code) => (
              <Link
                key={code}
                href={`/busca?codigo=${code}`}
                className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 transition hover:border-brand-primary/30 hover:shadow-md"
              >
                <Heart className="size-5 text-brand-primary flex-shrink-0" fill="currentColor" />
                <div>
                  <p className="font-medium text-neutral-900">Imóvel {code}</p>
                  <p className="text-xs text-neutral-400">Clique para ver detalhes</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
