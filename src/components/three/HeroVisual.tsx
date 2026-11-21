'use client'

import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useAppSelector } from '@/store/hooks'
import { HeroFallback } from './HeroFallback'

// Three.js is only downloaded when the 3D scene is actually going to render.
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <HeroFallback />,
})

let webglSupport: boolean | null = null
function detectWebGL(): boolean {
  if (webglSupport !== null) return webglSupport
  try {
    const canvas = document.createElement('canvas')
    webglSupport = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    webglSupport = false
  }
  return webglSupport
}
const noopSubscribe = () => () => {}

export function HeroVisual() {
  const ready = useAppSelector((s) => s.ui.introDone)
  const accent = useAppSelector((s) => s.ui.accent)
  const desktop = useMediaQuery('(min-width: 1024px)', false)
  const reduced = useReducedMotion()
  const webgl = useSyncExternalStore(noopSubscribe, detectWebGL, () => false)

  const use3D = desktop && webgl && !reduced

  return (
    <div className="relative aspect-square w-full">
      {use3D ? <HeroScene ready={ready} accent={accent} /> : <HeroFallback animate={!reduced} />}
    </div>
  )
}
