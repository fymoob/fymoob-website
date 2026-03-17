import { BlogCardSkeleton } from "@/components/shared/BlogCardSkeleton"

export default function BlogLoading() {
  return (
    <>
      <section className="bg-neutral-950 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-10 w-48 animate-pulse rounded bg-neutral-800" />
          <div className="mt-4 h-6 w-96 animate-pulse rounded bg-neutral-800" />
        </div>
      </section>
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
