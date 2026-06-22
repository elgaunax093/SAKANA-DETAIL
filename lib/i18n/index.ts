import { es } from './es'
import { eu } from './eu'
import type { Dictionary } from './types'

export const dictionaries = { es, eu } as const

export type Locale = keyof typeof dictionaries

export type { Dictionary }
export { es, eu }
