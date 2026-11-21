import type { ExperienceItem } from '@/types'

/**
 * [EDIT] Placeholder milestones. Replace with your real roles and set
 * `placeholder: false`. Never list contributions you cannot stand behind.
 */
export const experience: ExperienceItem[] = [
  {
    id: 'current',
    role: 'Software Engineer',
    organization: 'Company Name',
    period: '20XX — Present',
    location: 'City, Country',
    summary: 'Describe the team, the product and your role in one or two sentences.',
    responsibilities: [
      'Design and build REST APIs with Java and Spring Boot',
      'Implement authentication and authorization with Spring Security and JWT',
      'Model data and write efficient queries with JPA, Hibernate and Oracle SQL',
    ],
    contributions: ['Add a specific contribution you are proud of', 'Add another verifiable contribution'],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'Oracle', 'JPA'],
    placeholder: true,
  },
  {
    id: 'previous',
    role: 'Junior Developer',
    organization: 'Company Name',
    period: '20XX — 20XX',
    location: 'City, Country',
    summary: 'Describe what you worked on and what you learned.',
    responsibilities: [
      'Built and maintained features across backend and frontend',
      'Wrote unit and integration tests',
      'Collaborated through code review and Git-based workflows',
    ],
    contributions: ['Add a specific contribution'],
    stack: ['Java', 'SQL', 'React', 'Git'],
    placeholder: true,
  },
  {
    id: 'education',
    role: 'Degree or Certification',
    organization: 'Institution Name',
    period: '20XX — 20XX',
    location: 'City, Country',
    summary: 'Your education, bootcamp or a key certification.',
    responsibilities: ['Relevant coursework or focus areas', 'Capstone or thesis topic'],
    contributions: [],
    stack: ['Java', 'Data Structures', 'Databases'],
    placeholder: true,
  },
]
