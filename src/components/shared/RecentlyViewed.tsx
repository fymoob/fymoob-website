"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { isVistaImage } from "@/lib/image-optimization"
import { getRecentlyViewed } from "@/components/property/PropertyCard"

export function RecentlyViewed() {
  const [recent, setRecent] = useState<
    Array<{
      codigo: string
      slug: string
      titulo: string
      preco: number | null
      foto: string
      bairro: string
      timestamp: number
    }>
  >([])

  useEffect(() => {
    setRecent(getRecentlyViewed())
  }, [])

  if (recent.length < 2) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="size-4 text-neutral-400" />
        <h2 className="text-lg font-semibold text-neutral-900">
          Vistos recentemente
        </h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {recent.map((item) => (
          <Link
            key={item.codigo}
            href={`/imovel/${item.slug}`}
            className="flex-shrink-0 w-48 group"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={item.foto || "/logo.png"}
                alt={item.titulo}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="192px"
                unoptimized={isVistaImage(item.foto)}
              />
            </div>
            <p className="mt-2 text-sm font-medium text-neutral-900 truncate group-hover:text-brand-primary transition-colors">
              {item.titulo}
            </p>
            <p className="text-xs text-neutral-500">{item.bairro}</p>
            <p className="text-sm font-bold text-neutral-900">
              {formatPrice(item.preco)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
