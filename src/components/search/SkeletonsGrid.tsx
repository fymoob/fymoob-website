import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonsGridProps {
  count?: number
}

// Match PropertyCardGrid (desktop 2-col): aspect-[16/9], rounded-2xl, p-5 sm:p-6
function GridCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {/* Image — matches aspect-[16/9] of PropertyCardGrid */}
      <Skeleton className="aspect-[16/9] w-full rounded-none" />

      <div className="flex flex-col gap-3 p-5 sm:p-6">
        {/* Header: pill finalidade + tipo + bairro */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Title — 2 lines, text-xl */}
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-[85%]" />
          <Skeleton className="h-5 w-[60%]" />
        </div>

        {/* PropertyFeatures row — inline icons */}
        <div className="flex items-center gap-4 pt-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Skeleton className="size-4 rounded" />
              <Skeleton className="h-3.5 w-8" />
            </div>
          ))}
        </div>

        {/* Price block with top border — price + code side by side */}
        <div className="mt-2 flex items-end justify-between border-t border-slate-100 pt-4">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}

// Match PropertyCard mobile (responsive): aspect-[4/3] image, simpler content
function MobileCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-3.5 w-20" />
        </div>
        <Skeleton className="h-5 w-[85%]" />
        <div className="flex items-center gap-3 pt-1">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-3.5 w-10" />
          ))}
        </div>
        <div className="mt-1 flex items-end justify-between border-t border-slate-100 pt-3">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-3.5 w-14" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonsGrid({ count = 6 }: SkeletonsGridProps) {
  return (
    <div>
      {/* Desktop 2-col: match PropertyCardGrid exactly */}
      <div className="hidden gap-6 md:grid md:grid-cols-2 xl:gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <GridCardSkeleton key={i} />
        ))}
      </div>
      {/* Mobile: full-width cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {Array.from({ length: count }).map((_, i) => (
          <MobileCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
