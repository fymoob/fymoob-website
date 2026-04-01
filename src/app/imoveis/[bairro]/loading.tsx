import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonsGrid } from "@/components/search/SkeletonsGrid"

export default function BairroLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="bg-neutral-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-3">
          <Skeleton className="h-4 w-32 bg-neutral-700" />
          <Skeleton className="h-10 w-64 bg-neutral-700" />
          <Skeleton className="h-5 w-96 bg-neutral-800" />
        </div>
      </div>
      {/* Cards */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SkeletonsGrid count={6} />
      </div>
    </>
  )
}
