'use client'

import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'article' | 'section'
}

/** Small viewport-triggered fade-up. Motion handles reduced motion via <MotionConfig reducedMotion="user">. */
export function Reveal({ children, delay = 0, y = 28, as = 'div', ...rest }: RevealProps) {
  const Component = motion[as] as typeof motion.div
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Component>
  )
}
