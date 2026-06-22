'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/context/LanguageContext'

const pasos = ['paso1', 'paso2', 'paso3', 'paso4'] as const
const nums = ['01', '02', '03', '04']

export default function ProcesoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useTranslation()

  return (
    <section id="proceso" className="bg-[rgb(var(--bg-page))] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--accent-gold))] mb-4">
            {t('proceso.subtitle')}
          </p>
          <h2 className="font-display text-5xl md:text-6xl tracking-display uppercase text-[rgb(var(--text-primary))]">
            {t('proceso.heading')}
          </h2>
        </div>

        <div
          ref={ref}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-0"
        >
          {/* Línea conectora desktop */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[rgb(var(--accent-gold))] via-[rgb(var(--accent-gold))] to-transparent" style={{ zIndex: 0 }} />

          {pasos.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2, ease: 'easeOut' }}
              className="relative z-10 flex flex-col md:pr-8 mb-12 md:mb-0"
            >
              {/* Número grande decorativo */}
              <span
                className="font-display leading-none select-none mb-4"
                style={{
                  fontSize: '72px',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgb(var(--border-subtle))',
                  letterSpacing: '0.05em',
                }}
              >
                {nums[i]}
              </span>

              {/* Dot dorado */}
              <div className="w-3 h-3 rounded-full bg-[rgb(var(--accent-gold))] mb-4 hidden md:block" />

              <h3 className="font-display text-2xl tracking-display uppercase text-[rgb(var(--text-primary))] mb-2">
                {t(`proceso.${key}.titulo`)}
              </h3>
              <p className="font-body text-[rgb(var(--text-muted))] font-light text-sm leading-relaxed">
                {t(`proceso.${key}.desc`)}
              </p>

              {/* Línea vertical mobile */}
              {i < pasos.length - 1 && (
                <div className="md:hidden w-0.5 h-12 bg-[rgb(var(--accent-gold)/0.3)] ml-1.5 mt-4" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
