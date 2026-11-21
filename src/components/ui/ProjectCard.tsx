'use client'

import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import Link from 'next/link'
import type { PointerEvent } from 'react'
import { GitHubIcon } from '@/components/ui/BrandIcons'
import { ProjectVisual } from '@/components/ui/ProjectVisual'
import { useFinePointer, useReducedMotion } from '@/hooks/useReducedMotion'
import { cn, pad } from '@/lib/utils'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
  featured?: boolean
}

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const interactive = fine && !reduced

  const rx = useSpring(0, { stiffness: 200, damping: 22 })
  const ry = useSpring(0, { stiffness: 200, damping: 22 })
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgb(var(--accent-rgb) / 0.16), transparent 45%)`

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!interactive) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    mx.set(px * 100)
    my.set(py * 100)
    ry.set((px - 0.5) * 6)
    rx.set(-(py - 0.5) * 6)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  const caseStudy = `/projects/${project.slug}`

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className={cn(
        'surface gradient-border group relative flex h-full flex-col overflow-hidden rounded-3xl',
        featured && 'lg:grid lg:grid-cols-[1.05fr_1fr]',
      )}
    >
      <motion.div aria-hidden="true" style={{ background: spotlight }} className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Visual */}
      <Link
        href={caseStudy}
        data-cursor="view"
        tabIndex={-1}
        aria-hidden="true"
        className={cn(
          'relative z-10 block overflow-hidden bg-[radial-gradient(ellipse_at_top,rgb(var(--accent-rgb)/0.18),transparent_70%)] p-5 sm:p-7',
          featured ? 'aspect-[16/11] lg:order-2 lg:aspect-auto lg:min-h-[26rem]' : 'aspect-[16/11]',
        )}
      >
        <div className="h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-[1.02]">
          <ProjectVisual kind={project.visual} />
        </div>
      </Link>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3 font-mono text-xs">
          <span className="text-muted">
            {pad(index + 1)} <span className="mx-1.5 text-line">/</span>
            <span className="text-accent-2">{project.category}</span>
          </span>
          {project.placeholder && (
            <span className="rounded-full border border-dashed border-line px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted">
              Placeholder
            </span>
          )}
        </div>

        <h3 className={cn('mt-4 font-semibold tracking-tight', featured ? 'text-3xl sm:text-4xl' : 'text-2xl')}>
          <Link href={caseStudy} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-2 sm:text-base">{project.summary}</p>

        {featured && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-2 text-[10px]">Key challenges</p>
              <ul className="space-y-1.5 text-sm text-fg-2">
                {project.challenges.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-accent">›</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-2 text-[10px]">Architecture</p>
              <ul className="space-y-1.5 text-sm text-fg-2">
                {project.architecture.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-accent-2">›</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technology stack">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full border border-line bg-bg/50 px-2.5 py-1 font-mono text-[11px] text-fg-2">
              {s}
            </li>
          ))}
        </ul>

        <div className="relative z-20 mt-auto flex flex-wrap items-center gap-2 pt-7">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-fg">
            View Case Study
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <span className="flex-1" />
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg-2 transition-colors hover:border-accent/60 hover:text-fg"
              aria-label={`${project.title} source code on GitHub`}
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg-2 transition-colors hover:border-accent/60 hover:text-fg"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
