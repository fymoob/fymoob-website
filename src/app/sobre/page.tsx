import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
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
  User,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Sobre a FYMOOB | Imobiliária em Curitiba",
  description:
    "Conheça a FYMOOB Imobiliária — especialistas em compra, venda e locação de imóveis em Curitiba. CRECI J 9420. Atendimento personalizado e transparente.",
  alternates: { canonical: "/sobre" },
}

const valores = [
  { icon: Shield, title: "Integridade", description: "Transparência e honestidade em cada negociação." },
  { icon: Sparkles, title: "Inovação", description: "Soluções modernas para superar expectativas." },
  { icon: Target, title: "Personalização", description: "Atendimento feito sob medida para você." },
  { icon: Award, title: "Excelência", description: "Qualidade impecável em cada detalhe." },
]

const diferenciais = [
  { number: "250+", label: "Imóveis ativos", icon: Building2 },
  { number: "65", label: "Bairros atendidos", icon: MapPin },
  { number: "113", label: "Empreendimentos", icon: TrendingUp },
  { number: "J 9420", label: "CRECI ativo", icon: Award },
]

const etapas = [
  { num: "01", title: "Portfólio diversificado", text: "Mais de 250 imóveis ativos em 65 bairros de Curitiba, com opções para todos os perfis e orçamentos." },
  { num: "02", title: "Atendimento personalizado", text: "Não somos um portal. Somos corretores que conhecem cada imóvel e cada bairro de Curitiba." },
  { num: "03", title: "Segurança jurídica", text: "Registro CRECI J 9420. Todas as transações seguem as normas do COFECI e legislação vigente." },
  { num: "04", title: "Especialistas em Curitiba", text: "Conhecemos os bairros, as tendências de valorização e as melhores oportunidades da cidade." },
]

const equipe = [
  { nome: "Bruno Cesar de Almeida", cargo: "Sócio e Responsável técnico" },
  { nome: "Wagner Spessatto", cargo: "Sócio" },
]

export default function SobrePage() {
  return (
    <>
      {/* ══════ HERO — Dark gradient mesh ══════ */}
      <section className="relative overflow-hidden bg-neutral-950 py-24 md:py-32">
        {/* Glow accents */}
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-brand-primary/10 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-brand-primary/5 blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Sobre nós", url: "/sobre" },
            ]}
          />
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Quem Nós Somos
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
            Na FYMOOB, transformamos a busca pelo lar ideal em uma experiência única e personalizada. Mais do que imóveis, entregamos{" "}
            <span className="text-brand-primary font-semibold">lares que refletem seus sonhos e estilo de vida.</span>
          </p>
        </div>
      </section>

      {/* ══════ STATS — Dark cards ══════ */}
      <section className="bg-neutral-900 py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {diferenciais.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-primary/15">
                  <Icon className="size-5 text-brand-primary" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-white">{item.number}</p>
                  <p className="text-xs text-neutral-500">{item.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ══════ MISSÃO E VISÃO — Gradient cards ══════ */}
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-brand-primary/10 bg-gradient-to-br from-white to-brand-primary/5 p-8 transition hover:shadow-lg hover:shadow-brand-primary/5">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-primary/10">
              <Handshake className="size-7 text-brand-primary" />
            </div>
            <h2 className="font-display text-xl font-bold text-neutral-900">Nossa Missão</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Guiar você em cada etapa da jornada imobiliária, com confiança, transparência e excelência, garantindo que sua experiência seja segura e satisfatória.
            </p>
          </div>
          <div className="rounded-2xl border border-brand-primary/10 bg-gradient-to-br from-white to-brand-primary/5 p-8 transition hover:shadow-lg hover:shadow-brand-primary/5">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-primary/10">
              <TrendingUp className="size-7 text-brand-primary" />
            </div>
            <h2 className="font-display text-xl font-bold text-neutral-900">Nossa Visão</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Redefinir o padrão de atendimento no mercado imobiliário, inovando para conectar pessoas ao lar perfeito, onde felicidade e bem-estar começam.
            </p>
          </div>
        </div>
      </section>

      {/* ══════ VALORES — Hover premium ══════ */}
      <section className="bg-stone-50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-neutral-900 md:text-3xl">
            Nossos Valores
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map((valor) => {
              const Icon = valor.icon
              return (
                <div
                  key={valor.title}
                  className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-neutral-900">{valor.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">{valor.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════ NOSSA HISTÓRIA — Premium split ══════ */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-stone-50">
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[300px] md:min-h-0">
                <Image
                  src="/images/sobre-dreams.jpg"
                  alt="Where Dreams Reside — FYMOOB Imobiliária"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">Nossa História</h2>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-600">
                  <p>
                    A FYMOOB nasceu da vontade de transformar a experiência de comprar, vender e alugar imóveis em Curitiba. Nossos fundadores identificaram que o mercado imobiliário carecia de uma abordagem mais moderna, transparente e focada no cliente.
                  </p>
                  <p>
                    Com sede no bairro Portão, atuamos em mais de 65 bairros da cidade, atendendo desde quem busca seu primeiro apartamento até investidores que procuram oportunidades de alto retorno.
                  </p>
                  <p className="border-l-2 border-brand-primary pl-4 italic text-neutral-800">
                    &ldquo;Na FYMOOB, cada imóvel é mais do que uma propriedade — é o início de uma nova história.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ DIRETORIA — Placeholder cards ══════ */}
      <section className="bg-neutral-950 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">A Diretoria</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {equipe.map((membro) => (
              <div
                key={membro.nome}
                className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-brand-primary/30 hover:bg-white/10"
              >
                {/* Placeholder avatar — replace with <Image src="/images/team/bruno.jpg"> when available */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-brand-primary/15">
                  <User className="size-10 text-brand-primary/60" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-white">{membro.nome}</p>
                  <p className="text-sm text-brand-primary">{membro.cargo}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-500">
            Estamos ao seu lado para orientar, entender seus desejos e transformar a escolha do seu novo lar em uma experiência marcada por confiança, agilidade e total transparência.
          </p>
        </div>
      </section>

      {/* ══════ POR QUE ESCOLHER — Numbered steps (Jota8 style) ══════ */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-neutral-900 md:text-3xl">
            Padrão FYMOOB em Cada Etapa
          </h2>
          <div className="mt-12 space-y-6">
            {etapas.map((etapa, i) => (
              <div
                key={etapa.num}
                className={`flex flex-col gap-6 rounded-2xl border border-neutral-200 p-6 transition hover:border-brand-primary/20 hover:shadow-md md:flex-row md:items-center md:p-8 ${
                  i % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-brand-primary/5">
                  <span className="font-display text-3xl font-bold text-brand-primary/30">{etapa.num}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-neutral-900">{etapa.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">{etapa.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ ESCRITÓRIO — Contato + Mapa ══════ */}
      <section className="bg-stone-50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">Nosso Escritório</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-brand-primary" />
                  <div>
                    <p className="font-medium text-neutral-900">Rua Engenheiro Heitor Soares Gomes, 778</p>
                    <p className="text-sm text-neutral-500">Esquina — Bairro Portão, Curitiba/PR — CEP 80330-350</p>
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
                  <span className="text-sm text-neutral-500">Seg-Sex 9h às 18h | Sáb 9h às 13h</span>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-neutral-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.5!2d-49.2935!3d-25.4615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI3JzQxLjQiUyA0OcKwMTcnMzYuNiJX!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 280 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização FYMOOB Imobiliária"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CTA — Dark gradient mesh ══════ */}
      <section className="relative overflow-hidden bg-neutral-950 py-16 md:py-20">
        <div className="absolute -right-32 top-0 h-64 w-64 rounded-full bg-brand-primary/10 blur-[100px]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-display text-2xl font-bold text-white md:text-3xl">
            Pronto para encontrar seu imóvel?
          </p>
          <p className="mx-auto mt-4 max-w-lg text-sm text-neutral-400">
            Explore nosso portfólio com mais de 250 imóveis em Curitiba ou entre em contato para um atendimento personalizado.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/busca"
              className="inline-flex items-center rounded-full bg-brand-primary px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-primary-hover hover:shadow-lg hover:shadow-brand-primary/20"
            >
              Buscar imóveis
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center rounded-full border border-neutral-600 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-neutral-400 hover:bg-white/5"
            >
              Falar com um corretor
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
