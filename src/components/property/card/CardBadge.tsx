import { Sparkles, Rocket, Flame, Star, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CardBadge as CardBadgeType } from "./hooks/usePropertyCard"

const ICONS: Record<CardBadgeType["iconName"], LucideIcon> = {
  Sparkles,
  Rocket,
  Flame,
  Star,
}

interface CardBadgeProps {
  badge: CardBadgeType
  className?: string
}

/**
 * Badge glassmorphism — padronizado para todos os card variants.
 * Uso sobre fotos de imoveis (overlay). Fundo white/85 + backdrop-blur
 * + ring sutil garantem legibilidade sobre qualquer imagem.
 */
export function CardBadge({ badge, className }: CardBadgeProps) {
  const Icon = ICONS[badge.iconName]

  // Star (DESTAQUE) e Flame (MAIS VISTO) ficam mais refinadas com fill-current.
  // Outros icones ficam melhor como outline.
  const filledIcons: CardBadgeType["iconName"][] = ["Star", "Flame"]
  const isFilled = filledIcons.includes(badge.iconName)

  // Rocket (LANCAMENTO) ganha leve rotacao pra dinamismo
  const iconExtra = badge.iconName === "Rocket" ? "-rotate-12" : ""

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white/85 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide shadow-sm ring-1 ring-black/5 backdrop-blur-md",
        "sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[11px]",
        badge.textColor,
        className
      )}
    >
      {/* Dot com pulse opcional (somente status temporais recentes) */}
      {badge.pulse ? (
        <span className="relative inline-flex size-1.5 shrink-0">
          <span
            aria-hidden
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-60",
              badge.dotColor
            )}
          />
          <span
            className={cn("relative inline-flex size-1.5 rounded-full", badge.dotColor)}
          />
        </span>
      ) : (
        <Icon
          className={cn("size-2.5 sm:size-3", iconExtra, isFilled && "fill-current")}
          strokeWidth={2.5}
        />
      )}
      <span>{badge.text}</span>
    </span>
  )
}
