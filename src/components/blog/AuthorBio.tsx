import Image from "next/image"

interface AuthorBioProps {
  compact?: boolean
}

export function AuthorBio({ compact = false }: AuthorBioProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="relative size-10 overflow-hidden rounded-full bg-neutral-200">
          <Image
            src="/images/team/bruno.jpg"
            alt="Bruno César de Almeida"
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-900">Bruno César de Almeida</p>
          <p className="text-xs text-neutral-500">CRECI J 9420 · Corretor de Imóveis</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
      <div className="flex items-start gap-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-neutral-200">
          <Image
            src="/images/team/bruno.jpg"
            alt="Bruno César de Almeida"
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div>
          <p className="font-display text-base font-semibold text-neutral-900">
            Bruno César de Almeida
          </p>
          <p className="mt-0.5 text-sm text-brand-primary">
            CRECI J 9420 · Corretor de Imóveis
          </p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Especialista no mercado imobiliário de Curitiba há mais de 10 anos.
            Fundador da FYMOOB Imobiliária, conhece cada bairro da cidade e
            ajuda famílias a encontrarem o imóvel ideal com atendimento personalizado.
          </p>
        </div>
      </div>
    </div>
  )
}
