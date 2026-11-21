import { Reveal } from '@/components/animations/Reveal'
import { SplitHeading } from '@/components/animations/SplitHeading'
import { BentoCard } from '@/components/ui/BentoCard'
import { skills } from '@/data/skills'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y relative">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent">03</span>
              <span className="h-px w-10 bg-line" />
              Skills
            </p>
            <SplitHeading id="skills-title" className="display-title mt-6">
              Tools I <span className="text-gradient">Build With.</span>
            </SplitHeading>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-base leading-relaxed text-fg-2">
              A backend-first toolkit, rounded out with the frontend and tooling needed to ship complete products.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-5">
          {skills.map((group, i) => (
            <BentoCard key={group.id} group={group} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
