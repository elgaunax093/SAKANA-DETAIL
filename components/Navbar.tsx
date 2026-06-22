'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useTranslation } from '@/context/LanguageContext'
import type { Locale } from '@/lib/i18n'

const links = [
  { href: '#servicios', key: 'servicios' },
  { href: '#resenas', key: 'resenas' },
  { href: '#proceso', key: 'proceso' },
  { href: '#contacto', key: 'contacto' },
] as const

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
    <circle cx="12" cy="12" r="4" />
    <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
)

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const isLight = theme === 'light'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isLight ? t('themeToggle.toDark') : t('themeToggle.toLight')}
      aria-pressed={isLight}
      title={isLight ? t('themeToggle.toDark') : t('themeToggle.toLight')}
      className="relative w-11 h-6 rounded-full flex-shrink-0 flex items-center px-0.5 cursor-pointer border border-[rgb(var(--border-subtle))]"
      style={{ background: 'rgb(var(--bg-surface))' }}
    >
      <span
        className="absolute w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300"
        style={{
          background: 'rgb(var(--accent-gold))',
          color: 'rgb(var(--bg-page))',
          transform: isLight ? 'translateX(18px)' : 'translateX(0px)',
        }}
      >
        {isLight ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  )
}

function LanguageSwitcher({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const { lang, setLang } = useTranslation()
  const base = size === 'lg' ? 'px-3 py-1.5 text-xs' : 'px-2 py-1 text-[10px]'

  const btn = (code: Locale, label: string, ariaLabel: string) => (
    <button
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      aria-label={ariaLabel}
      className={`${base} rounded-full font-semibold tracking-wide transition-colors duration-200 cursor-pointer`}
      style={{
        background: lang === code ? 'rgb(var(--accent-gold))' : 'transparent',
        color: lang === code ? 'rgb(var(--bg-page))' : 'rgb(var(--text-muted))',
      }}
    >
      {label}
    </button>
  )

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-[rgb(var(--border-subtle))] p-0.5 flex-shrink-0"
      role="group"
      aria-label="Seleccionar idioma"
    >
      {btn('es', 'ES', 'Cambiar idioma a Español')}
      {btn('eu', 'EU', 'Aldatu hizkuntza Euskarara')}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgb(var(--bg-page) / 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgb(var(--border-subtle) / 0.5)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo circular */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center cursor-pointer group flex-shrink-0"
          >
            <div
              className="w-14 h-14 rounded-full border border-[rgb(var(--border-subtle))] group-hover:border-[rgb(var(--accent-gold))] transition-colors duration-300 flex-shrink-0"
              style={{
                backgroundImage: "url('/images/wmremove-transformed.png')",
                backgroundSize: '520%',
                backgroundPosition: '50% 18%',
                borderRadius: '50%',
              }}
              aria-label="Sakana Detail"
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {links.map(l => (
              <li key={l.href}>
                <button
                  onClick={() => handleLink(l.href)}
                  className="font-body text-sm text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors duration-200 cursor-pointer tracking-wide"
                >
                  {t(`nav.${l.key}`)}
                </button>
              </li>
            ))}
          </ul>

          {/* Controles: tema + idioma — siempre visibles */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => handleLink('#contacto')}
              className="hidden md:block font-body text-xs font-semibold tracking-label uppercase px-5 py-2 border border-[rgb(var(--text-primary))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--text-primary))] hover:text-[rgb(var(--bg-page))] transition-all duration-200 cursor-pointer"
            >
              {t('nav.cta')}
            </button>
            <button
              className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={t('nav.menu')}
            >
              <span className={`block w-6 h-0.5 bg-[rgb(var(--text-primary))] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[rgb(var(--text-primary))] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[rgb(var(--text-primary))] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[rgb(var(--bg-page))] flex flex-col pt-20 px-8"
          >
            <ul className="flex flex-col gap-8 mt-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <button
                    onClick={() => handleLink(l.href)}
                    className="font-display text-4xl tracking-display text-[rgb(var(--text-primary))] hover:text-[rgb(var(--accent-gold))] transition-colors cursor-pointer uppercase"
                  >
                    {t(`nav.${l.key}`)}
                  </button>
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center gap-3 mt-10">
              <LanguageSwitcher size="lg" />
              <ThemeToggle />
            </div>

            <div className="mt-12">
              <button
                onClick={() => handleLink('#contacto')}
                className="font-body text-sm font-semibold tracking-label uppercase px-6 py-3 border border-[rgb(var(--text-primary))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--text-primary))] hover:text-[rgb(var(--bg-page))] transition-all duration-200 cursor-pointer"
              >
                {t('nav.cta')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
