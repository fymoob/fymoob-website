"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Phone, Grid3X3, Heart, GitCompareArrows, UserCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isHome) {
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
  }, [isHome])

  const isTransparent = isHome && !scrolled

  return (
    <>
      {!isHome && <div className="h-16" />}
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isTransparent
            ? "border-b border-transparent bg-transparent"
            : "border-b border-neutral-200/50 bg-white/90 backdrop-blur-xl"
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
                    ? isTransparent ? "text-white" : "text-neutral-950"
                    : isTransparent ? "text-white/80 hover:text-white" : "text-neutral-600 hover:text-brand-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Quick Menu + Phone CTA + Mobile Menu */}
          <div className="flex items-center gap-4 sm:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-300",
                  isTransparent
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
                )}
              >
                <Grid3X3 size={20} />
                <span className="sr-only">Menu rápido</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-52">
                <DropdownMenuItem className="cursor-pointer">
                  <a
                    href="https://aluguel.loft.com.br/site/login.php?i=17eb36b074cd570faf13f0c2fff538c2&tipo=cliente"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center gap-2 py-1"
                  >
                    <UserCircle size={16} className="text-brand-primary" />
                    <span className="font-medium">Área do Cliente</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/favoritos" className="flex w-full items-center gap-2 py-1">
                    <Heart size={16} className="text-rose-500" />
                    <span>Favoritos</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/comparar" className="flex w-full items-center gap-2 py-1">
                    <GitCompareArrows size={16} className="text-amber-500" />
                    <span>Comparar imóveis</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Social icons */}
            <div className="hidden items-center gap-1 lg:flex">
              {[
                { href: "https://www.instagram.com/fymoob", label: "Instagram", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                { href: "https://www.facebook.com/profile.php?id=61556949541662", label: "Facebook", d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { href: "https://www.tiktok.com/@fymoob", label: "TikTok", d: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full transition-colors duration-300",
                    isTransparent
                      ? "text-white/60 hover:text-white"
                      : "text-neutral-400 hover:text-brand-primary"
                  )}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-[14px]">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>

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
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                id="mobile-menu-trigger"
                className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg"
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
                  <Link href="/comparar" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
                    <GitCompareArrows size={18} className="text-amber-500" />
                    Comparar imóveis
                  </Link>
                </div>
                <div className="border-t border-neutral-100 px-5 py-5 space-y-3">
                  <Link href="/busca" className="flex h-10 w-full items-center justify-center rounded-full bg-brand-primary text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover">
                    Buscar imóvel
                  </Link>
                  <a href="tel:+554199978-0517" className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-500">
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
