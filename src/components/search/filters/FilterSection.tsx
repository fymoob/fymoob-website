import type { ReactNode, ComponentType } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterSectionProps {
  title: string
  icon?: ComponentType<{ className?: string }>
  selectionSummary?: string | null
  activeCount?: number
  defaultOpen?: boolean
  alwaysOpen?: boolean
  children: ReactNode
}

// HTML nativo <details>/<summary> — zero JS, zero state, zero hidratacao.
// Mesmo contrato visual do anterior, mas o browser controla open/close.
// Ganho: remove "use client" da arvore, corta useState e onClick.
export function FilterSection({
  title,
  icon: Icon,
  selectionSummary,
  activeCount,
  defaultOpen = false,
  alwaysOpen = false,
  children,
}: FilterSectionProps) {
  if (alwaysOpen) {
    return (
      <section className="border-b border-neutral-100 py-4 last:border-b-0">
        <div className="mb-3 flex items-center gap-2">
          {Icon && <Icon className="size-4 text-neutral-400" />}
          <h3 className="text-sm font-semibold text-neutral-700">{title}</h3>
          {activeCount !== undefined && activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        <div>{children}</div>
      </section>
    )
  }

  return (
    <details
      open={defaultOpen || undefined}
      className="group/filter border-b border-neutral-100 py-4 last:border-b-0"
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 py-1 text-left [&::-webkit-details-marker]:hidden">
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
          {selectionSummary && (
            <span className="mt-0.5 block truncate text-xs text-neutral-500 group-open/filter:hidden">
              {selectionSummary}
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-neutral-400 transition-transform group-open/filter:rotate-180"
          )}
        />
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  )
}
