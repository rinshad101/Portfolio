import { ArrowUpRight, BookOpen, GitFork, Star } from 'lucide-react'
import Link from 'next/link'
import { Reveal } from '@/components/animations/Reveal'
import { SplitHeading } from '@/components/animations/SplitHeading'
import { GitHubIcon } from '@/components/ui/BrandIcons'
import { githubSocial, profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { getRepos } from '@/lib/github'

interface RepoCardData {
  key: string
  name: string
  description: string
  href: string
  external: boolean
  tags: string[]
  stars?: number
  forks?: number
  language?: string | null
}

export async function GitHub() {
  const result = await getRepos(profile.githubUsername)

  const cards: RepoCardData[] =
    result.status === 'ok' && result.repos.length > 0
      ? result.repos.map((r) => ({
          key: r.name,
          name: r.name,
          description: r.description ?? 'No description provided.',
          href: r.url,
          external: true,
          tags: r.topics.length ? r.topics : r.language ? [r.language] : [],
          stars: r.stars,
          forks: r.forks,
          language: r.language,
        }))
      : // Fallback: curated project data from src/data/projects.ts
        projects.slice(0, 3).map((p) => ({
          key: p.slug,
          name: p.slug,
          description: p.summary,
          href: p.links.github ?? `/projects/${p.slug}`,
          external: Boolean(p.links.github),
          tags: p.stack.slice(0, 4),
        }))

  const live = result.status === 'ok' && result.repos.length > 0

  return (
    <section id="github" aria-labelledby="github-title" className="section-y relative">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent">06</span>
              <span className="h-px w-10 bg-line" />
              Open Source
            </p>
            <SplitHeading id="github-title" className="display-title mt-6">
              Building in <span className="text-gradient">Public.</span>
            </SplitHeading>
          </div>
          <Reveal delay={0.15} className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-sm text-base leading-relaxed text-fg-2 md:text-right">
              {live
                ? 'Recent public repositories, pulled live from GitHub.'
                : 'Selected repositories and experiments. Source links appear as projects are published.'}
            </p>
            {githubSocial && (
              <a
                href={githubSocial.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm text-fg transition-colors hover:border-accent/60"
              >
                <GitHubIcon className="h-4 w-4" />
                {githubSocial.handle}
                <ArrowUpRight size={14} />
              </a>
            )}
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const content = (
              <>
                <div className="flex items-center justify-between">
                  <BookOpen size={16} className="text-accent-2" aria-hidden="true" />
                  <ArrowUpRight size={16} className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden="true" />
                </div>
                <h3 className="mt-5 break-all font-mono text-base font-medium text-fg">{card.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-fg-2">{card.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
                  {card.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-fg-2">
                      {t}
                    </span>
                  ))}
                  {card.stars !== undefined && (
                    <span className="ml-auto flex items-center gap-3 font-mono text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Star size={12} aria-hidden="true" />
                        <span className="sr-only">Stars:</span>
                        {card.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={12} aria-hidden="true" />
                        <span className="sr-only">Forks:</span>
                        {card.forks}
                      </span>
                    </span>
                  )}
                </div>
              </>
            )
            const className =
              'surface group flex h-full flex-col rounded-2xl p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-accent/50'
            return (
              <Reveal as="li" key={card.key} delay={(i % 3) * 0.08}>
                {card.external ? (
                  <a href={card.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {content}
                  </a>
                ) : (
                  <Link href={card.href} className={className}>
                    {content}
                  </Link>
                )}
              </Reveal>
            )
          })}
        </ul>
        {result.status === 'error' && (
          <p className="mt-6 font-mono text-xs text-muted">
            Live GitHub data is temporarily unavailable ({result.reason}). Showing curated projects instead.
          </p>
        )}
      </div>
    </section>
  )
}
