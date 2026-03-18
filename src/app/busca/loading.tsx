import { SkeletonsGrid } from "@/components/search/SkeletonsGrid"

export default function BuscaLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="h-8 w-64 animate-pulse rounded bg-neutral-200" />
        <div className="h-5 w-80 animate-pulse rounded bg-neutral-100" />
      </div>
      <SkeletonsGrid count={9} />
    </div>
  )
}
