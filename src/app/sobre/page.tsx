import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { Shield, Target, Users, Award, MapPin, Phone, Mail, Building2, Handshake, TrendingUp } from "lucide-react"

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
    title: "Transparencia",
    description:
      "Todas as informacoes sobre o imovel sao claras e verificadas. Sem surpresas, sem letras miudas.",
  },
  {
    icon: Target,
    title: "Precisao",
    description:
      "Conectamos voce ao imovel ideal com base nas suas necessidades reais, nao apenas no que temos disponivel.",
  },
  {
    icon: Handshake,
    title: "Compromisso",
    description:
      "Acompanhamos cada etapa da negociacao ate a entrega das chaves. Seu sonho e nossa responsabilidade.",
  },
  {
    icon: TrendingUp,
    title: "Inovacao",
    description:
      "Tecnologia de ponta para que voce encontre, visite e negocie seu imovel com agilidade e seguranca.",
  },
]

const diferenciais = [
  { number: "249+", label: "Imoveis ativos" },
  { number: "65", label: "Bairros em Curitiba" },
  { number: "113", label: "Empreendimentos" },
  { number: "CRECI J 9420", label: "Registro ativo" },
]

export default function SobrePage() {
  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-2 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Sobre nos", url: "/sobre" },
          ]}
        />

        {/* Hero */}
        <div className="mb-14">
          <h1 className="font-display text-3xl font-bold text-fymoob-gray-dark sm:text-4xl">
            Sobre a FYMOOB
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-fymoob-gray-mid">
            Somos uma imobiliaria curitibana com um proposito claro:{" "}
            <strong className="text-fymoob-gray-dark">
              conectar pessoas aos melhores imoveis de Curitiba
            </strong>{" "}
            com transparencia, tecnologia e atendimento humano. Cada cliente e
            unico, e tratamos cada negociacao com o cuidado que ela merece.
          </p>
        </div>

        {/* Numbers */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {diferenciais.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-neutral-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="font-display text-2xl font-bold text-brand-primary">
                {item.number}
              </p>
              <p className="mt-1 text-sm text-fymoob-gray-mid">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Nossa Historia */}
        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-fymoob-gray-dark">
            Nossa Historia
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-fymoob-gray-mid">
            <p>
              A FYMOOB nasceu da vontade de transformar a experiencia de comprar,
              vender e alugar imoveis em Curitiba. Nossos fundadores, Bruno Cesar
              e Wagner, identificaram que o mercado imobiliario carecia de uma
              abordagem mais moderna, transparente e focada no cliente.
            </p>
            <p>
              Com sede no bairro Portao, uma das regioes mais estrategicas de
              Curitiba, atuamos em mais de 65 bairros da cidade, atendendo desde
              quem busca seu primeiro apartamento ate investidores experientes que
              procuram oportunidades de alto retorno.
            </p>
            <p>
              Nosso portfolio inclui apartamentos, casas, sobrados, terrenos e
              empreendimentos em lancamento. Cada imovel e selecionado, verificado
              e apresentado com todas as informacoes que voce precisa para tomar a
              melhor decisao.
            </p>
          </div>
        </section>

        {/* Valores */}
        <section className="mb-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-fymoob-gray-dark">
            Nossos Valores
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {valores.map((valor) => {
              const Icon = valor.icon
              return (
                <div
                  key={valor.title}
                  className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-brand-primary/30 hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10">
                    <Icon className="size-5 text-brand-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-fymoob-gray-dark">
                    {valor.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fymoob-gray-mid">
                    {valor.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Por que a FYMOOB */}
        <section className="mb-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-fymoob-gray-dark">
            Por que escolher a FYMOOB?
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: Building2,
                title: "Portfolio diversificado",
                text: "Mais de 249 imoveis ativos em 65 bairros, com opcoes para todos os perfis e orcamentos.",
              },
              {
                icon: Users,
                title: "Atendimento personalizado",
                text: "Nao somos um portal. Somos corretores que conhecem cada imovel e cada bairro de Curitiba.",
              },
              {
                icon: Award,
                title: "CRECI ativo e regularizado",
                text: "Registro CRECI J 9420. Todas as transacoes seguem as normas do COFECI e legislacao vigente.",
              },
              {
                icon: MapPin,
                title: "Especialistas em Curitiba",
                text: "Conhecemos os bairros, as tendencias de valorizacao e as melhores oportunidades da cidade.",
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-lg border border-neutral-100 bg-neutral-50 p-5"
                >
                  <Icon className="mt-0.5 size-5 shrink-0 text-brand-primary" />
                  <div>
                    <h3 className="font-display font-bold text-fymoob-gray-dark">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-fymoob-gray-mid">
                      {item.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Localizacao */}
        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-fymoob-gray-dark">
            Nossa Localizacao
          </h2>
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-brand-primary" />
                  <div>
                    <p className="font-medium text-fymoob-gray-dark">
                      Rua Engenheiro Heitor Soares Gomes, 778
                    </p>
                    <p className="text-sm text-fymoob-gray-mid">
                      Esquina — Bairro Portao, Curitiba/PR — CEP 80330-350
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-5 shrink-0 text-brand-primary" />
                  <div>
                    <a
                      href="tel:+554199978-0517"
                      className="font-medium text-fymoob-gray-dark hover:text-brand-primary"
                    >
                      (41) 99978-0517
                    </a>
                    <span className="mx-2 text-neutral-300">|</span>
                    <a
                      href="tel:+554132655051"
                      className="text-sm text-fymoob-gray-mid hover:text-brand-primary"
                    >
                      (41) 3265-5051
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="size-5 shrink-0 text-brand-primary" />
                  <a
                    href="mailto:fymoob@gmail.com"
                    className="font-medium text-fymoob-gray-dark hover:text-brand-primary"
                  >
                    fymoob@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-8 text-center">
          <p className="font-display text-xl font-bold text-brand-primary">
            Pronto para encontrar seu imovel?
          </p>
          <p className="mx-auto mt-2 max-w-lg text-sm text-fymoob-gray-mid">
            Explore nosso portfolio com mais de 249 imoveis em Curitiba ou entre em
            contato para um atendimento personalizado.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/busca"
              className="inline-flex items-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
            >
              Buscar imoveis
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center rounded-full border border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/5"
            >
              Falar com um corretor
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
