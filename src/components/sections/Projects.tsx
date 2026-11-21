import { Reveal } from '@/components/animations/Reveal'
import { SplitHeading } from '@/components/animations/SplitHeading'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects } from '@/data/projects'

export function Projects() {
  const [featured, ...rest] = projects
  return (
    <section id="work" aria-labelledby="work-title" className="section-y relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-[40rem] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgb(var(--accent-rgb)/0.08),transparent)]" />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent">02</span>
              <span className="h-px w-10 bg-line" />
              Work
            </p>
            <SplitHeading id="work-title" className="display-title mt-6">
              Selected <span className="text-gradient">Work.</span>
            </SplitHeading>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-base leading-relaxed text-fg-2">
              Thoughtfully engineered solutions, built to solve real problems.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:mt-20 lg:grid-cols-2 lg:gap-6">
          {featured && (
            <Reveal className="lg:col-span-2" y={48}>
              <ProjectCard project={featured} index={0} featured />
            </Reveal>
          )}
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.12} y={48} className={i % 2 === 1 ? 'lg:translate-y-16' : ''}>
              <ProjectCard project={project} index={i + 1} />
            </Reveal>
          ))}
        </div>
        <div className="hidden h-16 lg:block" aria-hidden="true" />
      </div>
    </section>
  )
}
