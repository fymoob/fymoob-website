// Server Component shell — dynamic imports the client-side Header
// This ensures the Header's JS (Sheet, DropdownMenu, scroll listeners)
// is code-split and doesn't block initial page render
import dynamic from "next/dynamic"

const HeaderClient = dynamic(
  () => import("./HeaderClient").then((m) => ({ default: m.HeaderClient })),
  {
    loading: () => (
      <header className="fixed top-0 z-50 w-full border-b border-transparent bg-transparent">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" />
      </header>
    ),
  }
)

export function Header() {
  return <HeaderClient />
}
