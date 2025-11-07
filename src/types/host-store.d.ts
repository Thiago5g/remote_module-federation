declare module 'host/store' {
  import type { StoreApi } from 'zustand/vanilla'

  export type GlobalState = {
    count: number
    authToken: string | null
    setCount: (n: number) => void
    setAuthToken: (t: string | null) => void
  }

  export const globalStore: StoreApi<GlobalState>
}
