import { NextResponse } from 'next/server'
import { contactSchema, fieldErrors } from '@/lib/contactSchema'

const MIN_FILL_MS = 2500
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

/**
 * Best-effort in-memory rate limit. On serverless platforms each instance has its own
 * memory, so for stronger guarantees use a shared store (e.g. Upstash Redis / Vercel KV).
 */
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c)
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ message: 'Too many messages. Please try again later.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Please fix the highlighted fields.', errors: fieldErrors(parsed.error) }, { status: 400 })
  }

  const { name, email, message, company, startedAt } = parsed.data

  // Spam heuristics: honeypot filled or submitted implausibly fast. Pretend success.
  if (company || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) {
    console.warn('[contact] RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL not configured.')
    return NextResponse.json(
      { message: 'The contact form is not configured yet.' },
      { status: 503 },
    )
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      console.error('[contact] Resend error', res.status)
      return NextResponse.json({ message: 'Could not send your message right now.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] delivery failed', err)
    return NextResponse.json({ message: 'Could not send your message right now.' }, { status: 502 })
  }
}
