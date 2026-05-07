"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

interface EmpreendimentoMobileMenuProps {
  empreendimentoNome: string
  whatsUrl: string
  /** Links de seção do empreendimento (PLANTAS, PREÇOS, LAZER, LOCALIZAÇÃO) */
  sections: { href: string; label: string }[]
}

/**
 * Sprint design 06/05/2026.
 *
 * Mobile menu hamburger pro smart nav do empreendimento. Substitui o scroll
 * horizontal do nav (que cortava as letras dos links em viewports pequenos).
 * Reutiliza Sheet do shadcn (`@/components/ui/sheet`) — base-ui dialog
 * com backdrop blur sutil, abertura side="right".
 *
 * Layout interno:
 * - Header serif italic com nome do empreendimento
 * - Link "Voltar para home" (chip discreto outline)
 * - Links de secao (4 anchor links pra plantas, precos, lazer, localizacao)
 * - CTA verde profundo "Agendar visita" no rodape
 *
 * Visivel apenas em mobile (`md:hidden`). Desktop continua mostrando os
 * links inline no nav.
 *
 * Estado controlado (useState) — base-ui dialog nao suporta `asChild`,
 * entao fechamento manual via setOpen(false) onClick dos links.
 */
export function EmpreendimentoMobileMenu({
  empreendimentoNome,
  whatsUrl,
  sections,
}: EmpreendimentoMobileMenuProps) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Abrir menu de navegação"
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/85 transition hover:border-white/45 hover:text-white md:hidden"
      >
        <Menu className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[78vw] max-w-sm border-l border-white/10 bg-[#0a0a0a] text-white"
      >
        <SheetTitle className="sr-only">
          Menu — {empreendimentoNome}
        </SheetTitle>

        <div className="flex h-full flex-col px-7 pb-9 pt-12">
          {/* Header — caption + nome do empreendimento */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a876]/80">
              Navegação
            </p>
            <p className="mt-3 font-serif text-xl font-light italic tracking-tight text-white/95">
              {empreendimentoNome}
            </p>
            <div
              aria-hidden="true"
              className="mt-5 h-px w-10 bg-[#c9a876]/60"
            />
          </div>

          {/* Voltar pra home — pedido Vinicius 06/05/2026.
              Link discreto no topo, separado da lista de secoes. Seta + texto. */}
          <Link
            href="/"
            onClick={close}
            className="mt-7 inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white/65 transition hover:border-white/35 hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
            Voltar para home
          </Link>

          {/* Lista de seções */}
          <nav className="mt-9 flex flex-1 flex-col gap-1">
            {sections.map((section) => (
              <a
                key={section.href}
                href={section.href}
                onClick={close}
                className="-mx-2 rounded-lg px-2 py-3 text-[12px] uppercase tracking-[0.25em] text-white/85 transition hover:bg-white/5 hover:text-[#c9a876]"
              >
                {section.label}
              </a>
            ))}
          </nav>

          {/* CTA verde profundo no rodapé do drawer */}
          <a
            href={whatsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            data-track="whatsapp_click"
            data-source="navbar_mobile_menu"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#246B4E] px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] text-white shadow-md transition hover:bg-[#2B7D5A]"
          >
            Agendar visita privativa
          </a>
        </div>
      </SheetContent>
    </Sheet>
  )
}
