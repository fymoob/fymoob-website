/**
 * Badge visual de status de artigo. Reusado na lista e no editor.
 */

import { Clock, Eye, EyeOff, Archive } from "lucide-react"
import type { ArticleStatus } from "@/lib/schemas/article"

const STATUS_CONFIG: Record<
  ArticleStatus,
  { label: string; icon: React.ComponentType<{ className?: string }>; className: string }
> = {
  draft: {
    label: "Rascunho",
    icon: EyeOff,
    className: "border-amber-200 bg-amber-50 text-amber-900",
  },
  scheduled: {
    label: "Agendado",
    icon: Clock,
    className: "border-blue-200 bg-blue-50 text-blue-900",
  },
  published: {
    label: "Publicado",
    icon: Eye,
    className: "border-emerald-200 bg-emerald-50 text-emerald-900",
  },
  archived: {
    label: "Arquivado",
    icon: Archive,
    className: "border-slate-200 bg-slate-100 text-slate-600",
  },
}

export function StatusBadge({ status }: { status: ArticleStatus }) {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${config.className}`}
    >
      <Icon className="size-3" />
      {config.label}
    </span>
  )
}
