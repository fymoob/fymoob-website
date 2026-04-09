import { Skeleton } from "@/components/ui/skeleton"

export default function PropertyLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 pt-6 md:px-8">
        <Skeleton className="h-4 w-48" />
      </div>

      <div className="mt-6 w-screen overflow-hidden bg-slate-950" style={{ marginLeft: "calc(-50vw + 50%)" }}>
        <div className="relative mx-auto flex max-w-[1500px] justify-center px-6 py-7 lg:px-8 lg:py-8">
          <Skeleton
            className="w-full max-w-[1210px] rounded-[28px] bg-white/10"
            style={{ height: "clamp(420px, 58dvh, 680px)" }}
          />
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 pb-40 lg:grid-cols-[1fr_380px] md:pb-0">
          <div>
            <div className="space-y-4">
              <Skeleton className="h-7 w-44 rounded-full" />
              <Skeleton className="h-12 w-4/5" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
              <Skeleton className="h-5 w-2/3" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 rounded-xl" />
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-10">
              <div className="space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-6 w-40" />
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="-mt-12 space-y-4 rounded-[28px] border border-neutral-200 bg-white p-6 shadow-xl">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-56" />
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-11 w-full rounded-xl" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-11 w-full rounded-xl" />
              <Skeleton className="h-11 w-full rounded-xl" />
              <Skeleton className="h-11 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
