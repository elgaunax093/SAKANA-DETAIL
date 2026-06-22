'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/context/LanguageContext'

const stats = [
  { key: 'vehiculos', value: 50, prefix: '+', suffix: '' },
  { key: 'clientes', value: 100, prefix: '', suffix: '%' },
  { key: 'reviews', value: 4.9, prefix: '★', suffix: '', isFloat: true },
  { key: 'experiencia', value: 2, prefix: '', suffix: '' },
] as const

function Counter({ value, prefix, suffix, isFloat, trigger }: {
  value: number
  prefix: string
  suffix: string
  isFloat?: boolean
  trigger: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return
    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [trigger, value])

  const display = isFloat ? count.toFixed(1) : Math.floor(count)

  return (
    <span className="font-display text-5xl md:text-6xl tracking-display text-[rgb(var(--text-primary))]">
      {prefix}{display}{suffix}
    </span>
  )
}

export default function NosotrosSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useTranslation()

  return (
    <section className="bg-[rgb(var(--bg-page))] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16 items-start">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--accent-gold))] mb-4">
              {t('nosotros.subtitle')}
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-display uppercase text-[rgb(var(--text-primary))] mb-8">
              {t('nosotros.heading')}
            </h2>
            <div className="space-y-4 font-body text-[rgb(var(--text-muted))] font-light leading-relaxed">
              <p>{t('nosotros.body1')}</p>
              <p>{t('nosotros.body2')}</p>
              <p>{t('nosotros.body3')}</p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-8"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex flex-col"
              >
                <Counter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  isFloat={'isFloat' in s ? s.isFloat : undefined}
                  trigger={inView}
                />
                <span className="font-body text-xs text-[rgb(var(--text-muted))] mt-1 tracking-wide">
                  {t(`nosotros.stats.${s.key}`)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
