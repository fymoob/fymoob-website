import Link from "next/link"
import type { BairroSummary } from "@/types/property"

interface LinkGroup {
  title: string
  links: { label: string; href: string }[]
}

interface SeoInternalLinksProps {
  groups: LinkGroup[]
}

const TIPO_PAGES = [
  { label: "Apartamentos em Curitiba", href: "/apartamentos-curitiba" },
  { label: "Casas em Curitiba", href: "/casas-curitiba" },
  { label: "Sobrados em Curitiba", href: "/sobrados-curitiba" },
  { label: "Terrenos em Curitiba", href: "/terrenos-curitiba" },
  { label: "Lançamentos", href: "/lancamentos" },
]

const FAIXA_PAGES = [
  { label: "Imóveis até R$ 300 mil", href: "/imoveis/preco/ate-300-mil" },
  { label: "Imóveis R$ 300-500 mil", href: "/imoveis/preco/300-a-500-mil" },
  { label: "Imóveis R$ 500 mil - 1 milhão", href: "/imoveis/preco/500-mil-a-1-milhao" },
  { label: "Imóveis acima de R$ 1 milhão", href: "/imoveis/preco/acima-de-1-milhao" },
]

export function SeoInternalLinks({ groups }: SeoInternalLinksProps) {
  const allGroups: LinkGroup[] = [
    ...groups,
    { title: "Tipos de Imóveis", links: TIPO_PAGES },
    { title: "Faixas de Preço", links: FAIXA_PAGES },
  ]

  return (
    <section className="border-t border-neutral-200 bg-neutral-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Explore mais imóveis
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {allGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-neutral-900">{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.links.slice(0, 12).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block text-sm text-neutral-500 transition-colors hover:text-brand-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Helper: build bairros group from BairroSummary[] */
export function buildBairrosGroup(
  bairros: BairroSummary[],
  options?: { tipoSlug?: string; title?: string }
): LinkGroup {
  const suffix = options?.tipoSlug ? `/${options.tipoSlug}` : ""
  return {
    title: options?.title || "Bairros Populares",
    links: bairros
      .sort((a, b) => b.total - a.total)
      .slice(0, 12)
      .map((b) => ({
        label: `${b.bairro} (${b.total})`,
        href: `/imoveis/${b.slug}${suffix}`,
      })),
  }
}
