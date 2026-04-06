import { cn } from "@/lib/utils"

type BadgeVariant = "type" | "sale" | "code"

interface PropertyBadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

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
        variant === "sale" && "bg-emerald-500 text-white",
        variant === "code" && "border border-neutral-300 text-neutral-500",
        className
      )}
    >
      {children}
    </span>
  )
}
