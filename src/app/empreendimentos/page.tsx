import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getAllEmpreendimentos } from "@/services/loft"
import { formatPrice } from "@/lib/utils"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { Building2, MapPin, Home } from "lucide-react"

export const metadata: Metadata = {
  title: { absolute: "Empreendimentos Imobiliários em Curitiba | FYMOOB" },
  description:
    "Conheça os empreendimentos imobiliários em Curitiba. Apartamentos, casas e sobrados em lançamento e prontos para morar. FYMOOB Imobiliária.",
  alternates: {
    canonical: "/empreendimentos",
  },
}

export default async function EmpreendimentosPage() {
  const empreendimentos = await getAllEmpreendimentos()

  return (
    <>
      <section className="bg-neutral-950 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Empreendimentos", url: "/empreendimentos" },
            ]}
          />
          <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            Empreendimentos em Curitiba
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
            {empreendimentos.length} empreendimentos disponiveis em Curitiba.
            Encontre apartamentos em lancamento, prontos para morar e em construcao.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {empreendimentos.map((emp) => (
              <Link
                key={emp.slug}
                href={`/empreendimento/${emp.slug}`}
                className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:border-brand-primary/30 hover:shadow-md"
              >
                {emp.imageUrl ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <Image
                      src={emp.imageUrl}
                      alt={emp.nome}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-neutral-100">
                    <Building2 className="size-10 text-neutral-300" />
                  </div>
                )}

                <div className="p-4">
                  <h2 className="font-display text-lg font-bold text-neutral-900 group-hover:text-brand-primary">
                    {emp.nome}
                  </h2>

                  {emp.bairros.length > 0 && (
                    <p className="mt-1 flex items-center gap-1 text-sm text-neutral-500">
                      <MapPin className="size-3.5" />
                      {emp.bairros.join(", ")}
                    </p>
                  )}

                  {emp.construtora && (
                    <p className="mt-1 flex items-center gap-1 text-sm text-neutral-500">
                      <Building2 className="size-3.5" />
                      {emp.construtora}
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-neutral-600">
                      <Home className="size-3.5" />
                      <span className="font-semibold">{emp.total}</span> {emp.total === 1 ? "unidade" : "unidades"}
                    </div>
                    {emp.precoMin && (
                      <p className="text-sm font-semibold text-slate-900">
                        A partir de {formatPrice(emp.precoMin)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
