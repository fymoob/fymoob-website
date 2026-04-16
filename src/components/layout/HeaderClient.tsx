"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Phone, Heart, UserCircle } from "lucide-react"
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
  { href: "/lancamentos", label: "Lançamentos" },
  { href: "/blog", label: "Blog" },
  { href: "/anuncie", label: "Anunciar" },
  { href: "/contato", label: "Contato" },
]

export function HeaderClient() {
  const pathname = usePathname()
  const isHome = pathname === "/" || pathname === "/sobre"
  const isEmpreendimento = pathname.startsWith("/empreendimento/")
  const isAdmin = pathname.startsWith("/admin")
  const hasDarkHero = isHome
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Empreendimento pages hide the global header entirely so the landing feels
  // like it belongs to the construtora (requested by Bruno 13/04/2026).
  // Admin panel has its own layout and sidebar — no public header needed.
  if (isEmpreendimento || isAdmin) return null

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!hasDarkHero) {
      setScrolled(true)
      return
    }
    setScrolled(false)
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }
    requestAnimationFrame(handleScroll)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasDarkHero])

  const isTransparent = hasDarkHero && !scrolled
  // Header has dark background (transparent over dark hero OR dark brown when scrolled in empreendimento)
  const isDarkHeader = isTransparent || (isEmpreendimento && scrolled)

  return (
    <>
      {!hasDarkHero && <div className="h-16" />}
      <header
        className={cn(
          // Border is ALWAYS present but colored transparent when invisible.
          // This prevents a ghost white line from appearing during the class
          // transition when the border is added/removed (1px layout shift +
          // color animation-in).
          "fixed top-0 z-50 w-full border-b transition-all duration-300",
          isTransparent
            ? "border-transparent bg-transparent"
            : isEmpreendimento
              ? "border-white/5 bg-[#0d0d0d]/60 backdrop-blur-2xl"
              : "border-neutral-200/50 bg-white/90 backdrop-blur-xl"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-16 lg:px-8">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="FYMOOB Imobiliária"
              width={130}
              height={80}
              priority
              className={cn(
                "h-9 w-auto transition-all duration-300 md:h-10",
                isDarkHeader && "brightness-0 invert"
              )}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative font-display text-sm font-medium transition-colors duration-300",
                    isActive
                      ? isDarkHeader ? "text-white" : "text-neutral-950"
                      : isDarkHeader ? "text-white/80 hover:text-white" : "text-neutral-600 hover:text-brand-primary"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full",
                        isDarkHeader ? "bg-white" : "bg-brand-primary"
                      )}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Utility links + Phone CTA + Mobile Menu */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop utility links */}
            <div className="hidden items-center gap-1 lg:flex">
              <a
                href="https://aluguel.loft.com.br/site/login.php?i=17eb36b074cd570faf13f0c2fff538c2&tipo=cliente"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors duration-300",
                  isDarkHeader
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                )}
              >
                <UserCircle size={15} />
                Área do Cliente
              </a>
              <Link
                href="/favoritos"
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors duration-300",
                  isDarkHeader
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                )}
              >
                <Heart size={14} />
                Favoritos
              </Link>
            </div>

            <a
              href="tel:+5541999780517"
              className={cn(
                "hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 lg:flex",
                isDarkHeader
                  ? "bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
                  : "bg-brand-primary text-white hover:bg-brand-primary-hover"
              )}
            >
              <Phone size={14} />
              (41) 99978-0517
            </a>

            {/* Mobile Menu */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                id="mobile-menu-trigger"
                className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg"
              >
                <Menu
                  size={22}
                  className={cn(
                    "transition-colors duration-300",
                    isDarkHeader ? "text-white" : "text-neutral-950"
                  )}
                />
                <span className="sr-only">Abrir menu</span>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="z-50 flex h-screen w-full max-w-full flex-col p-0 sm:h-full sm:w-[320px]"
              >
                <div className="flex items-center border-b border-neutral-100 px-5 py-4">
                  <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
                  <Link href="/">
                    <Image
                      src="/logo.png"
                      alt="FYMOOB Imobiliária"
                      width={110}
                      height={70}
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>
                <nav className="flex flex-1 flex-col px-3 py-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-3 font-display text-sm font-medium transition-colors duration-200",
                        pathname === link.href
                          ? "bg-brand-primary/10 text-brand-primary"
                          : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="border-t border-neutral-100 px-3 py-3">
                  <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-neutral-400">Acesso rápido</p>
                  <a
                    href="https://aluguel.loft.com.br/site/login.php?i=17eb36b074cd570faf13f0c2fff538c2&tipo=cliente"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                  >
                    <UserCircle size={18} className="text-brand-primary" />
                    Área do Cliente
                  </a>
                  <Link href="/favoritos" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
                    <Heart size={18} className="text-rose-500" />
                    Favoritos
                  </Link>
                </div>
                <div className="border-t border-neutral-100 px-5 py-5 space-y-3">
                  <Link href="/busca" className="flex h-10 w-full items-center justify-center rounded-full bg-brand-primary text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover">
                    Buscar imóvel
                  </Link>
                  <a href="tel:+5541999780517" className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-500">
                    <Phone size={13} className="text-brand-primary" />
                    (41) 99978-0517
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
