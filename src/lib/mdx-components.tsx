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
    <div className="my-8 rounded-lg border border-fymoob-blue/20 bg-fymoob-blue/5 p-6">
      <p className="font-display text-lg font-bold text-fymoob-blue">{title}</p>
      <p className="mt-2 text-sm text-fymoob-gray-mid">{description}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-fymoob-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-fymoob-blue-dark"
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
      className="mt-10 mb-4 font-display text-2xl font-bold text-fymoob-gray-dark"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-3 font-display text-xl font-semibold text-fymoob-gray-dark"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mb-4 leading-relaxed text-fymoob-gray-mid" {...props} />
  ),
  a: (props) => (
    <a
      className="font-medium text-fymoob-blue underline underline-offset-2 transition-colors hover:text-fymoob-blue-dark"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="mb-4 list-disc space-y-1 pl-6 text-fymoob-gray-mid" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 list-decimal space-y-1 pl-6 text-fymoob-gray-mid" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-fymoob-blue pl-4 italic text-fymoob-gray-mid"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse text-sm text-fymoob-gray-mid"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-fymoob-gray-light bg-fymoob-bg-alt px-4 py-2 text-left font-semibold text-fymoob-gray-dark"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-fymoob-gray-light px-4 py-2" {...props} />
  ),
  img: (props) => (
    <Image
      src={props.src || ""}
      alt={props.alt || ""}
      width={800}
      height={450}
      className="my-6 rounded-lg"
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-fymoob-gray-dark" {...props} />
  ),
  CTABox,
}
