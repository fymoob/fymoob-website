"use client"

import { Search } from "lucide-react"

import { cn } from "@/lib/utils"

function Command({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command"
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white",
        className
      )}
      {...props}
    />
  )
}

function CommandInput({
  className,
  onChange,
  onValueChange,
  ...props
}: Omit<React.ComponentProps<"input">, "onChange"> & {
  onValueChange?: (value: string) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="flex h-10 items-center border-b border-neutral-200 px-3">
      <Search className="mr-2 size-4 text-neutral-400" />
      <input
        data-slot="command-input"
        className={cn(
          "h-full w-full bg-transparent text-sm text-[#0B1120] placeholder:text-neutral-400 outline-none",
          className
        )}
        onChange={(event) => {
          onChange?.(event)
          onValueChange?.(event.target.value)
        }}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-list"
      className={cn("max-h-64 overflow-y-auto p-1", className)}
      {...props}
    />
  )
}

function CommandEmpty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-empty"
      className={cn("px-3 py-6 text-center text-sm text-neutral-500", className)}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  heading,
  ...props
}: React.ComponentProps<"div"> & {
  heading?: string
}) {
  return (
    <div data-slot="command-group" className={cn("p-1", className)} {...props}>
      {heading ? (
        <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {heading}
        </p>
      ) : null}
      <div className="space-y-0.5">{props.children}</div>
    </div>
  )
}

function CommandItem({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="command-item"
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-[#0B1120] transition-colors hover:bg-neutral-100",
        className
      )}
      {...props}
    />
  )
}

export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem }
