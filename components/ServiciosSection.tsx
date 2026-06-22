'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from '@/context/LanguageContext'

const servicios = [
  {
    key: 'limpieza' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.698-1.31 2.498l-1.042-.154A9.75 9.75 0 0112 18.75a9.75 9.75 0 01-1.848-.104l-1.042.154c-1.34.2-2.31-1.498-1.31-2.498L9 15.3" />
      </svg>
    ),
    image: '/images/limpieza-integral.jpg' as string | null,
  },
  {
    key: 'pulido' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    image: '/images/pulido.jpg' as string | null,
  },
  {
    key: 'ceramico' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    image: '/images/ceramico.jpg' as string | null,
  },
]

export default function ServiciosSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useTranslation()

  return (
    <section id="servicios" className="bg-[rgb(var(--bg-page))] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--accent-gold))] mb-4">
            {t('servicios.subtitle')}
          </p>
          <h2 className="font-display text-5xl md:text-6xl tracking-display uppercase text-[rgb(var(--text-primary))]">
            {t('servicios.heading')}
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Cards 1–3: Limpieza, Pulido, Cerámico */}
          {servicios.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
              className="group bg-[rgb(var(--bg-card))] border border-[rgb(var(--border-subtle)/0.5)] rounded-[14px] overflow-hidden hover:border-[rgb(var(--accent-blue))] hover:scale-[1.02] transition-all duration-300 cursor-default"
            >
              {/* Foto de cabecera */}
              {s.image && (
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/7' }}>
                  <Image
                    src={s.image}
                    alt={t(`servicios.${s.key}.titulo`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </div>
              )}

              {/* Contenido */}
              <div className="p-8">
                <div className="text-[rgb(var(--accent-gold))] mb-4">{s.icon}</div>
                <h3 className="font-display text-2xl tracking-display uppercase text-[rgb(var(--text-primary))] mb-3">
                  {t(`servicios.${s.key}.titulo`)}
                </h3>
                <p className="font-body text-[rgb(var(--text-muted))] font-light leading-relaxed">{t(`servicios.${s.key}.texto`)}</p>
              </div>
            </motion.div>
          ))}

          {/* Card 4: Tapicería y Restauración — con dos fotos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: servicios.length * 0.15, ease: 'easeOut' }}
            className="group bg-[rgb(var(--bg-card))] border border-[rgb(var(--border-subtle)/0.5)] rounded-[14px] overflow-hidden hover:border-[rgb(var(--accent-blue))] hover:scale-[1.02] transition-all duration-300 cursor-default"
          >
            <div className="p-8 pb-6">
              <div className="text-[rgb(var(--accent-gold))] mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl tracking-display uppercase text-[rgb(var(--text-primary))] mb-3">
                {t('servicios.tapiceria.titulo')}
              </h3>
              <p className="font-body text-[rgb(var(--text-muted))] font-light leading-relaxed mb-6">
                {t('servicios.tapiceria.texto')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-0.5">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/techos-interiores.jpg"
                  alt={t('servicios.tapiceria.techosLabel')}
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--text-primary))]">
                  {t('servicios.tapiceria.techosLabel')}
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/restauracion-faros.jpg"
                  alt={t('servicios.tapiceria.farosLabel')}
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--text-primary))]">
                  {t('servicios.tapiceria.farosLabel')}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
