import { socialIcons } from '@/components/ui/BrandIcons'
import { BackToTop } from '@/components/ui/BackToTop'
import { activeSocials, navItems, profile } from '@/data/profile'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-2/40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="container-x py-14 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_auto]">
          <div>
            <p className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface font-mono text-xs font-semibold">
                {profile.initials}
              </span>
              <span className="font-display text-lg font-semibold">{profile.name}</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-2">
              {profile.brand} Backend systems, APIs and digital experiences — engineered with care.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={`/#${n.id}`} className="link-underline text-fg-2 hover:text-fg">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="eyebrow">Elsewhere</p>
            <ul className="flex gap-2">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-line text-fg-2 transition-colors hover:border-accent/60 hover:text-fg"
                  aria-label="Email"
                >
                  <span aria-hidden="true" className="font-mono text-sm">@</span>
                </a>
              </li>
              {activeSocials.map((s) => {
                const Icon = socialIcons[s.id]
                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-xl border border-line text-fg-2 transition-colors hover:border-accent/60 hover:text-fg"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                )
              })}
            </ul>
            <BackToTop />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="text-fg-2">
            Designed with intention. <span className="text-accent-2">Engineered with precision.</span>
          </p>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[18vw] font-bold leading-[0.75] tracking-[-0.06em] text-fg/[0.03]"
      >
        BEYOND THE CODE
      </p>
    </footer>
  )
}
