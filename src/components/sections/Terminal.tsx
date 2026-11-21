'use client'

import { Terminal as TerminalIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Reveal } from '@/components/animations/Reveal'
import { SplitHeading } from '@/components/animations/SplitHeading'
import { useTerminal, type TerminalEntry } from '@/hooks/useTerminal'
import type { OutputLine, Tone } from '@/lib/terminalCommands'
import { cn } from '@/lib/utils'

const PROMPT_USER = 'portfolio@developer'

const toneClass: Record<Tone, string> = {
  default: 'text-fg',
  muted: 'text-fg-2',
  accent: 'text-accent',
  success: 'text-green',
  error: 'text-[#f87171]',
  info: 'text-accent-2',
  heading: 'font-semibold text-fg',
}

const QUICK = ['help', 'about', 'skills', 'projects', 'neofetch']

function Prompt() {
  return (
    <span className="shrink-0 select-none">
      <span className="text-green">{PROMPT_USER}</span>
      <span className="text-fg-2">:</span>
      <span className="text-accent-2">~</span>
      <span className="text-fg-2">$ </span>
    </span>
  )
}

function Line({ line }: { line: OutputLine }) {
  return (
    <div className="min-h-[1.6em] whitespace-pre-wrap break-words">
      {line.map((seg, i) =>
        seg.href ? (
          <a
            key={i}
            href={seg.href}
            download={seg.download || undefined}
            target={seg.href.startsWith('http') ? '_blank' : undefined}
            rel={seg.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={cn('underline decoration-line underline-offset-4 hover:decoration-accent', toneClass[seg.tone ?? 'default'])}
          >
            {seg.text}
          </a>
        ) : (
          <span key={i} className={toneClass[seg.tone ?? 'default']}>
            {seg.text}
          </span>
        ),
      )}
    </div>
  )
}

function Entry({ entry }: { entry: TerminalEntry }) {
  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      {entry.command !== undefined && (
        <div className="flex">
          <Prompt />
          <span className="break-all text-fg">{entry.command}</span>
        </div>
      )}
      {entry.lines.map((l, i) => (
        <Line key={i} line={l} />
      ))}
    </motion.div>
  )
}

export function Terminal() {
  const { entries, input, setInput, onKeyDown, run } = useTerminal()
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [entries])

  return (
    <section id="terminal" aria-labelledby="terminal-title" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-rgb)/0.12),transparent)]" />
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center gap-3">
            <span className="text-accent">05</span>
            <span className="h-px w-10 bg-line" />
            Terminal
          </p>
          <SplitHeading id="terminal-title" className="display-title mt-6">
            Curious? <span className="text-gradient">Explore My World.</span>
          </SplitHeading>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base text-fg-2">
              A real, sandboxed command line. Type <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-sm text-fg">help</kbd> to get started.
            </p>
          </Reveal>
        </div>

        <Reveal y={40} delay={0.1} className="mx-auto mt-12 max-w-4xl">
          <div className="gradient-border relative overflow-hidden rounded-2xl border border-line bg-[#0a0d15]/95 shadow-[0_40px_120px_-40px_rgb(var(--accent-rgb)/0.45)]">
            {/* Title bar */}
            <div className="flex items-center gap-3 border-b border-line bg-surface/60 px-4 py-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <p className="flex flex-1 items-center justify-center gap-2 font-mono text-xs text-fg-2">
                <TerminalIcon size={13} aria-hidden="true" />
                {PROMPT_USER}: ~
              </p>
              <span className="hidden font-mono text-[10px] text-muted sm:inline">zsh · 80×24</span>
            </div>

            {/* Output */}
            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="h-[24rem] overflow-y-auto overscroll-contain px-4 py-4 font-mono text-[12.5px] leading-[1.6] sm:h-[28rem] sm:px-5 sm:text-[13.5px]"
            >
              <div role="log" aria-live="polite" aria-label="Terminal output">
                {entries.map((entry) => (
                  <Entry key={entry.id} entry={entry} />
                ))}
              </div>

              <form
                className="flex items-center"
                onSubmit={(e) => {
                  e.preventDefault()
                }}
              >
                <Prompt />
                <label htmlFor="terminal-input" className="sr-only">
                  Terminal command
                </label>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    id="terminal-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    enterKeyHint="send"
                    maxLength={120}
                    aria-describedby="terminal-hint"
                    className="peer w-full bg-transparent text-fg caret-transparent outline-none"
                  />
                  {/* Custom block cursor that follows the typed text */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-pre text-transparent opacity-0 peer-focus:opacity-100">
                    {input}
                    <span className="animate-blink inline-block h-[1.15em] w-[0.6em] bg-accent-2" />
                  </span>
                </div>
              </form>
            </div>

            {/* Quick commands — touch friendly */}
            <div className="flex flex-wrap items-center gap-2 border-t border-line bg-surface/40 px-4 py-3">
              <span id="terminal-hint" className="mr-1 font-mono text-[11px] text-muted">
                try ↓ · Tab completes · ↑ history
              </span>
              {QUICK.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => {
                    run(cmd)
                    inputRef.current?.focus({ preventScroll: true })
                  }}
                  className="min-h-8 rounded-md border border-line bg-bg/60 px-2.5 font-mono text-xs text-fg-2 transition-colors hover:border-accent/50 hover:text-fg"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
