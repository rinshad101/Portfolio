'use client'

import { useCallback, useRef, useState, type KeyboardEvent } from 'react'
import { complete, executeCommand, type OutputLine } from '@/lib/terminalCommands'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setAccent } from '@/store/uiSlice'
import type { Accent } from '@/types'

export interface TerminalEntry {
  id: number
  /** The command the visitor typed (absent for system output). */
  command?: string
  lines: OutputLine[]
}

const MAX_INPUT = 120
const MAX_ENTRIES = 60

const WELCOME: TerminalEntry = {
  id: 0,
  command: 'welcome',
  lines: [
    [{ text: '' }],
    [{ text: 'Welcome to my interactive portfolio.' }],
    [{ text: '' }],
    [{ text: "Type '", tone: 'muted' }, { text: 'help', tone: 'accent' }, { text: "' to explore available commands.", tone: 'muted' }],
  ],
}

export function useTerminal() {
  const dispatch = useAppDispatch()
  const accent = useAppSelector((s) => s.ui.accent)
  const [entries, setEntries] = useState<TerminalEntry[]>([WELCOME])
  const [input, setInputState] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState<number | null>(null)
  const nextId = useRef(1)

  const setInput = useCallback((value: string) => setInputState(value.slice(0, MAX_INPUT)), [])

  const run = useCallback(
    (raw: string) => {
      const command = raw.trim().slice(0, MAX_INPUT)
      const result = executeCommand(command, {
        accent,
        setAccent: (a: Accent) => dispatch(setAccent(a)),
      })

      if (result.clear) {
        setEntries([])
      } else {
        const entry: TerminalEntry = { id: nextId.current++, command, lines: result.lines }
        setEntries((prev) => [...prev, entry].slice(-MAX_ENTRIES))
      }
      if (command) setHistory((prev) => (prev[prev.length - 1] === command ? prev : [...prev, command].slice(-50)))
      setCursor(null)
      setInputState('')
    },
    [accent, dispatch],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        run(input)
      } else if (e.key === 'ArrowUp') {
        if (!history.length) return
        e.preventDefault()
        const idx = cursor === null ? history.length - 1 : Math.max(0, cursor - 1)
        setCursor(idx)
        setInputState(history[idx] ?? '')
      } else if (e.key === 'ArrowDown') {
        if (cursor === null) return
        e.preventDefault()
        const idx = cursor + 1
        if (idx >= history.length) {
          setCursor(null)
          setInputState('')
        } else {
          setCursor(idx)
          setInputState(history[idx] ?? '')
        }
      } else if (e.key === 'Tab') {
        const matches = complete(input)
        if (matches.length === 0) return // let Tab move focus as normal
        e.preventDefault()
        if (matches.length === 1 && matches[0]) {
          setInputState(matches[0])
        } else {
          const entry: TerminalEntry = {
            id: nextId.current++,
            command: input,
            lines: [[{ text: matches.join('   '), tone: 'accent' }]],
          }
          setEntries((prev) => [...prev, entry].slice(-MAX_ENTRIES))
        }
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault()
        setEntries([])
      }
    },
    [cursor, history, input, run],
  )

  return { entries, input, setInput, onKeyDown, run }
}
