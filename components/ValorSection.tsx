'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/context/LanguageContext'

const pillars = ['pillar1', 'pillar2', 'pillar3'] as const
const nums = ['01', '02', '03']

export default function ValorSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useTranslation()

  return (
    <section className="bg-[rgb(var(--bg-page))] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
              className="pt-6 border-t-2 border-[rgb(var(--accent-gold))]"
            >
              <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--accent-gold))] mb-4">
                {nums[i]} · {t(`valor.${key}.label`)}
              </p>
              <p className="font-body text-[rgb(var(--text-muted))] font-light leading-relaxed">{t(`valor.${key}.text`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
