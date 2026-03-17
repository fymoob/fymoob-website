"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  options: { value: string; label: string }[]
  className?: string
}

export function SearchSelect({
  value,
  onChange,
  placeholder,
  options,
  className,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref} className={cn("relative flex-1", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-11 w-full items-center justify-between gap-2 rounded-full border-0 bg-transparent px-5 text-sm font-medium outline-none transition-colors hover:bg-neutral-50",
          selected ? "text-neutral-900" : "text-neutral-500"
        )}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown
          size={16}
          className={cn(
            "shrink-0 text-neutral-400 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[200px] max-h-[280px] overflow-y-auto rounded-xl border border-neutral-200 bg-white p-1 shadow-2xl shadow-black/10">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={cn(
                "flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                option.value === value
                  ? "bg-neutral-100 font-medium text-neutral-900"
                  : "text-neutral-700 hover:bg-neutral-50"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
