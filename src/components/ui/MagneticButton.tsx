'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import type { MouseEvent, ReactNode } from 'react'
import { useFinePointer, useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'outline'

interface BaseProps {
  children: ReactNode
  className?: string
  variant?: Variant
  strength?: number
  'aria-label'?: string
}

type AnchorProps = BaseProps & { href: string; download?: boolean | string; external?: boolean; onClick?: never; type?: never }
type ButtonProps = BaseProps & { href?: undefined; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean }

const variants: Record<Variant, string> = {
  primary:
    'bg-fg text-bg hover:shadow-[0_0_0_1px_rgb(var(--accent-rgb)/0.6),0_12px_40px_-12px_rgb(var(--accent-rgb)/0.8)]',
  outline: 'border border-line bg-bg-2/60 text-fg backdrop-blur hover:border-accent/60',
  ghost: 'text-fg hover:bg-white/5',
}

/** Button/link that leans toward the pointer. Disabled for touch and reduced motion. */
export function MagneticButton(props: AnchorProps | ButtonProps) {
  const { children, className, variant = 'primary', strength = 0.3 } = props
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const active = fine && !reduced

  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!active) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const classes = cn(
    'group relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-[box-shadow,border-color,background-color] duration-300 disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    className,
  )

  if (props.href !== undefined) {
    const { href, download, external } = props
    return (
      <motion.a
        href={href}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={props['aria-label']}
        style={{ x, y }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileTap={{ scale: 0.97 }}
        className={classes}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props['aria-label']}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
      className={classes}
    >
      {children}
    </motion.button>
  )
}
