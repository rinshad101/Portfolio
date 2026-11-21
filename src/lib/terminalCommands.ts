import { experience } from '@/data/experience'
import { activeSocials, githubSocial, profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'
import type { Accent } from '@/types'

/**
 * Terminal output is plain structured data rendered by React (which escapes all text).
 * Nothing typed by the user is ever evaluated — commands are looked up in a fixed registry.
 */
export type Tone = 'default' | 'muted' | 'accent' | 'success' | 'error' | 'info' | 'heading'

export interface Segment {
  text: string
  tone?: Tone
  /** Renders as a link the visitor must click explicitly. */
  href?: string
  download?: boolean
}

export type OutputLine = Segment[]

export interface CommandResult {
  lines: OutputLine[]
  clear?: boolean
}

export interface CommandContext {
  accent: Accent
  setAccent: (accent: Accent) => void
}

export const commandNames = [
  'help',
  'about',
  'skills',
  'projects',
  'experience',
  'contact',
  'github',
  'resume',
  'whoami',
  'clear',
  'theme',
  'neofetch',
] as const

export type CommandName = (typeof commandNames)[number]

interface TerminalCommand {
  description: string
  usage?: string
  run: (args: string[], ctx: CommandContext) => CommandResult
}

const ACCENTS: Accent[] = ['purple', 'cyan', 'green']

const t = (text: string, tone: Tone = 'default'): Segment => ({ text, tone })
const line = (...segments: Segment[]): OutputLine => segments
const blank: OutputLine = [t('')]

function list(items: string[], bullet = '  ›'): OutputLine[] {
  return items.map((item) => line(t(`${bullet} `, 'accent'), t(item)))
}

export const registry: Record<CommandName, TerminalCommand> = {
  help: {
    description: 'Show all commands',
    run: () => ({
      lines: [
        line(t('Available commands', 'heading')),
        blank,
        ...commandNames.map((name) =>
          line(t(`  ${(registry[name].usage ?? name).padEnd(16)}`, 'accent'), t(registry[name].description, 'muted')),
        ),
        blank,
        line(t('Tip: ', 'info'), t('↑/↓ browse history · Tab autocompletes · Ctrl+L clears', 'muted')),
      ],
    }),
  },

  about: {
    description: 'Display developer information',
    run: () => ({
      lines: [
        line(t(profile.name, 'heading'), t(`  ${profile.headline}`, 'muted')),
        blank,
        ...profile.bio.map((p) => line(t(p))),
        blank,
        line(t('location  ', 'accent'), t(profile.location)),
        line(t('status    ', 'accent'), t(profile.availability.label, profile.availability.available ? 'success' : 'muted')),
      ],
    }),
  },

  skills: {
    description: 'List technical skills',
    run: () => ({
      lines: skills.flatMap((group) => [
        line(t(`▸ ${group.title}`, 'heading')),
        line(t(`  ${group.items.join('  ·  ')}`)),
      ]),
    }),
  },

  projects: {
    description: 'Display available projects',
    run: () => ({
      lines: [
        ...projects.flatMap((p, i) => [
          line(
            t(`${String(i + 1).padStart(2, '0')}  `, 'muted'),
            { text: p.title, tone: 'heading', href: `/projects/${p.slug}` },
            t(p.placeholder ? '  [placeholder]' : '', 'muted'),
          ),
          line(t(`    ${p.category} — ${p.stack.slice(0, 4).join(', ')}`, 'muted')),
        ]),
        blank,
        line(t('Click a project title to open its case study.', 'info')),
      ],
    }),
  },

  experience: {
    description: 'Display experience details',
    run: () => ({
      lines: experience.flatMap((e) => [
        line(t(e.role, 'heading'), t(` @ ${e.organization}`, 'accent'), t(e.placeholder ? '  [placeholder]' : '', 'muted')),
        line(t(`  ${e.period} · ${e.location}`, 'muted')),
        ...list(e.responsibilities.slice(0, 2), '   ·'),
        blank,
      ]),
    }),
  },

  contact: {
    description: 'Show social and contact details',
    run: () => ({
      lines: [
        line(t('email     ', 'accent'), { text: profile.email, href: `mailto:${profile.email}` }),
        ...activeSocials.map((s) => line(t(s.label.toLowerCase().padEnd(10), 'accent'), { text: s.handle, href: s.href })),
        blank,
        line(t('Or scroll to the contact form below.', 'muted')),
      ],
    }),
  },

  github: {
    description: 'Open GitHub profile (click to confirm)',
    run: () =>
      githubSocial
        ? {
            lines: [
              line(t('GitHub profile ready. ', 'success'), t('Click to open in a new tab:', 'muted')),
              line(t('  → ', 'accent'), { text: githubSocial.href, href: githubSocial.href }),
            ],
          }
        : { lines: [line(t('GitHub profile not configured yet.', 'muted'))] },
  },

  resume: {
    description: 'Download resume (click to confirm)',
    run: () => ({
      lines: [
        line(t('Resume ready. ', 'success'), t('Click to download:', 'muted')),
        line(t('  ↓ ', 'accent'), { text: profile.resume.fileName, href: profile.resume.href, download: true }),
      ],
    }),
  },

  whoami: {
    description: 'Display a fun developer introduction',
    run: () => ({
      lines: [
        line(t('visitor', 'accent'), t(' — but since you asked about me:')),
        line(t(`I'm ${profile.name}. I turn coffee into REST endpoints,`)),
        line(t('null pointers into lessons, and ideas into running software.')),
        line(t(profile.brand, 'heading')),
      ],
    }),
  },

  clear: {
    description: 'Clear terminal history',
    run: () => ({ lines: [], clear: true }),
  },

  theme: {
    description: 'Display or change accent theme',
    usage: 'theme [name]',
    run: (args, ctx) => {
      const requested = args[0]?.toLowerCase()
      if (!requested) {
        return {
          lines: [
            line(t('current theme: ', 'muted'), t(ctx.accent, 'accent')),
            line(t('available:     ', 'muted'), t(ACCENTS.join(' · '))),
            line(t('usage:         ', 'muted'), t('theme cyan')),
          ],
        }
      }
      if (!ACCENTS.includes(requested as Accent)) {
        return { lines: [line(t(`Unknown theme "${requested}". Try: ${ACCENTS.join(', ')}`, 'error'))] }
      }
      ctx.setAccent(requested as Accent)
      return { lines: [line(t('✓ ', 'success'), t('Accent theme set to '), t(requested, 'accent'))] }
    },
  },

  neofetch: {
    description: 'Display an ASCII developer profile',
    run: (_args, ctx) => {
      const art = [
        '   ██████╗ ████████╗ ██████╗ ',
        '   ██╔══██╗╚══██╔══╝██╔════╝ ',
        '   ██████╔╝   ██║   ██║      ',
        '   ██╔══██╗   ██║   ██║      ',
        '   ██████╔╝   ██║   ╚██████╗ ',
        '   ╚═════╝    ╚═╝    ╚═════╝ ',
      ]
      const info: Array<[string, string]> = [
        ['user', profile.name],
        ['role', profile.role],
        ['focus', 'Backend Development'],
        ['lang', 'Java · SQL · TypeScript'],
        ['frameworks', 'Spring Boot · React · Next.js'],
        ['theme', ctx.accent],
      ]
      return {
        lines: [
          ...art.map((row, i) => {
            const entry = info[i]
            return entry
              ? line(t(row, 'accent'), t(`  ${entry[0].padEnd(11)}`, 'info'), t(entry[1]))
              : line(t(row, 'accent'))
          }),
          blank,
          line(t(`  ${profile.brand}`, 'heading')),
        ],
      }
    },
  },
}

export function isCommand(name: string): name is CommandName {
  return (commandNames as readonly string[]).includes(name)
}

export function executeCommand(raw: string, ctx: CommandContext): CommandResult {
  const [name = '', ...args] = raw.trim().split(/\s+/)
  const key = name.toLowerCase()
  if (!key) return { lines: [] }
  if (isCommand(key)) return registry[key].run(args, ctx)

  const suggestion = commandNames.find((c) => c.startsWith(key.slice(0, 2)))
  return {
    lines: [
      line(t(`command not found: ${name.slice(0, 40)}`, 'error')),
      line(
        t(suggestion ? `Did you mean "` : 'Type ', 'muted'),
        t(suggestion ?? 'help', 'accent'),
        t(suggestion ? '"? Type help for all commands.' : ' to see available commands.', 'muted'),
      ),
    ],
  }
}

/** Returns completion candidates for the current input. */
export function complete(input: string): CommandName[] {
  const q = input.trim().toLowerCase()
  if (!q || q.includes(' ')) return []
  return commandNames.filter((c) => c.startsWith(q))
}
