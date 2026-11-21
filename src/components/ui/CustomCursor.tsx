'use client'

import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useFinePointer, useReducedMotion } from '@/hooks/useReducedMotion'

type CursorState = 'default' | 'link' | 'view'

/**
 * Decorative follower ring for mouse users only. The native cursor is never hidden.
 * Elements opt into the "VIEW" state with data-cursor="view".
 */
export function CustomCursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const enabled = fine && !reduced

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })
  const [state, setState] = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as Element | null
      const view = target?.closest('[data-cursor="view"]')
      const link = target?.closest('a, button, input, textarea, [role="button"]')
      setState(view ? 'view' : link ? 'link' : 'default')
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = state === 'view' ? 84 : state === 'link' ? 44 : 30

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        style={{ x: sx, y: sy }}
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className={`absolute left-0 top-0 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border ${
          state === 'view' ? 'border-transparent bg-fg text-bg' : 'border-fg/40'
        }`}
      >
        <AnimatePresence>
          {state === 'view' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[11px] font-semibold tracking-[0.2em]"
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        style={{ x, y }}
        animate={{ opacity: visible && state === 'default' ? 1 : 0 }}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2"
      />
    </div>
  )
}
