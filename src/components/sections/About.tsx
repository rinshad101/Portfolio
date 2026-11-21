'use client'

import { BookOpen, Braces, Server } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from '@/components/animations/Reveal'
import { SplitHeading } from '@/components/animations/SplitHeading'
import { profile } from '@/data/profile'
import { MOTION_OK, gsap, useGSAP } from '@/lib/animations'

const cardIcons = [Braces, Server, BookOpen]

function JsonValue({ value }: { value: string | string[] }) {
  if (Array.isArray(value)) {
    return (
      <>
        <span className="text-fg-2">[</span>
        {value.map((v, i) => (
          <span key={v}>
            <span className="text-green">&quot;{v}&quot;</span>
            {i < value.length - 1 && <span className="text-fg-2">, </span>}
          </span>
        ))}
        <span className="text-fg-2">]</span>
      </>
    )
  }
  return <span className="text-green">&quot;{value}&quot;</span>
}

function ProfileJson() {
  const entries = Object.entries(profile.snapshot)
  return (
    <figure className="surface gradient-border relative overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <figcaption className="font-mono text-[11px] text-muted">developer.json</figcaption>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:text-sm">
        <code>
          <motion.span
            className="block"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            {[
              <span key="open" className="text-fg-2">{'{'}</span>,
              ...entries.map(([k, v], i) => (
                <span key={k}>
                  {'  '}
                  <span className="text-accent">&quot;{k}&quot;</span>
                  <span className="text-fg-2">: </span>
                  <JsonValue value={v} />
                  {i < entries.length - 1 && <span className="text-fg-2">,</span>}
                </span>
              )),
              <span key="close" className="text-fg-2">
                {'}'}
                <span className="animate-blink ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent-2" aria-hidden="true" />
              </span>,
            ].map((node, i) => (
              <motion.span
                key={i}
                className="block whitespace-pre"
                variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span aria-hidden="true" className="mr-4 inline-block w-4 select-none text-right text-muted/60">
                  {i + 1}
                </span>
                {node}
              </motion.span>
            ))}
          </motion.span>
        </code>
      </pre>
    </figure>
  )
}

export function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.to('[data-parallax]', {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="about" aria-labelledby="about-title" className="section-y relative overflow-hidden">
      <div
        data-parallax
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full border border-line/60"
      >
        <div className="animate-spin-slow absolute inset-6 rounded-full border border-dashed border-accent/25" />
      </div>

      <div className="container-x">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">01</span>
          <span className="h-px w-10 bg-line" />
          About
        </p>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SplitHeading id="about-title" className="display-title">
              More Than Just <span className="text-gradient">Writing Code.</span>
            </SplitHeading>
            <Reveal delay={0.2} className="mt-10 hidden lg:block">
              <ProfileJson />
            </Reveal>
          </div>

          <div>
            <div className="space-y-5 text-base leading-relaxed text-fg-2 sm:text-lg">
              {profile.bio.map((p, i) => (
                <Reveal key={i} delay={i * 0.08} y={20}>
                  <p className={i === 0 ? 'text-xl leading-snug text-fg sm:text-2xl' : ''}>{p}</p>
                </Reveal>
              ))}
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {profile.cards.map((card, i) => {
                const Icon = cardIcons[i % cardIcons.length] ?? Braces
                return (
                  <Reveal as="li" key={card.title} delay={0.1 + i * 0.1}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="surface h-full rounded-2xl p-5 transition-colors duration-300 hover:border-accent/40"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-bg/60 text-accent-2">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-base font-semibold tracking-tight">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-2">{card.body}</p>
                    </motion.div>
                  </Reveal>
                )
              })}
            </ul>

            <Reveal delay={0.2} className="mt-10 lg:hidden">
              <ProfileJson />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
