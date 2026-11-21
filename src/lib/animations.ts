'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
  gsap.defaults({ ease: 'expo.out', duration: 1 })
}

/** Use with gsap.matchMedia(): animations inside only run when motion is allowed. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)'

export const EASE = {
  out: 'expo.out',
  inOut: 'expo.inOut',
  soft: 'power3.out',
} as const

/** Session flag so the preloader only plays once per visit. */
export const INTRO_KEY = 'btc-intro-played'

export { gsap, ScrollTrigger, SplitText, useGSAP }
