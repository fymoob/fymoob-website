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
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variant === "type" && "bg-white/90 text-neutral-900 shadow-sm backdrop-blur",
        variant === "sale" && "bg-success/90 text-white backdrop-blur",
        variant === "code" && "bg-neutral-950/50 text-white backdrop-blur",
        className
      )}
    >
      {children}
    </span>
  )
}
