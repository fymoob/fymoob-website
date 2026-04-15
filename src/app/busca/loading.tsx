import { SkeletonsGrid } from "@/components/search/SkeletonsGrid"

// Mirror page.tsx layout exactly — same container widths, same gradient,
// same section order — to avoid visual "jump" between loading and loaded states.
export default function BuscaLoading() {
  return (
    <div
      className="w-full bg-white px-4 py-8 md:px-12 lg:px-20 2xl:px-32"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse 1300px 620px at 12% -12%, rgba(2, 132, 199, 0.10), transparent 72%)",
          "radial-gradient(ellipse 1100px 600px at 88% -8%, rgba(180, 142, 102, 0.07), transparent 72%)",
        ].join(", "),
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 560px, 100% 560px",
      }}
    >
      {/* Breadcrumb placeholder — match Breadcrumbs visual weight */}
      <div className="flex items-center gap-2">
        <div className="h-3.5 w-10 animate-pulse rounded bg-neutral-200" />
        <span className="text-neutral-300">/</span>
        <div className="h-3.5 w-14 animate-pulse rounded bg-neutral-200" />
      </div>

      {/* Searchbar placeholder — match sticky SearchPageSearchBar height */}
      <div className="mt-6">
        <div className="h-14 w-full animate-pulse rounded-full border border-slate-200/80 bg-white/70 backdrop-blur-xl shadow-[0_4px_16px_-4px_rgba(15,23,42,0.08),0_12px_40px_-12px_rgba(15,23,42,0.12)] md:h-16" />
      </div>

      {/* Results header placeholder — "Mostrando X de Y imóveis" + sort + view toggle */}
      <div className="mt-8 mb-6 flex items-center justify-between">
        <div className="h-5 w-40 animate-pulse rounded bg-neutral-200" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-32 animate-pulse rounded-full bg-neutral-100" />
          <div className="h-9 w-20 animate-pulse rounded-full bg-neutral-100" />
        </div>
      </div>

      {/* Cards grid — same SkeletonsGrid used by PropertyListingGrid Suspense */}
      <SkeletonsGrid count={8} />
    </div>
  )
}
