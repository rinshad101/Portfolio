import { ArrowUpRight, Mail } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { SplitHeading } from '@/components/animations/SplitHeading'
import { socialIcons } from '@/components/ui/BrandIcons'
import { ContactForm } from '@/components/ui/ContactForm'
import { CopyEmailButton } from '@/components/ui/CopyEmailButton'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { activeSocials, profile } from '@/data/profile'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift absolute bottom-[-30%] left-1/2 h-[50rem] w-[80rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-rgb)/0.2),transparent)]" />
        <div className="perspective-grid absolute inset-0 opacity-30" />
      </div>

      <div className="container-x">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">07</span>
          <span className="h-px w-10 bg-line" />
          Contact
        </p>
        <SplitHeading id="contact-title" className="mt-6 text-[clamp(2.75rem,1rem+7.5vw,8rem)] font-bold leading-[0.9] tracking-[-0.055em]">
          LET&apos;S BUILD <br />
          <span className="text-gradient">SOMETHING GREAT.</span>
        </SplitHeading>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="max-w-md text-lg leading-relaxed text-fg-2">
                Have an interesting project, opportunity, or idea? I&apos;d love to hear about it.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <p className="eyebrow mb-3">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="link-underline break-all font-display text-2xl font-medium tracking-tight sm:text-3xl"
              >
                {profile.email}
              </a>
              <div className="mt-5 flex flex-wrap gap-3">
                <MagneticButton href={`mailto:${profile.email}`}>
                  <Mail size={16} />
                  Start a conversation
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </MagneticButton>
                <CopyEmailButton email={profile.email} />
              </div>
            </Reveal>

            {activeSocials.length > 0 && (
              <Reveal delay={0.2} className="mt-10">
                <p className="eyebrow mb-3">Elsewhere</p>
                <ul className="divide-y divide-line border-y border-line">
                  {activeSocials.map((s) => {
                    const Icon = socialIcons[s.id]
                    return (
                      <li key={s.id}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 py-4 text-fg-2 transition-colors hover:text-fg"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="font-medium text-fg">{s.label}</span>
                          <span className="font-mono text-xs">{s.handle}</span>
                          <ArrowUpRight size={16} className="ml-auto transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </Reveal>
            )}

            <Reveal delay={0.25} className="mt-10">
              <p className="font-mono text-xs text-muted">
                Based in {profile.location} · Open to remote collaboration
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={40}>
            <ContactForm fallbackEmail={profile.email} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
