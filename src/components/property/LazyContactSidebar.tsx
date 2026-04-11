"use client"

import dynamic from "next/dynamic"

const ContactSidebar = dynamic(
  () =>
    import("./ContactSidebar").then((m) => ({
      default: m.ContactSidebar,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="sticky top-24 space-y-4">
        <div className="h-[480px] animate-pulse rounded-xl bg-neutral-100" />
      </div>
    ),
  }
)

import type { Property } from "@/types/property"

interface LazyContactSidebarProps {
  propertyTitle: string
  propertyCode: string
  precoVenda: number | null
  precoAluguel: number | null
  finalidade: Property["finalidade"]
  valorCondominio: number | null
  valorIptu: number | null
  valorSobConsulta: boolean
  variant: "standard" | "premium"
}

export function LazyContactSidebar(props: LazyContactSidebarProps) {
  return <ContactSidebar {...props} />
}
