import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { AnimatedCounter } from "@/components/shared/AnimatedCounter"
import { GoogleReviews } from "@/components/shared/GoogleReviews"
import { getAllBairros, getAllEmpreendimentos } from "@/services/loft"
import {
  Shield,
  Target,
  Sparkles,
  Award,
  MapPin,
  Phone,
  Mail,
  Building2,
  TrendingUp,
  Clock,
  GraduationCap,
  Scale,
  Trophy,
  Handshake,
  BookOpen,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Sobre a FYMOOB | Imobiliária em Curitiba",
  description:
    "Conheça a Fymoob — imobiliária em Curitiba com atendimento próximo, negociações justas e soluções sob medida. CRECI J 9420. Mais de 15 anos de experiência no mercado imobiliário.",
  alternates: { canonical: "/sobre" },
}

const valores = [
  { icon: Shield, title: "Integridade", description: "Transparência e honestidade em cada negociação." },
  { icon: Sparkles, title: "Inovação", description: "Soluções modernas para superar expectativas." },
  { icon: Target, title: "Personalização", description: "Atendimento feito sob medida para você." },
  { icon: Award, title: "Excelência", description: "Qualidade impecável em cada detalhe." },
]

// diferenciais são buscados dinamicamente na função do componente

const etapas = [
  { num: "01", title: "Portfólio diversificado", text: "Mais de 250 imóveis ativos em 65 bairros de Curitiba, com opções para todos os perfis e orçamentos." },
  { num: "02", title: "Atendimento personalizado", text: "Não somos um portal. Somos corretores que conhecem cada imóvel e cada bairro de Curitiba." },
  { num: "03", title: "Segurança jurídica", text: "Registro CRECI J 9420. Todas as transações seguem as normas do COFECI e legislação vigente." },
  { num: "04", title: "Especialistas em Curitiba", text: "Conhecemos os bairros, as tendências de valorização e as melhores oportunidades da cidade." },
]

const diretoria = [
  {
    nome: "Bruno Cesar de Almeida",
    cargo: "Sócio e Responsável técnico",
    foto: "/images/team/bruno.jpeg",
    bio: "Atuante no mercado imobiliário desde 2009, iniciou sua trajetória como auxiliar administrativo, passando por diferentes imobiliárias em Curitiba e adquirindo experiência em diversas áreas do setor.",
    credenciais: [
      { icon: Award, text: "CRECI/PR 24.494" },
      { icon: GraduationCap, text: "Formação em Negócios Imobiliários — UFPR (2015)" },
      { icon: Scale, text: "Graduação em Direito — Faculdade Curitibana (2021)" },
      { icon: Trophy, text: "Especialista em atendimento estratégico no mercado curitibano" },
    ],
    email: "brunocesar.contato@gmail.com",
  },
  {
    nome: "Wagner Spessatto",
    cargo: "Sócio",
    foto: null, // placeholder até enviar foto
    bio: "Reconhecido pelo perfil colaborativo e pela facilidade em construir boas relações, Wagner é um profissional próximo, comprometido e parceiro nos negócios. Apaixonado por leitura, está sempre disposto a auxiliar colaboradores e clientes na busca pelos melhores resultados.",
    credenciais: [
      { icon: Award, text: "CRECI/PR 39.357" },
      { icon: GraduationCap, text: "Formação em Psicologia — Faculdades Pequeno Príncipe (2017)" },
      { icon: Handshake, text: "Perfil colaborativo e parceiro nos negócios" },
      { icon: BookOpen, text: "Apaixonado por leitura e desenvolvimento pessoal" },
    ],
    email: "wagnerspessatto@gmail.com",
  },
]

export default async function SobrePage() {
  const [bairros, empreendimentos] = await Promise.all([
    getAllBairros(),
    getAllEmpreendimentos(),
  ])
  const totalImoveis = bairros.reduce((sum, b) => sum + b.total, 0)
  const totalBairros = bairros.length
  const totalEmpreendimentos = empreendimentos.length

  const diferenciais = [
    { number: totalImoveis, suffix: "+", label: "Imóveis ativos", icon: Building2 },
    { number: totalBairros, suffix: "", label: "Bairros atendidos", icon: MapPin },
    { number: totalEmpreendimentos, suffix: "", label: "Empreendimentos", icon: TrendingUp },
    { number: null, text: "J 9420", label: "CRECI ativo", icon: Award },
  ]

  return (
    <>
      {/* ══════ HERO — Imagem de fundo com overlay ══════ */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <Image
          src="/images/sobre/sobre-maior.jpeg"
          alt="Empreendimento de alto padrão com vista para o Parque Barigui — FYMOOB Imobiliária"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/50 to-neutral-900/70" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-32 pt-24 sm:px-6 lg:px-8">
          <Breadcrumbs
            variant="dark"
            items={[
              { name: "Home", url: "/" },
              { name: "Sobre nós", url: "/sobre" },
            ]}
          />
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Quem Nós Somos
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            A Fymoob é uma imobiliária que nasceu para fazer diferente. Acreditamos em negociações justas, atendimento próximo e soluções pensadas para cada cliente. Mais do que intermediar imóveis, buscamos construir{" "}
            <span className="font-semibold text-white">relações transparentes e equilibradas.</span>
          </p>

          {/* Stats inline */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {diferenciais.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Icon className="size-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-white">
                      {item.number !== null ? (
                        <AnimatedCounter end={item.number} suffix={item.suffix} />
                      ) : (
                        item.text
                      )}
                    </p>
                    <p className="text-[11px] text-white/60">{item.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════ NOSSA HISTÓRIA — Grid 2 colunas ══════ */}
      <section className="py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {/* Imagem */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-200 shadow-xl">
            <Image
              src="/images/sobre/sobre-horizontal.png"
              alt="Vista aérea de empreendimento em Curitiba — FYMOOB Imobiliária"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Textos */}
          <div>
            <h2 className="font-display text-3xl font-bold text-neutral-900">Nossa História</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-600">
              <p>
                A Fymoob nasceu no primeiro semestre de 2024, quando os sócios e amigos de infância Bruno e Wagner decidiram seguir um novo caminho. Depois de experiências anteriores, surgiu a vontade de criar uma empresa mais moderna, justa e alinhada com o que realmente acreditam — tanto nas relações internas quanto no atendimento aos clientes.
              </p>
              <p>
                O nome Fymoob carrega essa ideia. &ldquo;FY&rdquo; vem de uma expressão popular nas redes sociais que significa &ldquo;for you&rdquo; (para você), enquanto &ldquo;moob&rdquo; é uma forma estilizada da palavra imobiliária. Juntos, representam uma proposta simples: uma imobiliária para você.
              </p>
              <p>
                Essa essência está presente em tudo que fazemos. Buscamos um atendimento próximo, personalizado e sem fórmulas prontas, porque cada cliente é único — e cada negociação também. Nosso objetivo é sempre encontrar o melhor equilíbrio para todos os envolvidos.
              </p>
              <p className="border-l-2 border-brand-primary pl-4 italic text-neutral-800">
                &ldquo;Mesmo sendo uma empresa jovem, a Fymoob conta com uma equipe que soma mais de 15 anos de experiência no mercado imobiliário, unindo visão atual e prática para entregar resultados reais.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ VALORES ══════ */}
      <section className="bg-neutral-50 py-20">
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

      {/* ══════ DIRETORIA — Premium Profile Cards (E-E-A-T) ══════ */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-white md:text-3xl">
            A Diretoria
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-400">
            Profissionais com experiência e formação dedicados a oferecer o melhor atendimento no mercado imobiliário de Curitiba.
          </p>

          <div className="mt-12 space-y-8">
            {diretoria.map((membro) => (
              <div
                key={membro.nome}
                className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/10 md:flex-row"
              >
                {/* Foto */}
                <div className="relative w-full shrink-0 bg-neutral-200 md:w-2/5 xl:w-1/3">
                  {membro.foto ? (
                    <Image
                      src={membro.foto}
                      alt={`${membro.nome} — ${membro.cargo} da FYMOOB`}
                      width={600}
                      height={800}
                      className="h-full w-full object-cover"
                      style={{ aspectRatio: "4/5" }}
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  ) : (
                    <div className="flex aspect-[4/5] items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-300">
                          <span className="font-display text-2xl font-bold text-neutral-500">
                            {membro.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="flex w-full flex-col justify-center p-8 md:p-12">
                  <h3 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
                    {membro.nome}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand-primary">
                    {membro.cargo}
                  </p>

                  <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                    {membro.bio}
                  </p>

                  {membro.credenciais.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {membro.credenciais.map((cred) => {
                        const Icon = cred.icon
                        return (
                          <li key={cred.text} className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                              <Icon className="size-4 text-brand-primary" />
                            </div>
                            <span className="text-sm text-neutral-700">{cred.text}</span>
                          </li>
                        )
                      })}
                    </ul>
                  )}

                  {membro.email && (
                    <div className="mt-6 pt-4 border-t border-neutral-100">
                      <a
                        href={`mailto:${membro.email}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-brand-primary"
                      >
                        <Mail className="size-4" />
                        {membro.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PROVA SOCIAL — Avaliações Google (reais) ══════ */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <GoogleReviews variant="full" />
        </div>
      </section>

      {/* ══════ PADRÃO FYMOOB — Steps ══════ */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-neutral-900 md:text-3xl">
            Padrão FYMOOB em Cada Etapa
          </h2>
          <div className="mt-12 space-y-6">
            {etapas.map((etapa, i) => (
              <div
                key={etapa.num}
                className={`flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-brand-primary/20 hover:shadow-md md:flex-row md:items-center md:p-8 ${
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
      <section className="py-20">
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
                  <span className="text-sm text-neutral-500">Seg-Sex 8h30 às 17h | Sáb 9h às 13h</span>
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

      {/* ══════ CTA ══════ */}
      <section className="relative overflow-hidden bg-neutral-950 py-20">
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
