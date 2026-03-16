import { formatPrice } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface PriceDisplayProps {
  precoVenda: number | null
  precoAluguel: number | null
  finalidade: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function PriceDisplay({
  precoVenda,
  precoAluguel,
  finalidade,
  size = "md",
  className,
}: PriceDisplayProps) {
  const price = precoVenda ?? precoAluguel
  const label = finalidade === "Locação" ? "Aluguel" : "Venda"

  const sizeClasses = {
    sm: "text-base",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
  }

  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-xs text-muted-foreground uppercase tracking-wide">
        Valor {label}
      </p>
      <p className={cn("font-bold text-fymoob-blue", sizeClasses[size])}>
        {formatPrice(price)}
      </p>
      {finalidade === "Venda e Locação" && precoAluguel && (
        <p className="text-sm text-muted-foreground">
          Aluguel: {formatPrice(precoAluguel)}
        </p>
      )}
    </div>
  )
}
