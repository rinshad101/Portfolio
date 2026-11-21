'use client'

import { MotionConfig } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '@/store'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setAccent } from '@/store/uiSlice'
import type { Accent } from '@/types'

const ACCENT_KEY = 'btc-accent'
const ACCENTS: Accent[] = ['purple', 'cyan', 'green']

/** Mirrors the accent from Redux onto <html data-accent> and persists it per visitor. */
function AccentSync() {
  const dispatch = useAppDispatch()
  const accent = useAppSelector((s) => s.ui.accent)
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(ACCENT_KEY) as Accent | null
      if (saved && ACCENTS.includes(saved)) dispatch(setAccent(saved))
    } catch {
      /* storage unavailable — keep default */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time flag after restoring from storage
    setRestored(true)
  }, [dispatch])

  useEffect(() => {
    if (!restored) return
    document.documentElement.dataset.accent = accent
    try {
      localStorage.setItem(ACCENT_KEY, accent)
    } catch {
      /* ignore */
    }
  }, [accent, restored])

  return null
}

export function Providers({ children }: { children: ReactNode }) {
  const [store] = useState(makeStore)
  return (
    <Provider store={store}>
      <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 220, damping: 26 }}>
        <AccentSync />
        {children}
      </MotionConfig>
    </Provider>
  )
}
