'use client'

import { useRef, useState } from 'react'
import { profile } from '@/data/profile'
import { gsap, INTRO_KEY, useGSAP } from '@/lib/animations'
import { useAppDispatch } from '@/store/hooks'
import { introComplete } from '@/store/uiSlice'

const BOOT_LINES = ['initializing portfolio...', 'loading components...', 'establishing connection...', 'system ready']

/**
 * Short terminal-style intro (≈2.6s). Plays once per session, never for reduced motion,
 * and can never block the page: a hard timeout force-completes it.
 * The page content underneath is fully rendered and accessible the whole time.
 */
export function Preloader() {
  const dispatch = useAppDispatch()
  const root = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useGSAP(
    () => {
      const html = document.documentElement
      const markPlayed = () => {
        try {
          sessionStorage.setItem(INTRO_KEY, '1')
        } catch {
          /* ignore */
        }
      }

      if (html.dataset.intro === 'skip') {
        dispatch(introComplete())
        setDone(true)
        return
      }

      // Mark as played up front so a reload mid-intro never replays it.
      markPlayed()
      document.body.style.overflow = 'hidden'
      const release = () => {
        document.body.style.overflow = ''
        dispatch(introComplete())
      }

      const tl = gsap.timeline({
        onComplete: () => {
          html.dataset.intro = 'done'
          setDone(true)
        },
      })

      tl.from('.pl-line', { opacity: 0, x: -8, duration: 0.35, stagger: 0.24, ease: 'power2.out' })
        .fromTo('.pl-bar', { scaleX: 0 }, { scaleX: 1, duration: 1.05, ease: 'power2.inOut' }, 0)
        .to('.pl-terminal', { opacity: 0, y: -12, duration: 0.35, ease: 'power2.in' }, '+=0.1')
        .fromTo(
          '.pl-word',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, stagger: 0.07, ease: 'expo.out' },
          '-=0.05',
        )
        .call(release, undefined, '+=0.25')
        .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '<')

      // Never hold the page hostage: force completion if anything stalls.
      const safety = window.setTimeout(() => tl.progress(1), 5000)
      return () => {
        window.clearTimeout(safety)
        document.body.style.overflow = ''
      }
    },
    { scope: root },
  )

  if (done) return null

  const words = profile.brand.replace(/\.$/, '').toUpperCase().split(' ')

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="pl-terminal w-[min(90vw,26rem)] font-mono text-sm text-fg-2">
        {BOOT_LINES.map((l, i) => (
          <p key={l} className="pl-line py-0.5">
            <span className="text-accent">&gt;</span> {l}
            {i === BOOT_LINES.length - 1 && <span className="ml-1 text-green">✓</span>}
          </p>
        ))}
        <div className="mt-5 h-px w-full overflow-hidden bg-line">
          <div className="pl-bar h-full origin-left bg-gradient-to-r from-accent to-accent-2" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
      <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[clamp(2.25rem,8vw,6.5rem)] font-bold leading-none tracking-[-0.05em]">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span style={{ transform: 'translateY(110%)' }} className={`pl-word inline-block ${i === words.length - 1 ? 'text-gradient' : ''}`}>
              {w}
              {i === words.length - 1 ? '.' : ' '}
            </span>
          </span>
        ))}
      </p>
    </div>
  )
}
