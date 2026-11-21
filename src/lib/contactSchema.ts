import { z } from 'zod'

/** Shared between the client form and the API route, so validation never drifts. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80, 'Name is too long.'),
  email: z.email('Please enter a valid email address.').trim().max(120),
  message: z
    .string()
    .trim()
    .min(10, 'Tell me a little more (at least 10 characters).')
    .max(2000, 'Please keep it under 2000 characters.'),
  /** Honeypot — real users never see or fill this field. The API silently drops filled ones. */
  company: z.string().max(200).optional().default(''),
  /** Timestamp when the form was rendered; submissions that are too fast are bots. */
  startedAt: z.number().int().positive(),
})

export type ContactInput = z.input<typeof contactSchema>
export type ContactField = 'name' | 'email' | 'message'
export type ContactErrors = Partial<Record<ContactField, string>>

export function fieldErrors(error: z.ZodError): ContactErrors {
  const out: ContactErrors = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if ((key === 'name' || key === 'email' || key === 'message') && !out[key]) {
      out[key] = issue.message
    }
  }
  return out
}
