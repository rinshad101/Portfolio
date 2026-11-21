import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Accent } from '@/types'

export interface UiState {
  /** True once the preloader has finished (or was skipped); gates the hero entrance. */
  introDone: boolean
  /** Accent theme, switchable from the terminal `theme` command. */
  accent: Accent
}

const initialState: UiState = {
  introDone: false,
  accent: 'purple',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    introComplete(state) {
      state.introDone = true
    },
    setAccent(state, action: PayloadAction<Accent>) {
      state.accent = action.payload
    },
  },
})

export const { introComplete, setAccent } = uiSlice.actions
export default uiSlice.reducer
