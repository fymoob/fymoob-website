import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"
import type { BairroSummary } from "@/types/property"

interface BairroCardProps {
  bairro: BairroSummary
}

export function BairroCard({ bairro }: BairroCardProps) {
  return (
    <Link
      href={`/imoveis/${bairro.slug}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-2xl p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ minHeight: 180 }}
    >
      {/* Background: foto real ou gradiente fallback */}
      {bairro.imageUrl ? (
        <>
          <Image
            src={bairro.imageUrl}
            alt={`Foto do bairro ${bairro.bairro}, Curitiba`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 transition-colors duration-300 group-hover:from-black/80" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800" />
          <div className="absolute inset-0 bg-brand-primary/10 transition-colors duration-300 group-hover:bg-brand-primary/20" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-1 flex items-center gap-1.5">
          <MapPin size={14} className="shrink-0 text-brand-primary" />
          <h3 className="font-display text-lg font-bold">{bairro.bairro}</h3>
        </div>
        <p className="text-sm text-neutral-300">
          {bairro.total} {bairro.total === 1 ? "imóvel" : "imóveis"}
        </p>
      </div>
    </Link>
  )
}
