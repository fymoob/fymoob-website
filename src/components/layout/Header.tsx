"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
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
  const isHome = pathname === "/"
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }

    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHome])

  const isTransparent = isHome && !scrolled

  return (
    <>
    {/* Spacer for fixed header on non-home pages */}
    {!isHome && <div className="h-16" />}
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isTransparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-neutral-200/50 bg-white/90 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="FYMOOB Imobiliária"
            width={130}
            height={80}
            priority
            className={cn(
              "h-9 w-auto transition-all duration-300",
              isTransparent && "brightness-0 invert"
            )}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-display text-sm font-medium transition-colors duration-300",
                pathname === link.href
                  ? isTransparent
                    ? "text-white"
                    : "text-neutral-950"
                  : isTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-neutral-600 hover:text-brand-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Phone CTA + Mobile Menu */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+554199978-0517"
            className={cn(
              "hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 lg:flex",
              isTransparent
                ? "bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
                : "bg-brand-primary text-white hover:bg-brand-primary-hover"
            )}
          >
            <Phone size={14} />
            (41) 99978-0517
          </a>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger
              id="mobile-menu-trigger"
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg"
            >
              <Menu
                size={22}
                className={cn(
                  "transition-colors duration-300",
                  isTransparent ? "text-white" : "text-neutral-950"
                )}
              />
              <span className="sr-only">Abrir menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="z-50 flex h-screen w-full max-w-full flex-col p-0 sm:h-full sm:w-[320px]"
            >
              {/* Menu header */}
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

              {/* Nav links */}
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

              {/* CTA footer */}
              <div className="border-t border-neutral-100 px-5 py-5 space-y-3">
                <Link
                  href="/busca"
                  className="flex h-10 w-full items-center justify-center rounded-full bg-brand-primary text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
                >
                  Buscar imóvel
                </Link>
                <a
                  href="tel:+554199978-0517"
                  className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-500"
                >
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
