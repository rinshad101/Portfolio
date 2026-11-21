import type { Profile, SocialLink } from '@/types'

/**
 * ─────────────────────────────────────────────────────────────
 *  Single source of truth for personal details.
 *  Replace every value marked [EDIT] with your own information.
 * ─────────────────────────────────────────────────────────────
 */
export const profile: Profile = {
  name: 'Rinshad KK',
  initials: 'R',
  role: 'Java Full Stack Developer',
  headline: 'Java Full Stack Developer / Backend Engineer',
  positioning: 'Java Full Stack Developer | Backend Engineer | Building Scalable Digital Systems',
  brand: 'Beyond the Code.',
  tagline: 'Engineering the Future. One Line at a Time.',
  heroIntro:
    'I build reliable backend systems, scalable APIs, and seamless digital experiences that turn complex ideas into powerful software.',
  description:
    'Rinshad KK — Java Full Stack Developer from Kozhikode, Kerala, building Spring Boot microservices, secure REST APIs and React frontends.',
  location: 'Kozhikode, Kerala',
  availability: { available: true, label: 'Open to backend roles' },
  email: 'rinshadkk101@gmail.com',
  resume: { href: '/resume.pdf', fileName: 'Rinshad_KK_Resume.pdf' },
  bio: [
    "I'm Rinshad, a Java Full Stack Developer who designs and builds robust web applications with Java, Spring Boot and React — with a strong pull toward the backend.",
    'I enjoy breaking systems into well-defined Spring Boot microservices: API gateways, service discovery with Eureka, JWT-based authentication, and asynchronous communication with Kafka — all containerised with Docker. On the frontend I build responsive interfaces with React, Redux and Tailwind CSS.',
    "I care about clean architecture, agile ways of working, and software that stays scalable and user-centric as it grows. I'm always looking for challenging projects that stretch what I know.",
  ],
  cards: [
    {
      title: 'Engineering Philosophy',
      body: 'Clean architecture over clever shortcuts. Clear service boundaries, explicit API contracts and code the next engineer can understand quickly.',
    },
    {
      title: 'Backend Specialization',
      body: 'Spring Boot microservices, REST API design, JWT authentication and role-based access, and data persistence with JPA and SQL.',
    },
    {
      title: 'Continuous Learning',
      body: 'Always sharpening the craft — distributed systems, event-driven design with Kafka, cloud deployment and the evolving Java and React ecosystems.',
    },
  ],
  snapshot: {
    role: 'Java Full Stack Developer',
    focus: 'Backend Development',
    stack: ['Java', 'Spring Boot', 'Microservices', 'React'],
    mindset: 'Build. Learn. Improve.',
  },
  socials: [
    // Links with an empty href are hidden automatically.
    { id: 'github', label: 'GitHub', href: 'https://github.com/rinshad101', handle: '@rinshad101' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/rinshad-kk-1012b6306', handle: 'in/rinshad-kk' },
    { id: 'x', label: 'X', href: '', handle: '' },
  ],
  githubUsername: 'rinshad101',
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
