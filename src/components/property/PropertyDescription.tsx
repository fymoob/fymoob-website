interface PropertyDescriptionProps {
  descricao: string
}

export function PropertyDescription({ descricao }: PropertyDescriptionProps) {
  if (!descricao) return null

  return (
    <div className="space-y-3">
      <h2 className="font-display text-lg font-semibold italic text-fymoob-blue">
        Descrição
      </h2>
      <div className="prose prose-sm max-w-none text-fymoob-gray-dark">
        {descricao.split(/\r?\n/).map((paragraph, index) => {
          const trimmed = paragraph.trim()
          if (!trimmed) return null
          return (
            <p key={index} className="mb-2">
              {trimmed}
            </p>
          )
        })}
      </div>
    </div>
  )
}
