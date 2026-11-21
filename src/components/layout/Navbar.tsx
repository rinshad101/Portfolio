'use client'

import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { navItems, profile, type SectionId } from '@/data/profile'
import { cn } from '@/lib/utils'

function useActiveSection(enabled: boolean): SectionId {
  const [active, setActive] = useState<SectionId>('home')
  useEffect(() => {
    if (!enabled) return
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null)
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [enabled])
  return active
}

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const active = useActiveSection(isHome)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const href = (id: SectionId) => (isHome ? `#${id}` : `/#${id}`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  // Lock scroll and move focus into the dialog while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = dialogRef.current?.querySelector<HTMLElement>('a, button')
    first?.focus()
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const onDialogKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
      return
    }
    if (e.key !== 'Tab' || !dialogRef.current) return
    const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (!first || !last) return
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          'mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border px-3 pl-4 transition-[background-color,border-color,box-shadow] duration-500 sm:h-[3.75rem]',
          scrolled || open
            ? 'border-line bg-bg/70 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${profile.name} — home`}>
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface font-mono text-xs font-semibold text-fg transition-colors group-hover:border-accent/60">
            {profile.initials}
          </span>
          <span className="hidden font-mono text-xs text-fg-2 sm:inline">
            ~/<span className="text-fg">portfolio</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = isHome && active === item.id
            return (
              <li key={item.id} className="relative">
                <a
                  href={href(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative z-10 block rounded-full px-4 py-2 text-sm transition-colors',
                    isActive ? 'text-fg' : 'text-fg-2 hover:text-fg',
                  )}
                >
                  {item.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-line bg-elevated/70"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <MagneticButton href={href('contact')} className="min-h-10 px-5" strength={0.25}>
              Let&apos;s talk
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green" />
            </MagneticButton>
          </div>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface/60 text-fg lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            onKeyDown={onDialogKeyDown}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 -z-10 flex flex-col bg-bg/95 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <ul className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={href(item.id)}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-display text-[clamp(2.25rem,11vw,3.5rem)] font-semibold tracking-tight text-fg"
                  >
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto font-mono text-xs text-fg-2"
            >
              <a href={`mailto:${profile.email}`} className="link-underline">
                {profile.email}
              </a>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
