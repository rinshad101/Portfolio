import type { ExperienceItem } from '@/types'

/**
 * Sources: CV (Rinshad_KK_Resume, July 2025) and the public LinkedIn profile.
* Entries marked `placeholder: true` need details confirmed — never list
 * contributions you cannot stand behind.
 */
export const experience: ExperienceItem[] = [
  {
    id: 'lenok',
    role: 'Java Developer',
    organization: 'Lenok',
    period: 'Dec 2025 — Present',
    location: 'Kerala, India',
    summary: 'Java Developer building and maintaining backend applications.',
    // [EDIT] Add 2–3 responsibilities and the main technologies you use at Lenok.
    responsibilities: [],
    contributions: [],
    stack: ['Java'],
    placeholder: false,
  },
  {
    id: 'bridgeon',
    role: 'Java Full Stack Intern',
    organization: 'Bridgeon Solutions',
    period: '2024 — Nov 2025',
    location: 'Kerala, India',
    summary:
      'Full-stack internship focused on Java, Spring Boot and React — from REST API design to responsive, user-friendly interfaces.',
    responsibilities: [
      'Built a task-management web application with Java, Spring Boot, React.js and MySQL',
      'Designed responsive front-end interfaces with HTML, CSS and JavaScript, focusing on usability and clean design',
      'Integrated front-end and back-end through RESTful APIs, strengthening data-handling skills',
      'Used Git for version control throughout development',
    ],
    contributions: [],
    stack: ['Java', 'Spring Boot', 'React', 'MySQL', 'Git', 'REST APIs'],
    placeholder: false,
  },
  {
    id: 'education',
    role: 'Diploma in Computer Engineering',
    organization: 'Government Polytechnic College, Muttom',
    period: '2021 — 2024',
    location: 'Thodupuzha, Kerala',
    summary: 'Three-year diploma in Computer Engineering.',
    responsibilities: [],
    contributions: [],
    stack: [],
    placeholder: false,
  },
]
