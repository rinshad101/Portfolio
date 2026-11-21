import type { SkillGroup } from '@/types'

export const skills: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    blurb: 'Services that are predictable under load and pleasant to integrate with.',
    items: ['Java', 'Spring Boot', 'REST APIs', 'Microservices'],
    visual: 'api-flow',
    layout: 'wide',
  },
  {
    id: 'database',
    title: 'Database Engineering',
    blurb: 'Schemas, mappings and queries designed on purpose.',
    items: ['Oracle Database', 'SQL', 'Hibernate', 'JPA'],
    visual: 'query',
    layout: 'normal',
  },
  {
    id: 'security',
    title: 'Security',
    blurb: 'Secure defaults and explicit trust boundaries.',
    items: ['Spring Security', 'JWT', 'Authentication', 'Authorization'],
    visual: 'token',
    layout: 'normal',
  },
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Interfaces that make complex systems feel simple.',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    visual: 'editor',
    layout: 'normal',
  },
  {
    id: 'tools',
    title: 'Development Tools',
    blurb: 'A reproducible workflow from commit to container.',
    items: ['Git', 'GitHub', 'Docker', 'Maven'],
    visual: 'orbit',
    layout: 'normal',
  },
  {
    id: 'architecture',
    title: 'Architecture',
    blurb: 'Clear layers, clean contracts and systems that are easy to change.',
    items: ['API Design', 'Layered Architecture', 'Caching', 'Testing', 'MapStruct'],
    visual: 'layers',
    layout: 'full',
  },
]

export const allSkills = Array.from(new Set(skills.flatMap((s) => s.items)))
