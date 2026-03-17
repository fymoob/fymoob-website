import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre nós" },
  { href: "/busca", label: "Buscar imóvel" },
  { href: "/anuncie", label: "Anunciar" },
  { href: "/contato", label: "Contato" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
]

export function Footer() {
  return (
    <footer className="bg-neutral-950">
      <div className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1 — Logo + description */}
            <div className="space-y-4">
              <Image
                src="/logo.png"
                alt="FYMOOB Imobiliária"
                width={130}
                height={80}
                className="h-9 w-auto brightness-0 invert"
              />
              <p className="text-sm leading-relaxed text-neutral-400">
                Encontre seu imóvel ideal em Curitiba com atendimento
                personalizado e as melhores oportunidades do mercado.
              </p>
            </div>

            {/* Column 2 — FYMOOB info */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                FYMOOB
              </h3>
              <div className="space-y-3 text-sm text-neutral-400">
                <p>CRECI: J 9420</p>
                <a
                  href="tel:+554199978-0517"
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-white"
                >
                  <Phone size={14} />
                  (41) 99978-0517
                </a>
                <a
                  href="mailto:contato@fymoob.com"
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-white"
                >
                  <Mail size={14} />
                  contato@fymoob.com
                </a>
                <p className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  Curitiba, PR
                </p>
              </div>
            </div>

            {/* Column 3 — Navigation */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Navegação
              </h3>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 4 — Property types */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Imóveis
              </h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/apartamentos-curitiba"
                  className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
                >
                  Apartamentos em Curitiba
                </Link>
                <Link
                  href="/casas-curitiba"
                  className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
                >
                  Casas em Curitiba
                </Link>
                <Link
                  href="/sobrados-curitiba"
                  className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
                >
                  Sobrados em Curitiba
                </Link>
                <Link
                  href="/terrenos-curitiba"
                  className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
                >
                  Terrenos em Curitiba
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 sm:flex-row">
            <p className="text-xs text-neutral-500">
              &copy; {new Date().getFullYear()} FYMOOB Imobiliária. Todos os
              direitos reservados.
            </p>
            <p className="text-xs text-neutral-500">
              Imobiliária Certificada
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
