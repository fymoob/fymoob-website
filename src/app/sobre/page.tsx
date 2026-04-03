import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import {
  Shield,
  Target,
  Sparkles,
  Award,
  MapPin,
  Phone,
  Mail,
  Building2,
  Users,
  Handshake,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Sobre a FYMOOB | Imobiliaria em Curitiba",
  description:
    "Conheca a FYMOOB Imobiliaria — especialistas em compra, venda e locacao de imoveis em Curitiba. CRECI J 9420. Atendimento personalizado e transparente.",
  alternates: {
    canonical: "/sobre",
  },
}

const valores = [
  {
    icon: Shield,
    title: "Integridade",
    description: "Transparencia e honestidade em cada negociacao. Voce sabe exatamente o que esta comprando.",
  },
  {
    icon: Sparkles,
    title: "Inovacao",
    description: "Solucoes modernas para superar expectativas. Tecnologia a servico da sua experiencia.",
  },
  {
    icon: Target,
    title: "Personalizacao",
    description: "Atendimento feito sob medida para voce. Cada cliente e unico, cada busca e diferente.",
  },
  {
    icon: Award,
    title: "Excelencia",
    description: "Qualidade impecavel em cada detalhe. Do primeiro contato ate a entrega das chaves.",
  },
]

const diferenciais = [
  { number: "250+", label: "Imoveis ativos", icon: Building2 },
  { number: "65", label: "Bairros atendidos", icon: MapPin },
  { number: "113", label: "Empreendimentos", icon: TrendingUp },
  { number: "J 9420", label: "CRECI ativo", icon: Award },
]

export default function SobrePage() {
  return (
    <>
      {/* Hero with background */}
      <section className="relative bg-neutral-950 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/15 to-transparent" />
        {/* Background image — add /images/sobre-hero.jpg for visual enhancement */}
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Sobre nos", url: "/sobre" },
            ]}
          />
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Quem Nos Somos
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Na FYMOOB, transformamos a busca pelo lar ideal em uma experiencia unica e personalizada. Mais do que imoveis, entregamos{" "}
            <strong className="text-white">lares que refletem seus sonhos e estilo de vida.</strong>
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-neutral-100 bg-white py-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {diferenciais.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10">
                  <Icon className="size-5 text-brand-primary" />
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-neutral-900">{item.number}</p>
                  <p className="text-xs text-neutral-500">{item.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Missao e Visao */}
        <section className="mb-16 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10">
              <Handshake className="size-5 text-brand-primary" />
            </div>
            <h2 className="font-display text-xl font-bold text-neutral-900">Nossa Missao</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Guiar voce em cada etapa da jornada imobiliaria, com confianca, transparencia e excelencia, garantindo que sua experiencia seja segura e satisfatoria.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10">
              <TrendingUp className="size-5 text-brand-primary" />
            </div>
            <h2 className="font-display text-xl font-bold text-neutral-900">Nossa Visao</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Redefinir o padrao de atendimento no mercado imobiliario, inovando para conectar pessoas ao lar perfeito, onde felicidade e bem-estar comecam.
            </p>
          </div>
        </section>

        {/* Valores */}
        <section className="mb-16">
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900">
            Nossos Valores
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map((valor) => {
              const Icon = valor.icon
              return (
                <div
                  key={valor.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-brand-primary/30 hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10">
                    <Icon className="size-5 text-brand-primary" />
                  </div>
                  <h3 className="font-display text-base font-bold text-neutral-900">
                    {valor.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    {valor.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Nossa Historia */}
        <section className="mb-16">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[280px] md:min-h-0">
                <Image
                  src="/images/sobre-dreams.jpg"
                  alt="Where Dreams Reside — FYMOOB Imobiliaria"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 md:p-10">
                <h2 className="font-display text-2xl font-bold text-neutral-900">Nossa Historia</h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600">
                  <p>
                    A FYMOOB nasceu da vontade de transformar a experiencia de comprar, vender e alugar imoveis em Curitiba. Nossos fundadores identificaram que o mercado imobiliario carecia de uma abordagem mais moderna, transparente e focada no cliente.
                  </p>
                  <p>
                    Com sede no bairro Portao, atuamos em mais de 65 bairros da cidade, atendendo desde quem busca seu primeiro apartamento ate investidores que procuram oportunidades de alto retorno.
                  </p>
                  <p className="font-medium text-neutral-900">
                    Na FYMOOB, cada imovel e mais do que uma propriedade — e o inicio de uma nova historia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Por que a FYMOOB */}
        <section className="mb-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-neutral-900">
            Por que escolher a FYMOOB?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Building2, title: "Portfolio diversificado", text: "Mais de 250 imoveis ativos em 65 bairros, com opcoes para todos os perfis e orcamentos." },
              { icon: Users, title: "Atendimento personalizado", text: "Nao somos um portal. Somos corretores que conhecem cada imovel e cada bairro de Curitiba." },
              { icon: Award, title: "CRECI ativo e regularizado", text: "Registro CRECI J 9420. Todas as transacoes seguem as normas do COFECI e legislacao vigente." },
              { icon: MapPin, title: "Especialistas em Curitiba", text: "Conhecemos os bairros, as tendencias de valorizacao e as melhores oportunidades da cidade." },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex gap-4 rounded-xl border border-neutral-100 bg-neutral-50 p-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                    <Icon className="size-4 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-neutral-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-neutral-500">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Localizacao */}
        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-neutral-900">
            Nosso Escritorio
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-brand-primary" />
                  <div>
                    <p className="font-medium text-neutral-900">Rua Engenheiro Heitor Soares Gomes, 778</p>
                    <p className="text-sm text-neutral-500">Esquina — Bairro Portao, Curitiba/PR — CEP 80330-350</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-5 shrink-0 text-brand-primary" />
                  <div>
                    <a href="tel:+554199978-0517" className="font-medium text-neutral-900 hover:text-brand-primary">(41) 99978-0517</a>
                    <span className="mx-2 text-neutral-300">|</span>
                    <a href="tel:+554132655051" className="text-sm text-neutral-500 hover:text-brand-primary">(41) 3265-5051</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="size-5 shrink-0 text-brand-primary" />
                  <a href="mailto:fymoob@gmail.com" className="font-medium text-neutral-900 hover:text-brand-primary">fymoob@gmail.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="size-5 shrink-0 text-brand-primary" />
                  <span className="text-sm text-neutral-500">Seg-Sex 9h as 18h | Sab 9h as 13h</span>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-neutral-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.5!2d-49.2935!3d-25.4615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI3JzQxLjQiUyA0OcKwMTcnMzYuNiJX!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 250 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localizacao FYMOOB Imobiliaria"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-neutral-950 p-8 text-center sm:p-12">
          <p className="font-display text-2xl font-bold text-white">
            Pronto para encontrar seu imovel?
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm text-neutral-400">
            Explore nosso portfolio com mais de 250 imoveis em Curitiba ou entre em contato para um atendimento personalizado.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/busca"
              className="inline-flex items-center rounded-full bg-brand-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
            >
              Buscar imoveis
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center rounded-full border border-neutral-600 px-7 py-3 text-sm font-semibold text-white transition hover:border-neutral-400"
            >
              Falar com um corretor
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
