export function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="aspect-[16/9] animate-pulse bg-neutral-200" />
      <div className="space-y-3 p-5 md:p-6">
        <div className="flex gap-2">
          <div className="h-5 w-16 animate-pulse rounded-full bg-neutral-100" />
          <div className="h-5 w-20 animate-pulse rounded-full bg-neutral-100" />
        </div>
        <div className="h-5 w-full animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-100" />
        <div className="flex gap-4">
          <div className="h-3 w-20 animate-pulse rounded bg-neutral-100" />
          <div className="h-3 w-24 animate-pulse rounded bg-neutral-100" />
        </div>
      </div>
    </div>
  )
}
