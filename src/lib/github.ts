import 'server-only'
import type { GitHubRepo } from '@/types'

interface ApiRepo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  topics?: string[]
  fork: boolean
  archived: boolean
}

export type RepoResult =
  | { status: 'ok'; repos: GitHubRepo[] }
  | { status: 'unconfigured' }
  | { status: 'error'; reason: 'rate-limited' | 'not-found' | 'network' }

/**
 * Fetches public, non-fork repositories on the server (cached for an hour), so visitors
 * never hit GitHub's rate limits directly. Any failure falls back gracefully.
 */
export async function getRepos(username: string, limit = 6): Promise<RepoResult> {
  if (!username) return { status: 'unconfigured' }
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'portfolio-site',
    }
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30&type=owner`,
      { headers, next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) },
    )
    if (res.status === 403 || res.status === 429) return { status: 'error', reason: 'rate-limited' }
    if (res.status === 404) return { status: 'error', reason: 'not-found' }
    if (!res.ok) return { status: 'error', reason: 'network' }

    const data = (await res.json()) as ApiRepo[]
    const repos = data
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        topics: (r.topics ?? []).slice(0, 4),
      }))
    return { status: 'ok', repos }
  } catch {
    return { status: 'error', reason: 'network' }
  }
}
