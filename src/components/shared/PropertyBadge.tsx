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
        "inline-flex items-center rounded px-3 py-1 text-xs font-medium text-white",
        variant === "type" && "bg-fymoob-blue",
        variant === "sale" && "bg-fymoob-green",
        variant === "code" && "bg-fymoob-blue-dark",
        className
      )}
    >
      {children}
    </span>
  )
}
