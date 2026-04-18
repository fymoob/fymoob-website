import { cn } from "@/lib/utils"

type BadgeVariant = "type" | "sale" | "rent" | "dual" | "code"

interface PropertyBadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

// Paleta pastel alinhada com pills dos cards (PropertyCardGrid/List/Compact)
// — mesmo sistema visual em cards e detail page.
export function PropertyBadge({
  children,
  variant = "type",
  className,
}: PropertyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variant === "type" && "bg-neutral-100 text-neutral-800",
        variant === "sale" && "bg-rose-50 text-rose-700 ring-1 ring-rose-200/70",
        variant === "rent" && "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/70",
        variant === "dual" && "bg-amber-50 text-amber-700 ring-1 ring-amber-200/70",
        variant === "code" && "border border-neutral-300 text-neutral-500",
        className
      )}
    >
      {children}
    </span>
  )
}
