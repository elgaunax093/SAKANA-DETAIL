'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { dictionaries, Locale } from '@/lib/i18n'

interface LanguageContextValue {
  lang: Locale
  setLang: (lang: Locale) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'sakana-lang'

function resolveKey(key: string, lang: Locale): string {
  const value = key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, dictionaries[lang])

  if (typeof value !== 'string') {
    console.warn(`[i18n] Clave de traducción no encontrada: "${key}"`)
    return key
  }
  return value
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>('es')

  useEffect(() => {
    const current = document.documentElement.getAttribute('lang') as Locale | null
    if (current && current in dictionaries) setLangState(current)
  }, [])

  const setLang = (next: Locale) => {
    setLangState(next)
    document.documentElement.setAttribute('lang', next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  const t = (key: string, vars?: Record<string, string | number>) => {
    let text = resolveKey(key, lang)
    if (vars) {
      for (const [name, val] of Object.entries(vars)) {
        text = text.replace(`{${name}}`, String(val))
      }
    }
    return text
  }

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation debe usarse dentro de LanguageProvider')
  return ctx
}
