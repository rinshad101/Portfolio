'use client'

import { ArrowRight, Download } from 'lucide-react'
import { useRef } from 'react'
import { HeroVisual } from '@/components/three/HeroVisual'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { profile } from '@/data/profile'
import { MOTION_OK, MOTION_REDUCED, gsap, useGSAP } from '@/lib/animations'
import { useAppSelector } from '@/store/hooks'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const introDone = useAppSelector((s) => s.ui.introDone)

  // Entrance choreography — waits for the preloader, then plays once.
  useGSAP(
    () => {
      if (!introDone) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .fromTo('[data-hero="status"]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 })
          .fromTo('[data-hero="line"]', { opacity: 0, yPercent: 110 }, { opacity: 1, yPercent: 0, duration: 1.2, stagger: 0.12 }, '-=0.5')
          .fromTo('[data-hero="copy"]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, '-=0.8')
          .fromTo('[data-hero="cta"]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, '-=0.7')
          .fromTo('[data-hero="visual"]', { opacity: 0 }, { opacity: 1, duration: 1.4 }, 0.2)
          .fromTo('[data-hero="scroll"]', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.4')
      })
      mm.add(MOTION_REDUCED, () => {
        gsap.set('[data-hero-reveal]', { opacity: 1 })
      })
    },
    { scope: root, dependencies: [introDone] },
  )

  const words = profile.availability

  return (
    <section
      ref={root}
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 lg:pt-24"
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="perspective-grid absolute inset-0 opacity-60 [transform:perspective(900px)_rotateX(52deg)_translateY(-18%)_scale(1.6)] [transform-origin:50%_0%]" />
        <div className="animate-drift absolute -left-[20%] top-[-10%] h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle,rgb(var(--accent-rgb)/0.22),transparent_60%)]" />
        <div className="absolute right-[-15%] top-[20%] h-[50vw] w-[50vw] rounded-full bg-[radial-gradient(circle,rgb(56_189_248/0.12),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-x grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
        <div className="relative z-10">
          <p
            data-hero="status"
            data-hero-reveal
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-3 pr-4 font-mono text-xs text-fg-2 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              {words.available && <span className="animate-ping-soft absolute inset-0 rounded-full bg-green" />}
              <span className={`relative h-2 w-2 rounded-full ${words.available ? 'bg-green' : 'bg-muted'}`} />
            </span>
            {words.label}
          </p>

          <h1 id="hero-title" className="hero-title mt-7 font-display">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero="line" data-hero-reveal className="block">
                ENGINEERING
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero="line" data-hero-reveal className="block">
                THE <span className="text-gradient">FUTURE.</span>
              </span>
            </span>
          </h1>

          <p data-hero="copy" data-hero-reveal className="mt-6 font-mono text-sm text-accent-2 sm:text-base">
            {profile.headline}
            <span className="text-muted"> — one line at a time.</span>
          </p>
          <p data-hero="copy" data-hero-reveal className="mt-4 max-w-xl text-base leading-relaxed text-fg-2 sm:text-lg">
            {profile.heroIntro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <div data-hero="cta" data-hero-reveal>
              <MagneticButton href="#work">
                Explore My Work
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
            </div>
            <div data-hero="cta" data-hero-reveal>
              <MagneticButton href={profile.resume.href} download={profile.resume.fileName} variant="outline">
                <Download size={16} />
                Download Resume
              </MagneticButton>
            </div>
          </div>
        </div>

        <div data-hero="visual" data-hero-reveal className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <HeroVisual />
        </div>
      </div>

      <a
        href="#about"
        data-hero="scroll"
        data-hero-reveal
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted hover:text-fg md:flex"
      >
        <span className="relative h-9 w-5 rounded-full border border-line">
          <span className="absolute left-1/2 top-2 h-1.5 w-1 -translate-x-1/2 rounded-full bg-accent-2 [animation:scroll-dot_1.8s_ease-in-out_infinite]" />
        </span>
        Scroll
        <span className="sr-only">to About section</span>
      </a>
    </section>
  )
}
