import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonsGridProps {
  count?: number
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
      {/* Image — matches aspect-[21/9] of grid cards */}
      <Skeleton className="aspect-[21/9] w-full rounded-none" />

      <div className="space-y-1.5 px-5 py-4">
        {/* Type · Location */}
        <Skeleton className="h-3 w-28" />
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />

        {/* Features editorial — stacked icons */}
        <div className="flex items-center gap-8 border-y border-gray-100 py-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <Skeleton className="size-[18px] rounded" />
              <Skeleton className="h-5 w-6" />
              <Skeleton className="h-2.5 w-10" />
            </div>
          ))}
        </div>

        {/* Price */}
        <Skeleton className="h-7 w-36 pt-1" />
      </div>
    </div>
  )
}

function ListCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white sm:flex-row">
      <Skeleton className="aspect-[4/3] w-full rounded-none sm:aspect-auto sm:w-2/5 sm:min-h-[200px]" />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-4 sm:gap-2 sm:p-6">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-6 w-32" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonsGrid({ count = 6 }: SkeletonsGridProps) {
  return (
    <div>
      {/* Desktop: grid 2 cols with editorial cards */}
      <div className="hidden gap-8 md:grid md:grid-cols-2 lg:gap-12">
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      {/* Mobile: list cards */}
      <div className="flex flex-col gap-5 md:hidden">
        {Array.from({ length: count }).map((_, i) => (
          <ListCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
