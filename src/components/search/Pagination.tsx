import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  const separator = basePath.includes("?") ? "&" : "?"

  return (
    <nav
      aria-label="Paginação dos resultados"
      className="mt-8 flex items-center justify-center gap-2"
    >
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}${separator}page=${currentPage - 1}`}
          className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-brand-primary hover:text-brand-primary"
        >
          Anterior
        </Link>
      )}
      <span className="px-4 text-sm text-neutral-500">
        Página {currentPage} de {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={`${basePath}${separator}page=${currentPage + 1}`}
          className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-brand-primary hover:text-brand-primary"
        >
          Próximo
        </Link>
      )}
    </nav>
  )
}
