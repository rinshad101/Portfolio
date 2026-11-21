'use client'

import { CircleCheck, LoaderCircle, Send } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { contactSchema, fieldErrors, type ContactErrors, type ContactField } from '@/lib/contactSchema'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const fields: Array<{ name: ContactField; label: string; type?: string; autoComplete: string; textarea?: boolean }> = [
  { name: 'name', label: 'Your name', autoComplete: 'name' },
  { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email' },
  { name: 'message', label: 'What are you building?', autoComplete: 'off', textarea: true },
]

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [values, setValues] = useState<Record<ContactField, string>>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [startedAt] = useState(() => Date.now())

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const company = String(new FormData(e.currentTarget).get('company') ?? '')
    const payload = { ...values, company, startedAt }

    const parsed = contactSchema.safeParse(payload)
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error)
      setErrors(errs)
      const first = Object.keys(errs)[0]
      if (first) document.getElementById(`contact-${first}`)?.focus()
      return
    }

    setErrors({})
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as { message?: string; errors?: ContactErrors }
      if (!res.ok) {
        if (data.errors) setErrors(data.errors)
        setServerMessage(data.message ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
      setValues({ name: '', email: '', message: '' })
    } catch {
      setServerMessage('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <div className="surface relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[22rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <CircleCheck size={40} className="text-green" aria-hidden="true" />
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">Message sent.</h3>
            <p className="mt-2 max-w-xs text-sm text-fg-2">Thanks for reaching out — I&apos;ll get back to you soon.</p>
            <button type="button" onClick={() => setStatus('idle')} className="link-underline mt-6 font-mono text-xs text-fg-2 hover:text-fg">
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
            {fields.map((f) => {
              const id = `contact-${f.name}`
              const err = errors[f.name]
              const common = {
                id,
                name: f.name,
                value: values[f.name],
                autoComplete: f.autoComplete,
                required: true,
                'aria-invalid': err ? true : undefined,
                'aria-describedby': err ? `${id}-error` : undefined,
                onChange: (ev: { target: { value: string } }) => setValues((v) => ({ ...v, [f.name]: ev.target.value })),
                className: cn(
                  'w-full rounded-xl border bg-bg/60 px-4 py-3 text-sm text-fg placeholder:text-muted outline-none transition-colors focus:border-accent/70 focus:ring-2 focus:ring-accent/20',
                  err ? 'border-[#f87171]/70' : 'border-line',
                ),
              }
              return (
                <div key={f.name}>
                  <label htmlFor={id} className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-fg-2">
                    {f.label}
                  </label>
                  {f.textarea ? <textarea rows={5} maxLength={2000} {...common} /> : <input type={f.type ?? 'text'} {...common} />}
                  {err && (
                    <p id={`${id}-error`} className="mt-1.5 text-xs text-[#fca5a5]">
                      {err}
                    </p>
                  )}
                </div>
              )
            })}

            {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="contact-company">Company</label>
              <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {status === 'error' && (
              <p role="alert" className="rounded-xl border border-[#f87171]/40 bg-[#f87171]/10 px-4 py-3 text-sm text-[#fecaca]">
                {serverMessage}{' '}
                <a href={`mailto:${fallbackEmail}`} className="underline underline-offset-2">
                  Email me directly
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition-shadow hover:shadow-[0_12px_40px_-12px_rgb(var(--accent-rgb)/0.8)] disabled:cursor-wait disabled:opacity-70"
            >
              {status === 'submitting' ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
