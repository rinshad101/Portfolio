'use client'

import { useRef } from 'react'
import { Reveal } from '@/components/animations/Reveal'
import { SplitHeading } from '@/components/animations/SplitHeading'
import { experience } from '@/data/experience'
import { MOTION_OK, gsap, useGSAP } from '@/lib/animations'

export function Experience() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '[data-timeline-fill]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: track.current, start: 'top 65%', end: 'bottom 65%', scrub: 0.6 },
          },
        )
        gsap.utils.toArray<HTMLElement>('[data-timeline-dot]').forEach((dot) => {
          gsap.fromTo(
            dot,
            { scale: 0.4, opacity: 0.35 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: 'back.out(3)',
              scrollTrigger: { trigger: dot, start: 'top 65%', toggleActions: 'play none none reverse' },
            },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="experience" aria-labelledby="experience-title" className="section-y relative">
      <div className="container-x">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">04</span>
          <span className="h-px w-10 bg-line" />
          Experience
        </p>
        <SplitHeading id="experience-title" className="display-title mt-6">
          The Journey <span className="text-gradient">So Far.</span>
        </SplitHeading>

        <div ref={track} className="relative mt-16 lg:mt-24">
          {/* Track + animated fill */}
          <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-1/2">
            <div data-timeline-fill className="h-full w-full origin-top bg-gradient-to-b from-accent via-blue to-accent-2" />
          </div>

          <ol className="space-y-14 md:space-y-24">
            {experience.map((item, i) => {
              const left = i % 2 === 0
              return (
                <li key={item.id} className="relative grid gap-6 pl-10 md:grid-cols-2 md:gap-16 md:pl-0">
                  <span
                    data-timeline-dot
                    aria-hidden="true"
                    className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-4 border-bg bg-accent ring-1 ring-line md:left-1/2 md:-ml-[7px]"
                  />

                  <div className={left ? 'md:text-right' : 'md:order-2'}>
                    <p className="font-mono text-sm text-accent-2">{item.period}</p>
                    <p className="mt-1 font-mono text-xs text-muted">{item.location}</p>
                  </div>

                  <Reveal className={left ? '' : 'md:order-1 md:text-right'}>
                    <article className="surface rounded-2xl p-6 text-left sm:p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold tracking-tight">{item.role}</h3>
                        {item.placeholder && (
                          <span className="rounded-full border border-dashed border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                            Placeholder
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-fg-2">{item.organization}</p>
                      <p className="mt-4 text-sm leading-relaxed text-fg-2">{item.summary}</p>

                      <ul className="mt-4 space-y-1.5 text-sm text-fg-2">
                        {item.responsibilities.map((r) => (
                          <li key={r} className="flex gap-2">
                            <span className="text-accent">›</span>
                            {r}
                          </li>
                        ))}
                      </ul>

                      {item.contributions.length > 0 && (
                        <>
                          <p className="eyebrow mt-5 text-[10px]">Selected contributions</p>
                          <ul className="mt-2 space-y-1.5 text-sm text-fg-2">
                            {item.contributions.map((c) => (
                              <li key={c} className="flex gap-2">
                                <span className="text-green">✓</span>
                                {c}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                        {item.stack.map((s) => (
                          <li key={s} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-fg-2">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
