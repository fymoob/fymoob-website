import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { Shield, CheckCircle2, Users, BookOpen, RefreshCw, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Política Editorial | FYMOOB Imobiliária",
  description:
    "Conheça nossa política editorial: como produzimos, revisamos e atualizamos o conteúdo da FYMOOB. Transparência, credibilidade e responsabilidade CRECI em cada informação publicada.",
  alternates: { canonical: "/politica-editorial" },
}

const principios = [
  {
    icon: Shield,
    title: "Responsabilidade Técnica",
    description:
      "Todo conteúdo sobre mercado imobiliário é revisado por corretor com registro CRECI ativo, garantindo aderência às normas do COFECI e à legislação vigente.",
  },
  {
    icon: CheckCircle2,
    title: "Fonte Verificada",
    description:
      "Dados de preço, área, características e disponibilidade dos imóveis são sincronizados em tempo real com nosso CRM. Estatísticas de mercado citam a fonte e a data da coleta.",
  },
  {
    icon: Users,
    title: "Autoria Identificada",
    description:
      "Cada artigo é assinado pelo autor responsável com nome, CRECI e biografia visíveis. Nunca publicamos conteúdo anônimo ou gerado integralmente por IA sem supervisão humana qualificada.",
  },
  {
    icon: BookOpen,
    title: "Expertise Aplicada",
    description:
      "Conteúdo editorial é produzido por profissionais com formação específica em Negócios Imobiliários, Direito ou Psicologia aplicada a relações de negócio — não por redatores generalistas.",
  },
  {
    icon: RefreshCw,
    title: "Atualização Contínua",
    description:
      "Revisamos artigos de natureza regulatória (financiamento, ITBI, leis) a cada 6 meses. Páginas de mercado são atualizadas trimestralmente com dados do CRM. Data da última revisão é sempre visível.",
  },
  {
    icon: AlertCircle,
    title: "Correção de Erros",
    description:
      "Erros identificados são corrigidos em até 48 horas úteis. Correções relevantes ficam registradas no final do artigo. Clientes podem reportar imprecisões via contato@fymoob.com.br.",
  },
]

export default function PoliticaEditorialPage() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/politica-editorial`,
    name: "Política Editorial FYMOOB",
    description: metadata.description,
    url: `${SITE_URL}/politica-editorial`,
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: { "@id": `${SITE_URL}/#organization` },
    dateModified: "2026-04-15",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-white">
        <section className="border-b border-neutral-100 bg-neutral-50">
          <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: "Home", url: "/" },
                { name: "Política Editorial", url: "/politica-editorial" },
              ]}
            />
          </div>
        </section>

        <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl">
            Política Editorial
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            A FYMOOB (CRECI J 9420) trata o conteúdo do site como extensão do nosso serviço
            de corretagem — com o mesmo rigor técnico, responsabilidade jurídica e
            compromisso com o cliente que aplicamos em cada negociação.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Esta política existe para tornar transparente como produzimos, revisamos e
            mantemos atualizadas as informações que publicamos sobre o mercado
            imobiliário de Curitiba.
          </p>

          <div className="mt-12 space-y-8">
            {principios.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-neutral-950">{title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-neutral-950">Responsáveis técnicos</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              A supervisão editorial da FYMOOB é assinada pelos sócios{" "}
              <Link href="/sobre#bruno" className="font-medium text-brand-primary hover:underline">
                Bruno César de Almeida (CRECI/PR 24.494)
              </Link>{" "}
              e{" "}
              <Link href="/sobre#wagner" className="font-medium text-brand-primary hover:underline">
                Wagner Spessatto (CRECI/PR 39.357)
              </Link>
              . Todo o conteúdo publicado passa pela aprovação de pelo menos um deles antes
              de ir ao ar.
            </p>
          </section>

          <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-neutral-950">Como reportar um erro</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Encontrou uma informação desatualizada, imprecisa ou conflitante com a
              legislação atual? Envie um email para{" "}
              <a href="mailto:contato@fymoob.com.br" className="font-medium text-brand-primary hover:underline">
                contato@fymoob.com.br
              </a>{" "}
              com o link da página e a correção sugerida. Respondemos em até 48 horas úteis.
            </p>
          </section>

          <p className="mt-12 text-xs text-neutral-500">
            Última atualização desta política: 15 de abril de 2026.
          </p>
        </section>
      </main>
    </>
  )
}
