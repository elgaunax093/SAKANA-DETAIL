'use client'
import { useTranslation } from '@/context/LanguageContext'

const sloganKeys = ['slogan1', 'slogan2', 'slogan3', 'slogan4', 'slogan5'] as const

export default function MarqueeSection() {
  const { t } = useTranslation()
  const slogans = sloganKeys.map(key => t(`marquee.${key}`))
  const content = [...slogans, ...slogans]

  return (
    <section className="bg-[rgb(var(--bg-deep))] py-5 overflow-hidden border-y border-[rgb(var(--bg-surface))]">
      <div className="overflow-hidden">
        <div className="marquee-track">
          {content.map((s, i) => (
            <span key={i} className="flex items-center gap-6 flex-shrink-0">
              <span
                className="font-display whitespace-nowrap"
                style={{
                  fontSize: '28px',
                  color: 'rgb(var(--accent-gold))',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {s}
              </span>
              <span
                className="font-display text-3xl"
                style={{ color: 'rgb(var(--accent-blue))', letterSpacing: '0.06em' }}
              >
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
