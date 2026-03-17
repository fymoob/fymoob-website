import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-7xl font-extrabold tracking-tight text-brand-primary md:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
          Pagina nao encontrada
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-neutral-500">
          A pagina que voce esta procurando pode ter sido removida, renomeada ou esta temporariamente indisponivel.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-primary-hover hover:shadow-lg active:scale-[0.98]"
          >
            <Home size={16} />
            Voltar ao inicio
          </Link>
          <Link
            href="/busca"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 transition-all duration-200 hover:border-brand-primary-muted hover:shadow-lg"
          >
            <Search size={16} />
            Buscar imoveis
          </Link>
        </div>
      </div>
    </div>
  )
}
