interface PropertyDescriptionProps {
  descricao: string
}

export function PropertyDescription({ descricao }: PropertyDescriptionProps) {
  if (!descricao) return null

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold tracking-tight text-neutral-950">
        Descricao do imovel
      </h2>
      <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed">
        {descricao.split(/\r?\n/).map((paragraph, index) => {
          const trimmed = paragraph.trim()
          if (!trimmed) return null
          return (
            <p key={index} className="mb-3">
              {trimmed}
            </p>
          )
        })}
      </div>
    </div>
  )
}
