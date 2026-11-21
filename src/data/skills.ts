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
    items: ['MySQL', 'Oracle Database', 'MongoDB', 'SQL', 'Hibernate / JPA'],
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
    items: ['React', 'Redux', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    visual: 'editor',
    layout: 'normal',
  },
  {
    id: 'tools',
    title: 'DevOps & Tools',
    blurb: 'A reproducible workflow from commit to container.',
    items: ['Git', 'GitHub Actions', 'Docker', 'Kubernetes', 'AWS', 'Postman'],
    visual: 'orbit',
    layout: 'normal',
  },
  {
    id: 'architecture',
    title: 'Architecture',
    blurb: 'Clear layers, clean contracts and services that are easy to change.',
    items: ['Microservices', 'API Gateway', 'Eureka', 'Apache Kafka', 'Feign Clients', 'Clean Architecture', 'MVC'],
    visual: 'layers',
    layout: 'full',
  },
]

export const allSkills = Array.from(new Set(skills.flatMap((s) => s.items)))
