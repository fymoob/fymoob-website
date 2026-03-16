import Link from "next/link"
import { MapPin } from "lucide-react"
import type { BairroSummary } from "@/types/property"

interface BairroCardProps {
  bairro: BairroSummary
}

export function BairroCard({ bairro }: BairroCardProps) {
  return (
    <Link
      href={`/imoveis/${bairro.slug}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-lg bg-gradient-to-br from-fymoob-blue to-fymoob-blue-dark p-6 text-white shadow-sm transition-shadow hover:shadow-md"
      style={{ minHeight: 160 }}
    >
      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/5" />
      <div className="relative z-10">
        <div className="mb-1 flex items-center gap-1.5">
          <MapPin size={14} className="shrink-0" />
          <h3 className="font-display text-lg font-bold">{bairro.bairro}</h3>
        </div>
        <p className="text-sm text-white/80">
          {bairro.total} {bairro.total === 1 ? "imóvel" : "imóveis"}
        </p>
      </div>
    </Link>
  )
}
