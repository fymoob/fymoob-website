import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle } from "lucide-react"

function CTABox({
  title,
  description,
  href,
  label,
}: {
  title: string
  description: string
  href: string
  label: string
}) {
  return (
    <div className="my-8 rounded-2xl border border-brand-primary-muted bg-brand-primary-light p-6">
      <p className="font-display text-lg font-bold text-neutral-950">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{description}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-primary-hover hover:shadow-lg active:scale-[0.98]"
      >
        <MessageCircle size={16} />
        {label}
      </Link>
    </div>
  )
}

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-12 mb-4 font-display text-2xl font-bold tracking-tight text-neutral-950"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-3 font-display text-xl font-semibold text-neutral-950"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mb-4 text-base leading-relaxed text-neutral-700" {...props} />
  ),
  a: (props) => (
    <a
      className="font-medium text-brand-primary underline underline-offset-2 transition-colors duration-200 hover:text-brand-primary-hover"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="mb-4 list-disc space-y-1.5 pl-6 text-neutral-700" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 list-decimal space-y-1.5 pl-6 text-neutral-700" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-brand-primary pl-4 italic text-neutral-600"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-neutral-200">
      <table
        className="w-full border-collapse text-sm text-neutral-700"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-neutral-100 px-4 py-3" {...props} />
  ),
  img: (props) => (
    <Image
      src={props.src || ""}
      alt={props.alt || ""}
      width={800}
      height={450}
      className="my-6 rounded-xl"
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-neutral-950" {...props} />
  ),
  CTABox,
}
