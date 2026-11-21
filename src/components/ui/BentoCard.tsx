'use client'

import { Cpu, Database, Layers, Monitor, ShieldCheck, Wrench } from 'lucide-react'
import { motion } from 'motion/react'
import { BentoVisual } from '@/components/ui/BentoVisuals'
import { cn } from '@/lib/utils'
import type { SkillGroup } from '@/types'

const icons = {
  backend: Cpu,
  database: Database,
  security: ShieldCheck,
  frontend: Monitor,
  tools: Wrench,
  architecture: Layers,
} as const

export function BentoCard({ group, index }: { group: SkillGroup; index: number }) {
  const Icon = icons[group.id as keyof typeof icons] ?? Cpu
  return (
    <motion.li
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={cn(
        'surface group relative flex flex-col overflow-hidden rounded-3xl p-6 transition-[border-color,box-shadow] duration-500 hover:border-accent/50 hover:shadow-[0_30px_60px_-30px_rgb(var(--accent-rgb)/0.55)] sm:p-7',
        group.layout === 'wide' && 'md:col-span-2',
        group.layout === 'full' && 'md:col-span-2 lg:col-span-3',
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{group.title}</h3>
          <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-fg-2">{group.blurb}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-bg/60 text-accent-2 transition-colors group-hover:border-accent/50">
          <Icon size={18} aria-hidden="true" />
        </span>
      </div>

      <div className={cn('my-6 flex-1', group.layout === 'full' ? 'min-h-36' : 'min-h-40')}>
        <BentoVisual kind={group.visual} />
      </div>

      <ul className="flex flex-wrap gap-1.5" aria-label={`${group.title} skills`}>
        {group.items.map((item) => (
          <li key={item} className="rounded-full border border-line bg-bg/50 px-3 py-1 font-mono text-xs text-fg">
            {item}
          </li>
        ))}
      </ul>
    </motion.li>
  )
}
