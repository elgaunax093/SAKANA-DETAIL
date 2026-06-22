'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/context/LanguageContext'

// Colores decorativos de avatar — puramente ornamentales, no dependen del tema
const avatarColors: Record<string, { bg: string; text: string }> = {
  'Mikel': { bg: '#1D6FA4', text: '#fff' },
  'Nekane': { bg: '#C9A84C', text: '#000' },
  'Rhizlane': { bg: '#2D8A6E', text: '#fff' },
  'Xume': { bg: '#8A2D6E', text: '#fff' },
  'Javier': { bg: '#6E2D2D', text: '#fff' },
  'Asier': { bg: '#2D5F8A', text: '#fff' },
  'Juan': { bg: '#5F8A2D', text: '#fff' },
}

// Reseñas reales de clientes de Google — contenido real, NO localizar/inventar
// (nombres, texto y respuestas se mantienen idénticos en ES y EU)
const reviews = [
  {
    name: 'Mikel Pereira',
    count: '9 reseñas',
    date: 'Hace 2 meses',
    text: 'IMPRESIONANTE COMO HA QUEDADO MI T4 del 2000, ha quedado nueva, asientos, tapicería, muchas gracias por el servicio, la habéis rejuvenecido. MUY RECOMENDABLE.',
    reply: null,
  },
  {
    name: 'Nekane Etxarri',
    count: '2 reseñas',
    date: 'Hace 2 semanas',
    text: 'Muy buen trabajo, el coche ha quedado perfecto. En mi caso lo he llevado sobre todo por problema de malos olores y he quedado muy contenta.',
    reply: 'Muchas gracias por tu reseña y por tu confianza. Ha sido un placer atenderte y poder solucionar el problema de los olores. ¡Un saludo!',
  },
  {
    name: 'Rhizlane Benhamou',
    count: '3 reseñas',
    date: 'Hace un mes',
    text: 'Muy profesional, nos ha hecho limpieza y pulido al coche y ha ido genial, estamos encantados con los resultados. Muy amable y buena persona. Recomendadísimo.',
    reply: 'Gracias a vosotros por la confianza. He disfrutado mucho trabajando en ese bonito coche.',
  },
  {
    name: 'Xume Taberna',
    count: '1 reseña',
    date: 'Hace un mes',
    text: 'Un trato excelente. Me ha dejado el coche como recién sacado del concesionario, una gozada.',
    reply: null,
  },
  {
    name: 'Javier Gil Casado',
    count: '7 reseñas',
    date: 'Hace un mes',
    text: 'Un trato excelente y un trabajo espectacular, han dejado mi coche como un espejo. Aparte le han hecho más de lo que pedí. Muy muy agradecido, totalmente recomendable.',
    reply: 'Gracias a ti por la confianza Javi, ha sido un placer trabajar con tu coche.',
  },
  {
    name: 'Asier Garcia',
    count: 'Local Guide · 61 reseñas',
    date: 'Hace 2 meses',
    text: 'Dena prineran. Todo perfecto! Yo volveré a llevar a hacer más cosas que hay que cuidarlo! 🏎️',
    reply: null,
  },
  {
    name: 'Juan Mari Ruiz',
    count: 'Local Guide · 75 reseñas',
    date: 'Hace 2 meses',
    text: 'Excelente servicio y trato muy profesional. Totalmente recomendable.',
    reply: null,
  },
]

const doubled = [...reviews, ...reviews]

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="rgb(var(--accent-gold))" className="w-4 h-4">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function ReviewCard({ r, replyLabel }: { r: typeof reviews[0]; replyLabel: string }) {
  const first = r.name.split(' ')[0] as keyof typeof avatarColors
  const colors = avatarColors[first] || { bg: '#333', text: '#fff' }
  return (
    <div
      className="flex-shrink-0 w-[340px] bg-[rgb(var(--bg-card))] border border-[rgb(var(--border-subtle)/0.5)] rounded-[14px] p-6 hover:border-[rgb(var(--accent-gold))] transition-colors duration-300 cursor-default"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg"
          style={{ background: colors.bg, color: colors.text }}
        >
          {r.name[0]}
        </div>
        <div>
          <p className="font-body text-sm font-semibold text-[rgb(var(--text-primary))]">{r.name}</p>
          <p className="font-body text-xs text-[rgb(var(--text-faint))]">{r.count} · {r.date}</p>
        </div>
        <div className="ml-auto">
          <GoogleIcon />
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
      </div>
      <p className="font-body text-sm text-[rgb(var(--text-muted))] font-light leading-relaxed mb-3">{r.text}</p>
      {r.reply && (
        <div className="mt-3 pl-3 border-l-2 border-[rgb(var(--accent-gold))] bg-[rgb(var(--bg-surface))] p-3 rounded-r">
          <p className="font-body text-[10px] font-semibold tracking-label uppercase text-[rgb(var(--accent-gold))] mb-1">
            {replyLabel}
          </p>
          <p className="font-body text-xs text-[rgb(var(--text-muted))] leading-relaxed">{r.reply}</p>
        </div>
      )}
    </div>
  )
}

export default function ResenasSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useTranslation()

  return (
    <section id="resenas" className="bg-[rgb(var(--bg-page))] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--accent-gold))] mb-4"
        >
          {t('resenas.subtitle')}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl tracking-display uppercase text-[rgb(var(--text-primary))] mb-6"
        >
          {t('resenas.heading')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="font-display text-5xl tracking-display text-[rgb(var(--accent-gold))]">★★★★★</p>
          <p className="font-display text-xl tracking-display text-[rgb(var(--accent-gold))]">{t('resenas.ratingText')}</p>
        </motion.div>
      </div>

      {/* Carrusel */}
      <div className="reviews-wrapper">
        <div className="reviews-track">
          {doubled.map((r, i) => (
            <ReviewCard key={i} r={r} replyLabel={t('resenas.replyLabel')} />
          ))}
        </div>
      </div>

      {/* CTA bajo reseñas */}
      <div className="text-center mt-10">
        <p className="font-body text-sm text-[rgb(var(--text-muted))]">
          {t('resenas.ctaQuestion')}{' '}
          <a
            href="https://maps.app.goo.gl/vAE7QD1oZ3GtDbNT8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgb(var(--text-muted))] hover:text-[rgb(var(--accent-gold))] transition-colors duration-200"
          >
            {t('resenas.ctaLink')}
          </a>
        </p>
      </div>
    </section>
  )
}
