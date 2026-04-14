"use client"

import { useState, type ReactNode, type ComponentType } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterSectionProps {
  title: string
  icon?: ComponentType<{ className?: string }>
  /** Shown next to the title when the section is collapsed (e.g. "2 selecionados", "Batel, Bigorrilho"). */
  selectionSummary?: string | null
  /** Number of active selections — renders a small badge when > 0. */
  activeCount?: number
  /** If true, starts expanded. If false (default), starts collapsed. */
  defaultOpen?: boolean
  /** If true, behaves as a static section (always open, no toggle). Useful for short sections. */
  alwaysOpen?: boolean
  children: ReactNode
}

export function FilterSection({
  title,
  icon: Icon,
  selectionSummary,
  activeCount,
  defaultOpen = false,
  alwaysOpen = false,
  children,
}: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen || alwaysOpen)
  const isOpen = alwaysOpen || open

  return (
    <section className="border-b border-neutral-100 py-4 last:border-b-0">
      {alwaysOpen ? (
        <div className="mb-3 flex items-center gap-2">
          {Icon && <Icon className="size-4 text-neutral-400" />}
          <h3 className="text-sm font-semibold text-neutral-700">{title}</h3>
          {activeCount !== undefined && activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-2 py-1 text-left"
          aria-expanded={isOpen}
        >
          {Icon && <Icon className="size-4 shrink-0 text-neutral-400" />}
          <span className="flex-1">
            <span className="flex items-center gap-2">
              <span className="text-sm font-semibold text-neutral-700">{title}</span>
              {activeCount !== undefined && activeCount > 0 && (
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-white">
                  {activeCount}
                </span>
              )}
            </span>
            {!isOpen && selectionSummary && (
              <span className="mt-0.5 block truncate text-xs text-neutral-500">
                {selectionSummary}
              </span>
            )}
          </span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-neutral-400 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>
      )}

      {isOpen && <div className={alwaysOpen ? "" : "mt-3"}>{children}</div>}
    </section>
  )
}
