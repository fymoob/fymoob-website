"use client"

import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

type SliderProps = SliderPrimitive.Root.Props<readonly number[]> & {
  thumbCount?: number
}

function Slider({ className, thumbCount, ...props }: SliderProps) {
  const value = props.value ?? props.defaultValue
  const inferredThumbCount =
    thumbCount ?? (Array.isArray(value) ? value.length : 1)

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex h-5 w-full items-center">
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-neutral-200">
          <SliderPrimitive.Indicator className="absolute h-full bg-brand-primary" />
        </SliderPrimitive.Track>

        {Array.from({ length: inferredThumbCount }).map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block size-4 rounded-full border-2 border-white bg-brand-primary shadow-sm ring-2 ring-brand-primary/20 transition-transform data-dragging:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
