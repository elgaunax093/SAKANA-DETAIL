'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useTranslation } from '@/context/LanguageContext'

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
      <path strokeLinecap="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

function FAQItem({ question, answer, isOpen, onToggle, index }: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <div className="border-b border-[rgb(var(--border-subtle))] last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
        className="flex items-center justify-between w-full py-5 text-left bg-transparent border-none cursor-pointer"
      >
        <span className="font-body text-xs text-[rgb(var(--accent-gold))] mr-4 flex-shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 font-body text-sm sm:text-base font-semibold text-[rgb(var(--text-primary))] leading-snug">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="ml-4 flex-shrink-0 text-[rgb(var(--accent-gold))]"
          aria-hidden="true"
        >
          <PlusIcon />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-5 pr-8 font-body text-sm sm:text-base text-[rgb(var(--text-muted))] font-light leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-section-title" className="bg-[rgb(var(--bg-page))] py-24 px-6">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--accent-gold))] mb-4">
            FAQ
          </p>
          <h2 id="faq-section-title" className="font-display text-5xl md:text-6xl tracking-display uppercase text-[rgb(var(--text-primary))] mb-4">
            {t('faq.title')}
          </h2>
          <p className="font-body text-[rgb(var(--text-muted))] font-light">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          role="list"
          className="rounded-[14px] bg-[rgb(var(--bg-card))] border border-[rgb(var(--border-subtle)/0.5)] px-6"
        >
          {FAQ_KEYS.map((key, index) => (
            <FAQItem
              key={key}
              index={index}
              question={t(`faq.${key}.q`)}
              answer={t(`faq.${key}.a`)}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(prev => (prev === index ? null : index))}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
