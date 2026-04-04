"use client"

import { useEffect, useState } from "react"
import { GitCompareArrows, X, Plus, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/types/property"
import { formatPrice, getPropertyImage } from "@/lib/utils"

const COMPARE_KEY = "fymoob:compare"
const MAX_COMPARE = 3

function getCompareCodes(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(COMPARE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.slice(0, MAX_COMPARE) : []
  } catch {
    return []
  }
}

function removeFromCompare(code: string) {
  const codes = getCompareCodes().filter((c) => c !== code)
  localStorage.setItem(COMPARE_KEY, JSON.stringify(codes))
  window.dispatchEvent(new Event("compare-change"))
}

interface CompareRowProps {
  label: string
  values: (string | number | null | undefined)[]
  highlight?: boolean
}

function CompareRow({ label, values, highlight = false }: CompareRowProps) {
  return (
    <tr className={highlight ? "bg-brand-primary/5" : ""}>
      <td className="sticky left-0 z-10 border-b border-neutral-100 bg-white px-3 py-3 text-xs font-medium text-neutral-500 whitespace-nowrap sm:px-4 sm:text-sm">
        {label}
      </td>
      {values.map((val, i) => (
        <td key={i} className="border-b border-neutral-100 px-3 py-3 text-xs font-semibold text-neutral-900 text-center sm:px-4 sm:text-sm">
          {val ?? "—"}
        </td>
      ))}
    </tr>
  )
}

export default function CompararPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProperties = () => {
    const codes = getCompareCodes()

    if (codes.length === 0) {
      setProperties([])
      setLoading(false)
      return
    }

    setLoading(true)
    fetch("/api/properties/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codes }),
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((valid: Property[]) => {
        setProperties(valid)
        if (valid.length < codes.length) {
          const validCodes = valid.map((p) => p.codigo)
          localStorage.setItem(COMPARE_KEY, JSON.stringify(validCodes))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchProperties()

    const handleChange = () => fetchProperties()
    window.addEventListener("compare-change", handleChange)
    return () => window.removeEventListener("compare-change", handleChange)
  }, [])

  const handleRemove = (code: string) => {
    removeFromCompare(code)
    setProperties((prev) => prev.filter((p) => p.codigo !== code))
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <GitCompareArrows className="size-6 text-brand-primary" />
        <h1 className="text-2xl font-bold text-neutral-900">Comparar Imóveis</h1>
        {properties.length > 0 && (
          <span className="rounded-full bg-brand-primary/10 px-2.5 py-0.5 text-sm font-medium text-brand-primary">
            {properties.length}
          </span>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl bg-neutral-100" />
          ))}
        </div>
      ) : properties.length > 0 ? (
        <>
          {/* Property cards header */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {properties.map((property) => (
              <div
                key={property.codigo}
                className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white"
              >
                <button
                  onClick={() => handleRemove(property.codigo)}
                  className="absolute top-2 right-2 z-10 flex size-7 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                  aria-label="Remover da comparação"
                >
                  <X className="size-4" />
                </button>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={getPropertyImage(property)}
                    alt={property.titulo}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-bold text-brand-primary">
                    {formatPrice(property.precoVenda ?? property.precoAluguel)}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-neutral-600">
                    {property.titulo}
                  </p>
                  <Link
                    href={`/imovel/${property.slug}`}
                    className="mt-2 flex items-center gap-1 text-xs font-medium text-brand-primary hover:underline"
                  >
                    Ver detalhes <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Add more slot */}
            {properties.length < MAX_COMPARE && (
              <Link
                href="/busca"
                className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-6 text-neutral-400 transition hover:border-brand-primary hover:text-brand-primary"
              >
                <Plus className="size-8" />
                <span className="text-sm font-medium">Adicionar imóvel</span>
              </Link>
            )}
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="sticky left-0 z-10 bg-neutral-50 px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-500 sm:px-4 sm:text-xs">
                    Característica
                  </th>
                  {properties.map((p) => (
                    <th key={p.codigo} className="px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-neutral-500 sm:px-4 sm:text-xs">
                      {p.codigo}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <CompareRow
                  label="Preço"
                  values={properties.map((p) => formatPrice(p.precoVenda ?? p.precoAluguel))}
                  highlight
                />
                <CompareRow
                  label="Tipo"
                  values={properties.map((p) => p.tipo)}
                />
                <CompareRow
                  label="Bairro"
                  values={properties.map((p) => p.bairro)}
                />
                <CompareRow
                  label="Área total"
                  values={properties.map((p) => p.areaTotal ? `${p.areaTotal} m²` : null)}
                  highlight
                />
                <CompareRow
                  label="Área privativa"
                  values={properties.map((p) => p.areaPrivativa ? `${p.areaPrivativa} m²` : null)}
                />
                <CompareRow
                  label="Quartos"
                  values={properties.map((p) => p.dormitorios)}
                  highlight
                />
                <CompareRow
                  label="Suítes"
                  values={properties.map((p) => p.suites)}
                />
                <CompareRow
                  label="Banheiros"
                  values={properties.map((p) => p.banheiros)}
                />
                <CompareRow
                  label="Vagas"
                  values={properties.map((p) => p.vagas)}
                  highlight
                />
                <CompareRow
                  label="Condomínio"
                  values={properties.map((p) => p.valorCondominio ? formatPrice(p.valorCondominio) : null)}
                />
                <CompareRow
                  label="IPTU"
                  values={properties.map((p) => p.valorIptu ? formatPrice(p.valorIptu) : null)}
                />
                <CompareRow
                  label="Preço/m²"
                  values={properties.map((p) => {
                    const price = p.precoVenda ?? p.precoAluguel
                    const area = p.areaPrivativa ?? p.areaTotal
                    if (price && area && area > 0) return formatPrice(Math.round(price / area)) + "/m²"
                    return null
                  })}
                  highlight
                />
                <CompareRow
                  label="Finalidade"
                  values={properties.map((p) => p.finalidade)}
                />
                <CompareRow
                  label="Varandas"
                  values={properties.map((p) => p.varandas)}
                />
                <CompareRow
                  label="Face"
                  values={properties.map((p) => p.face)}
                />
                <CompareRow
                  label="Ano construção"
                  values={properties.map((p) => p.anoConstrucao)}
                />
                <CompareRow
                  label="Financiamento"
                  values={properties.map((p) => p.aceitaFinanciamento ? "Sim" : "Não")}
                />
                <CompareRow
                  label="Permuta"
                  values={properties.map((p) => p.aceitaPermuta ? "Sim" : "Não")}
                />
              </tbody>
            </table>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-8 rounded-xl bg-brand-primary/5 p-6 text-center">
            <p className="text-lg font-semibold text-neutral-900">Precisa de ajuda para decidir?</p>
            <p className="mt-1 text-sm text-neutral-600">Nossos especialistas podem te ajudar a escolher o melhor imóvel.</p>
            <a
              href={`https://wa.me/554199978-0517?text=${encodeURIComponent(
                `Olá! Estou comparando ${properties.length} imóveis (${properties.map((p) => p.codigo).join(", ")}) e gostaria de ajuda para decidir.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
            >
              Falar com especialista
            </a>
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 py-20 text-center">
          <GitCompareArrows className="mx-auto size-12 text-neutral-300" />
          <p className="mt-4 text-lg font-medium text-neutral-600">
            Nenhum imóvel para comparar
          </p>
          <p className="mt-2 text-sm text-neutral-400">
            Clique no ícone de comparar nos imóveis para adicioná-los aqui
          </p>
          <Link
            href="/busca"
            className="mt-6 inline-block rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
          >
            Explorar imóveis
          </Link>
        </div>
      )}
    </div>
  )
}
