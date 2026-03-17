export function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="aspect-[4/3] animate-pulse bg-neutral-200" />
      <div className="space-y-3 p-5 md:p-6">
        <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-100" />
        <div className="h-6 w-1/3 animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-full animate-pulse rounded bg-neutral-100" />
        <div className="flex gap-4">
          <div className="h-4 w-12 animate-pulse rounded bg-neutral-100" />
          <div className="h-4 w-12 animate-pulse rounded bg-neutral-100" />
          <div className="h-4 w-12 animate-pulse rounded bg-neutral-100" />
        </div>
      </div>
    </div>
  )
}

export function PropertyGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  )
}
