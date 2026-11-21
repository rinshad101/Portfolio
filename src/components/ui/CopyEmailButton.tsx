'use client'

import { Check, Copy } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      // Clipboard blocked (insecure context / permissions) — fall back to mail client.
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface/60 px-4 font-mono text-xs text-fg-2 transition-colors hover:border-accent/60 hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'ok' : 'copy'}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.15 }}
          className="inline-flex"
        >
          {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
        </motion.span>
      </AnimatePresence>
      <span aria-live="polite">{copied ? 'Copied!' : 'Copy email'}</span>
    </button>
  )
}
