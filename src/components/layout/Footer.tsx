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
    <footer>
      {/* Blue stripe */}
      <div className="h-1 bg-fymoob-blue" />

      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1 — Logo + description */}
            <div className="space-y-4">
              <Image
                src="/logo.svg"
                alt="FYMOOB Imobiliária"
                width={120}
                height={40}
              />
              <p className="text-sm leading-relaxed text-fymoob-gray-mid">
                Encontre seu imóvel ideal em Curitiba com atendimento
                personalizado e as melhores oportunidades do mercado.
              </p>
            </div>

            {/* Column 2 — FYMOOB info */}
            <div className="space-y-4">
              <h3 className="font-bold text-fymoob-blue">FYMOOB</h3>
              <div className="space-y-3 text-sm text-fymoob-gray-mid">
                <p>CRECI: J 9420</p>
                <a
                  href="tel:+554199978-0517"
                  className="flex items-center gap-2 transition-colors hover:text-fymoob-blue"
                >
                  <Phone size={14} />
                  (41) 99978-0517
                </a>
                <a
                  href="mailto:contato@fymoob.com"
                  className="flex items-center gap-2 transition-colors hover:text-fymoob-blue"
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
              <h3 className="font-bold text-fymoob-blue">Navegação</h3>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-fymoob-gray-mid transition-colors hover:text-fymoob-blue"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 4 — Property types */}
            <div className="space-y-4">
              <h3 className="font-bold text-fymoob-blue">Imóveis</h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/apartamentos-curitiba"
                  className="text-sm text-fymoob-gray-mid transition-colors hover:text-fymoob-blue"
                >
                  Apartamentos em Curitiba
                </Link>
                <Link
                  href="/casas-curitiba"
                  className="text-sm text-fymoob-gray-mid transition-colors hover:text-fymoob-blue"
                >
                  Casas em Curitiba
                </Link>
                <Link
                  href="/sobrados-curitiba"
                  className="text-sm text-fymoob-gray-mid transition-colors hover:text-fymoob-blue"
                >
                  Sobrados em Curitiba
                </Link>
                <Link
                  href="/terrenos-curitiba"
                  className="text-sm text-fymoob-gray-mid transition-colors hover:text-fymoob-blue"
                >
                  Terrenos em Curitiba
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-fymoob-gray-light pt-6 sm:flex-row">
            <p className="text-xs text-fymoob-gray-mid">
              &copy; {new Date().getFullYear()} FYMOOB Imobiliária. Todos os
              direitos reservados.
            </p>
            <p className="text-xs text-fymoob-gray-mid">
              Imobiliária Certificada
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
