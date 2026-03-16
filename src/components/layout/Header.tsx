"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre nós" },
  { href: "/busca", label: "Buscar" },
  { href: "/blog", label: "Blog" },
  { href: "/anuncie", label: "Anunciar" },
  { href: "/contato", label: "Contato" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-fymoob-gray-light bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="FYMOOB Imobiliária"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-display text-sm font-medium transition-colors hover:text-fymoob-blue-dark",
                pathname === link.href
                  ? "text-fymoob-gray-dark"
                  : "text-fymoob-blue"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Phone + Mobile Menu */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+554199978-0517"
            className="hidden items-center gap-1.5 text-sm text-fymoob-gray-dark lg:flex"
          >
            <Phone size={14} className="text-fymoob-blue" />
            (41) 99978-0517
          </a>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu size={24} className="text-fymoob-gray-dark" />
              <span className="sr-only">Abrir menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-display text-lg font-semibold text-fymoob-blue">
                Menu
              </SheetTitle>
              <nav className="mt-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-display text-base font-medium transition-colors hover:text-fymoob-blue-dark",
                      pathname === link.href
                        ? "text-fymoob-gray-dark"
                        : "text-fymoob-blue"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 border-t border-fymoob-gray-light pt-6">
                <a
                  href="tel:+554199978-0517"
                  className="flex items-center gap-2 text-sm text-fymoob-gray-dark"
                >
                  <Phone size={14} className="text-fymoob-blue" />
                  (41) 99978-0517
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
