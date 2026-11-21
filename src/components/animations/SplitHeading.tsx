'use client'

import { useRef, type ReactNode } from 'react'
import { MOTION_OK, ScrollTrigger, SplitText, gsap, useGSAP } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface SplitHeadingProps {
  children: ReactNode
  className?: string
  as?: 'h2' | 'h3' | 'p'
  id?: string
}

/**
 * Masked word-by-word reveal on scroll using GSAP SplitText.
 * SplitText keeps an aria-label with the full text so screen readers read it normally.
 */
export function SplitHeading({ children, className, as: Tag = 'h2', id }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, {
          type: 'lines,words',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 115,
              duration: 1.1,
              stagger: 0.05,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            }),
        })
        return () => split.revert()
      })
      ScrollTrigger.refresh()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} id={id} className={cn('font-display', className)}>
      {children}
    </Tag>
  )
}
