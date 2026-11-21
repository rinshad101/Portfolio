'use client'

import { useMediaQuery } from './useMediaQuery'

/** True when the user asked the OS to minimise motion. Assumes reduced motion on the server. */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)', true)
}

/** True for a fine pointer that can hover (mouse/trackpad) — false for touch. */
export function useFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)', false)
}
