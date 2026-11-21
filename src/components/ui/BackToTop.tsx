'use client'

import { ArrowUpRight } from 'lucide-react'

export function BackToTop() {
  const onClick = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    // Return keyboard focus to the top of the document.
    document.getElementById('main')?.focus({ preventScroll: true })
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-fg-2 hover:text-fg"
    >
      Back to top
      <span className="grid h-8 w-8 place-items-center rounded-full border border-line transition-transform duration-500 group-hover:-translate-y-1">
        <ArrowUpRight size={14} className="-rotate-45" />
      </span>
    </button>
  )
}
