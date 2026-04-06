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
]

const bairroLinks = [
  { href: "/imoveis/batel", label: "Batel" },
  { href: "/imoveis/agua-verde", label: "Agua Verde" },
  { href: "/imoveis/bigorrilho", label: "Bigorrilho" },
  { href: "/imoveis/ecoville", label: "Ecoville" },
  { href: "/imoveis/centro", label: "Centro" },
  { href: "/imoveis/portao", label: "Portao" },
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
                Imobiliaria em Curitiba especializada em compra, venda e locacao.
                Atendimento personalizado e as melhores oportunidades do mercado.
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
                  href="tel:+554199978-0517"
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
                  rel="noopener noreferrer"
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

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 sm:flex-row">
            <p className="text-xs text-neutral-500">
              &copy; {new Date().getFullYear()} FYMOOB Administradora de Imoveis Ltda.
              Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/5541999780517"
                target="_blank"
                rel="noopener noreferrer"
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
