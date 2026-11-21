import type { Profile, SocialLink } from '@/types'

/**
 * ─────────────────────────────────────────────────────────────
 *  Single source of truth for personal details.
 *  Replace every value marked [EDIT] with your own information.
 * ─────────────────────────────────────────────────────────────
 */
export const profile: Profile = {
  name: 'Your Name', // [EDIT]
  initials: 'YN', // [EDIT]
  role: 'Software Engineer',
  headline: 'Software Engineer / Backend Developer',
  positioning: 'Software Engineer | Backend Developer | Building Scalable Digital Systems',
  brand: 'Beyond the Code.',
  tagline: 'Engineering the Future. One Line at a Time.',
  heroIntro:
    'I build reliable backend systems, scalable APIs, and seamless digital experiences that turn complex ideas into powerful software.',
  description:
    'Software engineer specializing in Java, Spring Boot, REST APIs, microservices and secure backend architecture, with a modern React and Next.js frontend toolkit.',
  location: 'Your City, Country', // [EDIT]
  availability: { available: true, label: 'Available for new opportunities' }, // [EDIT]
  email: 'hello@example.com', // [EDIT]
  resume: { href: '/resume.pdf', fileName: 'resume.pdf' }, // [EDIT] replace public/resume.pdf
  bio: [
    // [EDIT] Write your own story here.
    'I am a software engineer who enjoys the parts of a system most people never see: the APIs, data models and security layers that keep a product fast, correct and trustworthy.',
    'My core toolkit is Java and Spring Boot. I design RESTful services, secure them with Spring Security and JWT, and model data carefully with Hibernate, JPA and Oracle SQL. On the frontend I work with React and Next.js to bring those systems to life.',
    'I care about clean architecture, readable code and decisions that still make sense a year later.',
  ],
  cards: [
    {
      title: 'Engineering Philosophy',
      body: 'Simple over clever. Explicit contracts, small focused services and code that the next engineer can understand quickly.',
    },
    {
      title: 'Backend Specialization',
      body: 'Spring Boot services, REST API design, authentication and authorization, and relational data modelling with JPA and SQL.',
    },
    {
      title: 'Continuous Learning',
      body: 'Always sharpening fundamentals — distributed systems, testing strategies and the evolving Java and React ecosystems.',
    },
  ],
  snapshot: {
    role: 'Software Engineer',
    focus: 'Backend Development',
    stack: ['Java', 'Spring Boot', 'React'],
    mindset: 'Build. Learn. Improve.',
  },
  socials: [
    // [EDIT] Add full URLs. Links with an empty href are hidden automatically.
    { id: 'github', label: 'GitHub', href: '', handle: '@your-username' },
    { id: 'linkedin', label: 'LinkedIn', href: '', handle: 'in/your-profile' },
    { id: 'x', label: 'X', href: '', handle: '@your-handle' },
  ],
  githubUsername: '', // [EDIT] e.g. 'octocat' — enables live repositories in the GitHub section
}

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

/** Social links that have been configured (non-empty href). */
export const activeSocials: SocialLink[] = profile.socials.filter((s) => s.href.trim() !== '')

export const githubSocial = activeSocials.find((s) => s.id === 'github')

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']
