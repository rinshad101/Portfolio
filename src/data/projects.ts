import type { Project } from '@/types'

/**
 * Placeholder projects. Each one describes the *kind* of system you might showcase.
 * Replace them with your real work, set `placeholder: false`, and only add
 * `outcomes` you can verify. Add `links.github` / `links.demo` when available.
 */
export const projects: Project[] = [
  {
    slug: 'enterprise-management-platform',
    title: 'Enterprise Management Platform',
    category: 'Enterprise Platform',
    summary:
      'A modular back-office platform for managing users, departments, workflows and audit trails, built as a set of Spring Boot services behind a React dashboard.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'Oracle', 'JPA', 'React'],
    challenges: [
      'Role-based access across many modules without duplicating rules',
      'Keeping audit history consistent across transactional writes',
    ],
    architecture: [
      'Layered services: controller → service → repository',
      'Centralised authorization with method-level security',
      'DTO mapping with MapStruct to keep entities internal',
    ],
    problem:
      'Organisations often juggle spreadsheets and disconnected tools for core operations, which makes permissions, reporting and accountability hard to manage.',
    solution:
      'A single platform with clear module boundaries, consistent role-based access and a shared audit layer, exposed through a documented REST API and a responsive dashboard.',
    approach: [
      'Model the domain first and agree on API contracts before implementation',
      'Introduce authorization as a cross-cutting concern instead of per-endpoint checks',
      'Write integration tests around transactional boundaries',
    ],
    outcomes: [],
    links: {},
    visual: 'dashboard',
    year: '20XX',
    placeholder: true,
  },
  {
    slug: 'rest-api-architecture',
    title: 'Scalable REST API Architecture',
    category: 'API Architecture',
    summary:
      'A versioned, well-documented REST API foundation with consistent error handling, pagination, validation and observability built in from day one.',
    stack: ['Java', 'Spring Boot', 'REST', 'OpenAPI', 'Docker', 'Maven'],
    challenges: [
      'Consistent error contracts across every endpoint',
      'Evolving the API without breaking existing clients',
    ],
    architecture: [
      'URI-based versioning with deprecation headers',
      'Global exception handling with RFC 7807 problem details',
      'Bean Validation on every request DTO',
    ],
    problem:
      'APIs that grow organically become inconsistent: every endpoint paginates, validates and fails differently, which slows down every client that integrates with them.',
    solution:
      'A reusable API foundation with shared conventions for errors, pagination, validation and documentation so new endpoints are consistent by default.',
    approach: [
      'Define conventions in a short API style guide',
      'Encode the conventions in shared base classes and advice',
      'Generate OpenAPI documentation from the code',
    ],
    outcomes: [],
    links: {},
    visual: 'api',
    year: '20XX',
    placeholder: true,
  },
  {
    slug: 'authentication-authorization-system',
    title: 'Authentication & Authorization System',
    category: 'Security',
    summary:
      'Stateless authentication with JWT access and refresh tokens, role and permission based authorization, and secure password handling on Spring Security.',
    stack: ['Spring Security', 'JWT', 'Java', 'Spring Boot', 'SQL'],
    challenges: [
      'Refresh-token rotation and revocation in a stateless design',
      'Fine-grained permissions without bloating the token',
    ],
    architecture: [
      'Custom security filter chain for token validation',
      'Short-lived access tokens with rotating refresh tokens',
      'Permission checks via method security annotations',
    ],
    problem:
      'Authentication is easy to get subtly wrong, and many applications mix session, token and permission logic in ways that are hard to audit.',
    solution:
      'A focused auth module with a clear token lifecycle, explicit permission model and secure defaults that other services can rely on.',
    approach: [
      'Threat-model the login, refresh and logout flows',
      'Keep tokens small; resolve permissions server-side',
      'Cover every security rule with automated tests',
    ],
    outcomes: [],
    links: {},
    visual: 'auth',
    year: '20XX',
    placeholder: true,
  },
  {
    slug: 'database-driven-business-application',
    title: 'Database-Driven Business Application',
    category: 'Data & Persistence',
    summary:
      'A business application centred on a carefully normalised Oracle schema, efficient JPA mappings and SQL tuned for reporting-heavy workloads.',
    stack: ['Oracle', 'SQL', 'Hibernate', 'JPA', 'MapStruct', 'Spring Boot'],
    challenges: [
      'Avoiding N+1 queries in deeply related entities',
      'Reporting queries that stay fast as data grows',
    ],
    architecture: [
      'Explicit fetch strategies and entity graphs',
      'Projections for read-heavy endpoints',
      'Indexed, reviewed SQL for reporting views',
    ],
    problem:
      'Business apps live and die by their data layer. Poor mappings and unreviewed queries turn simple screens into slow, expensive database round-trips.',
    solution:
      'A data layer designed deliberately: a clean schema, intentional fetch plans and dedicated read models for reporting.',
    approach: [
      'Design the schema and indexes alongside the API',
      'Profile generated SQL during development',
      'Separate write models from read projections',
    ],
    outcomes: [],
    links: {},
    visual: 'database',
    year: '20XX',
    placeholder: true,
  },
  {
    slug: 'full-stack-web-application',
    title: 'Full-Stack Web Application',
    category: 'Full Stack',
    summary:
      'An end-to-end product with a Next.js frontend and a Spring Boot API, featuring authentication, real-time-feeling UI and containerised deployment.',
    stack: ['Next.js', 'React', 'TypeScript', 'Spring Boot', 'Docker', 'Tailwind CSS'],
    challenges: [
      'Sharing a consistent type contract between frontend and API',
      'Fast perceived performance on slow networks',
    ],
    architecture: [
      'Next.js App Router with server components',
      'Spring Boot REST API secured with JWT',
      'Docker Compose for local parity',
    ],
    problem:
      'Many full-stack projects treat the frontend and backend as separate worlds, leading to mismatched contracts and a disjointed user experience.',
    solution:
      'One product designed across the stack, with a typed API contract, optimistic UI patterns and a reproducible container setup.',
    approach: [
      'Start from user flows, then derive API endpoints',
      'Generate client types from the OpenAPI spec',
      'Ship small vertical slices end to end',
    ],
    outcomes: [],
    links: {},
    visual: 'fullstack',
    year: '20XX',
    placeholder: true,
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
