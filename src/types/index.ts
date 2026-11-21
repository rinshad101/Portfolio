export type Accent = 'purple' | 'cyan' | 'green'

export type SocialId = 'github' | 'linkedin' | 'x'

export interface SocialLink {
  id: SocialId
  label: string
  /** Full URL. Leave empty to hide the link everywhere on the site. */
  href: string
  /** Short display handle, e.g. "@username". */
  handle: string
}

export interface InfoCard {
  title: string
  body: string
}

export interface Profile {
  name: string
  initials: string
  role: string
  headline: string
  positioning: string
  brand: string
  tagline: string
  heroIntro: string
  /** Used for SEO meta descriptions. */
  description: string
  location: string
  availability: { available: boolean; label: string }
  email: string
  resume: { href: string; fileName: string }
  bio: string[]
  cards: InfoCard[]
  /** Shown in the About section as a JSON snippet. */
  snapshot: Record<string, string | string[]>
  socials: SocialLink[]
  /** GitHub username for the "Building in Public" section. Empty = use project fallback. */
  githubUsername: string
}

export type ProjectVisualKind = 'dashboard' | 'api' | 'auth' | 'database' | 'fullstack'

export interface Project {
  slug: string
  title: string
  category: string
  summary: string
  stack: string[]
  challenges: string[]
  architecture: string[]
  problem: string
  solution: string
  approach: string[]
  /** Only list outcomes you can verify. Leave empty otherwise. */
  outcomes: string[]
  links: { github?: string; demo?: string }
  visual: ProjectVisualKind
  year: string
  /** Renders a visible "placeholder" badge until real project data is supplied. */
  placeholder: boolean
}

export type SkillVisualKind = 'api-flow' | 'query' | 'token' | 'editor' | 'orbit' | 'layers'

export interface SkillGroup {
  id: string
  title: string
  blurb: string
  items: string[]
  visual: SkillVisualKind
  layout: 'wide' | 'normal' | 'full'
}

export interface ExperienceItem {
  id: string
  role: string
  organization: string
  period: string
  location: string
  summary: string
  responsibilities: string[]
  contributions: string[]
  stack: string[]
  placeholder: boolean
}

export interface GitHubRepo {
  name: string
  description: string | null
  url: string
  language: string | null
  stars: number
  forks: number
  topics: string[]
}
