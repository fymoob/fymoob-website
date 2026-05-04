import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

const navLinks = [
  { href: "/sobre", label: "Sobre nos" },
  { href: "/busca", label: "Buscar imovel" },
  { href: "/anuncie", label: "Anunciar imovel" },
  { href: "/contato", label: "Contato" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "Perguntas frequentes" },
  { href: "/favoritos", label: "Favoritos" },
]

const tipoLinks = [
  { href: "/apartamentos-curitiba", label: "Apartamentos" },
  { href: "/casas-curitiba", label: "Casas" },
  { href: "/sobrados-curitiba", label: "Sobrados" },
  { href: "/terrenos-curitiba", label: "Terrenos" },
  { href: "/lancamentos", label: "Lançamentos" },
  { href: "/empreendimentos", label: "Empreendimentos" },
]

const socialLinks = [
  {
    href: "https://www.instagram.com/fymoob",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/profile.php?id=61556949541662",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@fymoob",
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
]

const bairroLinks = [
  { href: "/imoveis/batel", label: "Batel" },
  { href: "/imoveis/agua-verde", label: "Agua Verde" },
  { href: "/imoveis/bigorrilho", label: "Bigorrilho" },
  { href: "/imoveis/ecoville", label: "Ecoville" },
  { href: "/imoveis/centro", label: "Centro" },
  { href: "/imoveis/portao", label: "Portao" },
]

// Pillar pages — guias longos de alto valor SEO. Aparecem no footer
// pra reforcar internal linking (sinal de autoridade ao Google) e
// ajudar a indexar (foram pro "crawled not indexed" em D+3 pos cutover
// por falta de links internos apontando pra elas).
const pillarLinks = [
  {
    href: "/comprar-imovel-curitiba",
    label: "Como comprar imóvel em Curitiba",
    description: "Guia completo do processo",
  },
  {
    href: "/morar-em-curitiba",
    label: "Morar em Curitiba",
    description: "Guia dos melhores bairros",
  },
  {
    href: "/alugar-curitiba",
    label: "Alugar em Curitiba",
    description: "Guia completo de locação",
  },
]

export function Footer() {
  return (
    <footer className="bg-neutral-950 pb-16 md:pb-0">
      <div className="py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {/* Column 1 — Logo + description */}
            <div className="space-y-4 lg:col-span-2">
              <Image
                src="/logo.png"
                alt="FYMOOB Imobiliaria"
                width={130}
                height={80}
                className="h-9 w-auto brightness-0 invert"
              />
              <p className="max-w-xs text-sm leading-relaxed text-neutral-400">
                Uma imobiliária para você — com atendimento próximo, negociações justas e soluções sob medida.
              </p>
              <div className="space-y-2.5 text-sm text-neutral-400">
                <p className="font-medium text-neutral-300">CRECI: J 9420</p>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-brand-primary" />
                  <span>
                    Rua Eng. Heitor Soares Gomes, 778
                    <br />
                    Portao, Curitiba/PR — 80330-350
                  </span>
                </div>
                <a
                  href="tel:+5541999780517"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone size={14} className="text-brand-primary" />
                  (41) 99978-0517
                </a>
                <a
                  href="mailto:fymoob@gmail.com"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail size={14} className="text-brand-primary" />
                  fymoob@gmail.com
                </a>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-brand-primary" />
                  <span>Seg-Sex 8h30-17h | Sab 9h-13h</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition-colors hover:bg-brand-primary hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 — Navigation */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Institucional
              </h3>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://aluguel.loft.com.br/site/login.php?i=17eb36b074cd570faf13f0c2fff538c2&tipo=cliente"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  Area do Cliente
                </a>
              </nav>
            </div>

            {/* Column 3 — Property types */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Imoveis por tipo
              </h3>
              <nav className="flex flex-col gap-2">
                {tipoLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 4 — Popular neighborhoods */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Bairros populares
              </h3>
              <nav className="flex flex-col gap-2">
                {bairroLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Guias completos (pillar pages) — internal linking pro SEO */}
          <div className="mt-12 border-t border-neutral-800 pt-10">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-white">
              Guias completos
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {pillarLinks.map((pillar) => (
                <Link
                  key={pillar.href}
                  href={pillar.href}
                  className="group flex flex-col gap-1 rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 transition-colors hover:border-brand-primary/40 hover:bg-neutral-900"
                >
                  <span className="text-sm font-semibold text-neutral-200 transition-colors group-hover:text-white">
                    {pillar.label}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {pillar.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 sm:flex-row">
            <p className="text-xs text-neutral-500">
              &copy; {new Date().getFullYear()} FYMOOB Administradora de Imoveis Ltda.
              Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <Link
                href="/politica-de-privacidade"
                className="text-xs text-neutral-500 transition-colors hover:text-white"
              >
                Privacidade
              </Link>
              <span className="text-neutral-700">|</span>
              <Link
                href="/politica-editorial"
                className="text-xs text-neutral-500 transition-colors hover:text-white"
              >
                Política Editorial
              </Link>
              <span className="text-neutral-700">|</span>
              <a
                href="https://wa.me/5541999780517"
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-source="footer"
                className="text-xs text-neutral-500 transition-colors hover:text-[#25D366]"
              >
                WhatsApp
              </a>
              <span className="text-neutral-700">|</span>
              <p className="text-xs text-neutral-500">CRECI J 9420</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
