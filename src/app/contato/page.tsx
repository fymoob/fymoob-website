import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { ContactForm } from "@/components/shared/ContactForm"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Contato | FYMOOB Imobiliaria Curitiba",
  description:
    "Entre em contato com a FYMOOB Imobiliaria. WhatsApp, telefone, e-mail ou visite nosso escritorio no Portao, Curitiba. Atendimento personalizado para compra, venda e locacao.",
  alternates: {
    canonical: "/contato",
  },
}

const FYMOOB_PHONE = "5541999780517"
const WA_URL = `https://wa.me/${FYMOOB_PHONE}?text=${encodeURIComponent("Ola! Gostaria de mais informacoes sobre os imoveis da FYMOOB.")}`

const contatoInfo = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "(41) 99978-0517",
    href: WA_URL,
    description: "Resposta rapida, geralmente em minutos",
    highlight: true,
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "(41) 3265-5051",
    href: "tel:+554132655051",
    description: "Horario comercial",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "fymoob@gmail.com",
    href: "mailto:fymoob@gmail.com",
    description: "Respondemos em ate 24 horas",
  },
  {
    icon: MapPin,
    label: "Escritorio",
    value: "Rua Eng. Heitor Soares Gomes, 778",
    href: "https://www.google.com/maps/search/?api=1&query=Rua+Engenheiro+Heitor+Soares+Gomes+778+Portao+Curitiba+PR",
    description: "Portao, Curitiba/PR — CEP 80330-350",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Seg a Sex: 9h as 18h",
    description: "Sabado: 9h as 13h",
  },
]

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-2 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Contato", url: "/contato" },
        ]}
      />

      {/* Hero */}
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-fymoob-gray-dark sm:text-4xl">
          Fale conosco
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-fymoob-gray-mid">
          Estamos prontos para ajudar voce a encontrar o imovel ideal em
          Curitiba. Escolha o canal que preferir.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contatoInfo.map((item) => {
          const Icon = item.icon
          const Wrapper = item.href ? "a" : "div"
          const wrapperProps = item.href
            ? {
                href: item.href,
                target: item.href.startsWith("http") ? "_blank" as const : undefined,
                rel: item.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined,
              }
            : {}

          return (
            <Wrapper
              key={item.label}
              {...wrapperProps}
              className={`group rounded-xl border p-5 transition ${
                item.highlight
                  ? "border-[#25D366]/30 bg-[#25D366]/5 hover:border-[#25D366]/50 hover:shadow-md"
                  : "border-neutral-200 bg-white hover:border-brand-primary/30 hover:shadow-md"
              } ${item.href ? "cursor-pointer" : ""}`}
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10">
                <Icon
                  className={`size-5 ${
                    item.highlight ? "text-[#25D366]" : "text-brand-primary"
                  }`}
                />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-fymoob-gray-mid">
                {item.label}
              </p>
              <p className="mt-1 font-display font-bold text-fymoob-gray-dark">
                {item.value}
              </p>
              {item.description && (
                <p className="mt-1 text-xs text-fymoob-gray-mid">
                  {item.description}
                </p>
              )}
            </Wrapper>
          )
        })}
      </div>

      {/* Form + Map grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          <h2 className="mb-4 font-display text-2xl font-bold text-fymoob-gray-dark">
            Envie sua mensagem
          </h2>
          <p className="mb-6 text-sm text-fymoob-gray-mid">
            Preencha o formulario e retornaremos o mais breve possivel.
          </p>
          <ContactForm />
        </div>

        {/* Map */}
        <div>
          <h2 className="mb-4 font-display text-2xl font-bold text-fymoob-gray-dark">
            Como chegar
          </h2>
          <div className="overflow-hidden rounded-xl border border-neutral-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.5!2d-49.2935!3d-25.4615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI3JzQxLjQiUyA0OcKwMTcnMzYuNiJX!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localizacao FYMOOB Imobiliaria - Portao, Curitiba"
              className="w-full"
            />
          </div>
          <p className="mt-3 text-xs text-fymoob-gray-mid">
            Estacionamento disponivel na rua. Proximo ao Terminal do Portao.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-8 text-center">
        <p className="font-display text-xl font-bold text-brand-primary">
          Prefere atendimento imediato?
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-fymoob-gray-mid">
          Chame no WhatsApp e fale diretamente com um de nossos corretores.
          Atendimento rapido e personalizado.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1da851]"
        >
          <MessageCircle size={16} />
          Chamar no WhatsApp
        </a>
      </div>
    </div>
  )
}
