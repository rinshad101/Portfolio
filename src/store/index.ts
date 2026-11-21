import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './uiSlice'

/** A new store per request/mount — never a module-level singleton (App Router safe). */
export function makeStore() {
  return configureStore({
    reducer: {
      ui: uiReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
