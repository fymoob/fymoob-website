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
  const label = finalidade === "Locacao" ? "Aluguel" : "Venda"

  const sizeClasses = {
    sm: "text-base",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
  }

  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
        Valor {label}
      </p>
      <p className={cn("font-bold text-brand-primary", sizeClasses[size])}>
        {formatPrice(price)}
      </p>
      {finalidade === "Venda e Locacao" && precoAluguel && (
        <p className="text-sm text-neutral-500">
          Aluguel: {formatPrice(precoAluguel)}
        </p>
      )}
    </div>
  )
}
