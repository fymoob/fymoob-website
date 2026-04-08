import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { AnimatedCounter } from "@/components/shared/AnimatedCounter"
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
  Star,
  Trophy,
  ExternalLink,
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

const avaliacoesGoogle = [
  {
    nome: "Christina Silva",
    texto: "Atendimento impecável, consegui realizar o sonho da casa própria, através do atendimento do Bruno e após uns anos foi a vez da minha filha realizar o sonho e sim o Bruno estava junto em mais uma conquista. Indico de olhos fechados, pois entrega um atendimento humanizado, procurando atender a necessidade de cada cliente.",
    foto: "https://lh3.googleusercontent.com/a/ACg8ocKYIzGQghB8Mi2GF_E4xplwtLq2_s2D29iYG-kN51Pkc73h4A=w128-h128-p-rp-mo-br100",
    estrelas: 5,
  },
  {
    nome: "Andgelica Schneider",
    texto: "O corretor Lisboa atende com dedicação, empatia e muita atenção! Sempre faz tudo o que é possível para resolver os impasses que possam dificultar a locação. Além de ser muito honesto e ético em relação as informações do imóvel. Super recomendo os serviços do Lisboa.",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjVgepoij330vmu_Y61uRQz1NSoRo7MC4ZTDF2ONkopmxhH0fAQ=w128-h128-p-rp-mo-br100",
    estrelas: 5,
  },
  {
    nome: "Dyego Pessoa",
    texto: "Muito profissionalismo nos atendimentos e sempre dispostos a auxiliar seus clientes encontrarem os lares ideais! Não buscam só atender, mas sim compreender a necessidade! Parabéns e muito obrigado por tudo!",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjUhf3r5N5uQVUrOn1qsSXxXBaIymiJhxabZLjtcyYlCsStp2V8=w128-h128-p-rp-mo-br100",
    estrelas: 5,
  },
  {
    nome: "Viviane Souza",
    texto: "Atendimento excelente, Bruno nos deixa sempre a par dos processos, tirando dúvidas e sempre com os prazos, vc nunca fica perdido. Tenta sempre ajustar os horarios para melhor te atender. Imobiliária de fácil localização.",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjVWCGOdxWsdiT5t4ZsLmyvbBv7DUmytlPVgCFDfhzhUBNds3AY=w128-h128-p-rp-mo-ba5-br100",
    estrelas: 5,
  },
  {
    nome: "Wagner Lima",
    texto: "Profissional Bruno é diferenciado, atencioso, paciente, conduziu todo o processo com muita competência. Certamente realizaremos muitos outros negócios, sempre é bom contar com profissionais que fazem a diferença.",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjVPlkj-Qq25ADuXh_1UfrjtCvnvyoqAdDWfh08W64oJGnBshhi4=w128-h128-p-rp-mo-br100",
    estrelas: 5,
  },
  {
    nome: "Josiane Cardoso",
    texto: "Foi incrível, atendimento excelente, simpatia, profissionalismo. Me ajudou em tudo que precisei, não deixou nenhuma dúvida. Esclarecimento perfeito. Eu super recomendo o trabalho deles.",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjXWZfrGVCXvrLz6gd7kvL597LKAuBx-sOLlK__Xif6jt0PCMg7WJA=w128-h128-p-rp-mo-br100",
    estrelas: 5,
  },
  {
    nome: "Luana Alves Pereira",
    texto: "Queria deixar meus agradecimento a Imobiliária FYMOOB e a Corretora Joziane. Muito atenciosos e prestativos. Venderam nosso apartamento em 2 meses. Meu parabéns!",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjVoa51pGCCWCE9zAJWMJex3-DSC05xXksouQu81NrmxkDaESpZe-w=w128-h128-p-rp-mo-ba2-br100",
    estrelas: 5,
  },
  {
    nome: "Maria Eduarda",
    texto: "Atenciosos, competentes, um serviço completo de qualidade e rapidez. Joziane é uma corretora excelente e muito simpática.",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjXzUN4VfBRN4yZGku13QZGhhAYspC45fg13NtB_8m5KCaB7sDW9=w128-h128-p-rp-mo-br100",
    estrelas: 5,
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
          {/* Header com nota Google */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm">
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-semibold text-neutral-900">4.9</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-neutral-500">(56 avaliações)</span>
            </div>

            <h2 className="mt-6 font-display text-2xl font-bold text-neutral-900 md:text-3xl">
              O que nossos clientes dizem
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-500">
              Avaliações reais do Google de quem confiou na FYMOOB para encontrar o imóvel ideal.
            </p>
          </div>

          {/* Grid de avaliações */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {avaliacoesGoogle.map((av) => (
              <div
                key={av.nome}
                className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: av.estrelas }).map((_, j) => (
                    <Star key={j} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Texto */}
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-neutral-600">
                  &ldquo;{av.texto}&rdquo;
                </p>

                {/* Autor com foto */}
                <div className="mt-5 flex items-center gap-3 border-t border-neutral-50 pt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={av.foto}
                    alt={av.nome}
                    width={40}
                    height={40}
                    className="size-10 rounded-full bg-neutral-200"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{av.nome}</p>
                    <p className="text-xs text-neutral-400">via Google</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Link para todas as avaliações */}
          <div className="mt-8 text-center">
            <a
              href="https://www.google.com/maps/place/%F0%9F%9F%A2+Fymoob/@-25.4722847,-49.3053924,1414m/data=!3m1!1e3!4m8!3m7!1s0x94dcfbccb62e3229:0x6977db3f3145d493!8m2!3d-25.4722896!4d-49.3028175!9m1!1b1!16s%2Fg%2F11fd7g02qy?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition hover:underline"
            >
              Ver todas as 56 avaliações no Google
              <ExternalLink className="size-4" />
            </a>
          </div>
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
