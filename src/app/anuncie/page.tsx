import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { ContactForm } from "@/components/shared/ContactForm"
import {
  Camera,
  Users,
  TrendingUp,
  Shield,
  Eye,
  Zap,
  ClipboardCheck,
  Megaphone,
  Handshake,
  CheckCircle2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Anuncie seu Imovel | FYMOOB Curitiba",
  description:
    "Anuncie seu imovel na FYMOOB e alcance milhares de compradores e inquilinos em Curitiba. Avaliacao gratuita, fotos profissionais e atendimento personalizado. CRECI J 9420.",
  alternates: {
    canonical: "/anuncie",
  },
}

const etapas = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Cadastro do imovel",
    description:
      "Preencha o formulario com os dados basicos do seu imovel. Nos entramos em contato para agendar uma visita.",
  },
  {
    number: "02",
    icon: Camera,
    title: "Avaliacao e fotos",
    description:
      "Visitamos o imovel, fazemos a avaliacao de mercado e registramos fotos de alta qualidade para o anuncio.",
  },
  {
    number: "03",
    icon: Megaphone,
    title: "Publicacao e divulgacao",
    description:
      "Seu imovel e publicado no nosso site otimizado para Google, portais parceiros e redes sociais.",
  },
  {
    number: "04",
    icon: Handshake,
    title: "Negociacao e fechamento",
    description:
      "Cuidamos de toda a negociacao, documentacao e acompanhamos ate a entrega das chaves.",
  },
]

const beneficios = [
  {
    icon: Eye,
    title: "Visibilidade no Google",
    description:
      "Seu imovel aparece nas buscas do Google com pagina propria, fotos e todas as informacoes.",
  },
  {
    icon: Zap,
    title: "Anuncio em 24 horas",
    description:
      "Apos a visita tecnica, seu imovel e publicado em menos de 24 horas no site.",
  },
  {
    icon: Users,
    title: "Base de clientes qualificados",
    description:
      "Conectamos seu imovel a compradores e inquilinos que ja estao buscando ativamente em Curitiba.",
  },
  {
    icon: TrendingUp,
    title: "Avaliacao de mercado gratuita",
    description:
      "Precificacao baseada em dados reais do mercado curitibano para vender ou alugar mais rapido.",
  },
  {
    icon: Shield,
    title: "Seguranca juridica",
    description:
      "Contratos revisados, documentacao verificada e transacoes com respaldo legal. CRECI J 9420.",
  },
  {
    icon: Camera,
    title: "Fotos profissionais",
    description:
      "Anuncios com fotos de qualidade que destacam os melhores atributos do seu imovel.",
  },
]

const tiposAceitos = [
  "Apartamentos",
  "Casas",
  "Sobrados",
  "Terrenos",
  "Salas comerciais",
  "Cobertura",
  "Kitnet / Studio",
  "Empreendimentos",
]

export default function AnunciePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-2 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Anuncie seu imovel", url: "/anuncie" },
        ]}
      />

      {/* Hero */}
      <div className="mb-12">
        <h1 className="font-display text-3xl font-bold text-fymoob-gray-dark sm:text-4xl">
          Anuncie seu imovel na FYMOOB
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-fymoob-gray-mid">
          Venda ou alugue seu imovel com quem entende de Curitiba.{" "}
          <strong className="text-fymoob-gray-dark">
            Avaliacao gratuita, anuncio profissional e atendimento do inicio ao fim.
          </strong>
        </p>
      </div>

      {/* Stats bar */}
      <div className="mb-14 grid grid-cols-3 gap-4 rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-6">
        {[
          { number: "249+", label: "Imoveis ativos" },
          { number: "65", label: "Bairros atendidos" },
          { number: "24h", label: "Para publicar" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-display text-2xl font-bold text-brand-primary sm:text-3xl">
              {item.number}
            </p>
            <p className="mt-0.5 text-xs text-fymoob-gray-mid sm:text-sm">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Como funciona */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-fymoob-gray-dark">
          Como funciona
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {etapas.map((etapa) => {
            const Icon = etapa.icon
            return (
              <div key={etapa.number} className="relative rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
                <span className="absolute -top-3 left-4 rounded-full bg-brand-primary px-2.5 py-0.5 text-xs font-bold text-white">
                  {etapa.number}
                </span>
                <div className="mb-3 mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10">
                  <Icon className="size-5 text-brand-primary" />
                </div>
                <h3 className="font-display font-bold text-fymoob-gray-dark">
                  {etapa.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fymoob-gray-mid">
                  {etapa.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Beneficios */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-fymoob-gray-dark">
          Por que anunciar na FYMOOB?
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-brand-primary/30 hover:shadow-md"
              >
                <Icon className="mb-3 size-6 text-brand-primary" />
                <h3 className="font-display font-bold text-fymoob-gray-dark">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fymoob-gray-mid">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tipos aceitos */}
      <section className="mb-16">
        <h2 className="mb-4 font-display text-2xl font-bold text-fymoob-gray-dark">
          Tipos de imoveis que anunciamos
        </h2>
        <div className="flex flex-wrap gap-2">
          {tiposAceitos.map((tipo) => (
            <span
              key={tipo}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-fymoob-gray-dark"
            >
              <CheckCircle2 className="size-3.5 text-brand-primary" />
              {tipo}
            </span>
          ))}
        </div>
      </section>

      {/* Form section */}
      <section className="mb-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
        <h2 className="mb-2 font-display text-2xl font-bold text-fymoob-gray-dark">
          Cadastre seu imovel
        </h2>
        <p className="mb-6 text-sm text-fymoob-gray-mid">
          Preencha os dados abaixo e um de nossos corretores entrara em contato
          para agendar a visita de avaliacao. Sem compromisso.
        </p>
        <div className="mx-auto max-w-lg">
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
