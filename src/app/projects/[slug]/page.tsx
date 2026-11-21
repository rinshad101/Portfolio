import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Reveal } from '@/components/animations/Reveal'
import { GitHubIcon } from '@/components/ui/BrandIcons'
import { ProjectVisual } from '@/components/ui/ProjectVisual'
import { profile, siteUrl } from '@/data/profile'
import { getProject, projects } from '@/data/projects'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  const url = `/projects/${project.slug}`
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { type: 'article', url, title: `${project.title} — ${profile.name}`, description: project.summary },
    twitter: { card: 'summary_large_image', title: project.title, description: project.summary },
  }
}

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="grid gap-4 border-t border-line py-10 md:grid-cols-[14rem_1fr] md:gap-10 md:py-14">
      <h2 className="flex items-baseline gap-3 font-display text-xl font-semibold tracking-tight">
        <span className="font-mono text-xs text-accent">{index}</span>
        {title}
      </h2>
      <div className="text-base leading-relaxed text-fg-2 sm:text-lg">{children}</div>
    </Reveal>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" aria-hidden="true" />
          {it}
        </li>
      ))}
    </ul>
  )
}

export default async function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const idx = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(idx + 1) % projects.length]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: `${siteUrl}/projects/${project.slug}`,
    author: { '@type': 'Person', name: profile.name },
    keywords: project.stack.join(', '),
  }

  return (
    <article className="relative pt-32 sm:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgb(var(--accent-rgb)/0.18),transparent)]" />

      <div className="container-x">
        <Link href="/#work" className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-fg-2 hover:text-fg">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          All work
        </Link>

        <header className="mt-8 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="text-accent-2">{project.category}</span>
            <span className="text-line">/</span>
            <span className="text-muted">{project.year}</span>
            {project.placeholder && (
              <span className="rounded-full border border-dashed border-line px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                Placeholder case study
              </span>
            )}
          </div>
          <h1 className="display-title mt-5">{project.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2 sm:text-xl">{project.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm hover:border-accent/60">
                <GitHubIcon className="h-4 w-4" /> Source code
              </a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg">
                <ExternalLink size={15} /> Live demo
              </a>
            )}
          </div>
        </header>

        <Reveal y={40} className="surface gradient-border mt-14 aspect-[16/10] overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_top,rgb(var(--accent-rgb)/0.2),transparent_70%)] p-5 sm:aspect-[16/8] sm:p-10">
          <ProjectVisual kind={project.visual} />
        </Reveal>

        <div className="mx-auto mt-16 max-w-5xl">
          <Block index="01" title="Problem">
            <p>{project.problem}</p>
          </Block>
          <Block index="02" title="Solution">
            <p>{project.solution}</p>
          </Block>
          <Block index="03" title="Architecture">
            <Bullets items={project.architecture} />
          </Block>
          <Block index="04" title="Tech stack">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-sm text-fg">
                  {s}
                </li>
              ))}
            </ul>
          </Block>
          <Block index="05" title="Approach">
            <Bullets items={project.approach} />
          </Block>
          <Block index="06" title="Challenges">
            <Bullets items={project.challenges} />
          </Block>
          <Block index="07" title="Outcomes">
            {project.outcomes.length > 0 ? (
              <Bullets items={project.outcomes} />
            ) : (
              <p className="font-mono text-sm text-muted">Verified results will be added once available.</p>
            )}
          </Block>
        </div>

        {next && next.slug !== project.slug && (
          <Link
            href={`/projects/${next.slug}`}
            data-cursor="view"
            className="group mt-10 mb-24 flex flex-col gap-3 rounded-3xl border border-line p-8 transition-colors hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between sm:p-12"
          >
            <span className="eyebrow">Next project</span>
            <span className="flex items-center gap-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              {next.title}
              <ArrowRight className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:translate-x-2" />
            </span>
          </Link>
        )}
      </div>
    </article>
  )
}
