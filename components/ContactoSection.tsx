'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useTranslation } from '@/context/LanguageContext'

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="rgb(var(--accent-gold))" strokeWidth={1.5} className="w-5 h-5 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
)

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="rgb(var(--accent-gold))" strokeWidth={1.5} className="w-5 h-5 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="rgb(var(--accent-gold))" strokeWidth={1.5} className="w-5 h-5 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="rgb(var(--accent-gold))" className="w-5 h-5 flex-shrink-0">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="rgb(var(--accent-gold))" className="w-5 h-5 flex-shrink-0">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.27 8.27 0 004.84 1.55V6.75a4.85 4.85 0 01-1.07-.06z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 flex-shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function ContactoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { theme } = useTheme()
  const { t } = useTranslation()

  return (
    <section id="contacto" className="bg-[rgb(var(--bg-card))] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Columna izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--accent-gold))] mb-4">
              {t('contacto.subtitle')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-display uppercase text-[rgb(var(--text-primary))] mb-4 leading-tight">
              {t('contacto.heading')}
            </h2>
            <p className="font-body text-[rgb(var(--text-muted))] font-light mb-10">
              {t('contacto.subheading')}
            </p>

            <div className="space-y-6 mb-10">
              {/* Teléfono */}
              <a href="tel:+34680765314" className="flex items-start gap-3 group cursor-pointer">
                <PhoneIcon />
                <div>
                  <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--text-faint))] mb-0.5">{t('contacto.telefonoLabel')}</p>
                  <p className="font-body text-[rgb(var(--text-primary))] group-hover:text-[rgb(var(--accent-gold))] transition-colors">680 765 314</p>
                </div>
              </a>

              {/* Ubicación */}
              <div className="flex items-start gap-3">
                <LocationIcon />
                <div>
                  <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--text-faint))] mb-0.5">{t('contacto.ubicacionLabel')}</p>
                  <p className="font-body text-[rgb(var(--text-primary))]">{t('contacto.direccion')}</p>
                  <a
                    href="https://maps.app.goo.gl/vAE7QD1oZ3GtDbNT8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs text-[rgb(var(--text-muted))] hover:text-[rgb(var(--accent-gold))] transition-colors"
                  >
                    {t('contacto.verEnGoogleMaps')}
                  </a>
                </div>
              </div>

              {/* Horario */}
              <div className="flex items-start gap-3">
                <ClockIcon />
                <div>
                  <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--text-faint))] mb-1">{t('contacto.horarioLabel')}</p>
                  <table className="font-body text-sm w-full">
                    <tbody>
                      <tr className="bg-[rgb(var(--bg-card))]">
                        <td className="pr-6 py-1 text-[rgb(var(--text-muted))]">{t('contacto.horarioSemana')}</td>
                        <td className="text-[rgb(var(--text-primary))]">{t('contacto.horarioHoras')}</td>
                      </tr>
                      <tr className="bg-[rgb(var(--bg-page))]">
                        <td className="pr-6 py-1 text-[rgb(var(--text-muted))]">{t('contacto.horarioFinSemana')}</td>
                        <td className="text-[rgb(var(--text-faint))]">{t('contacto.horarioCerrado')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/sakana.detail?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group cursor-pointer"
              >
                <InstagramIcon />
                <div>
                  <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--text-faint))] mb-0.5">{t('contacto.instagramLabel')}</p>
                  <p className="font-body text-[rgb(var(--text-primary))] group-hover:text-[rgb(var(--accent-gold))] transition-colors">@sakana.detail</p>
                </div>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@sakana.detail?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group cursor-pointer"
              >
                <TikTokIcon />
                <div>
                  <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--text-faint))] mb-0.5">{t('contacto.tiktokLabel')}</p>
                  <p className="font-body text-[rgb(var(--text-primary))] group-hover:text-[rgb(var(--accent-gold))] transition-colors">@sakana.detail</p>
                </div>
              </a>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/34680765314?text=Hola%2C%20me%20gustar%C3%ADa%20pedir%20informaci%C3%B3n%20sobre%20vuestros%20servicios"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 font-body text-sm font-semibold tracking-label uppercase text-white hover:brightness-110 hover:scale-[1.02] transition-all duration-200 cursor-pointer rounded-sm"
                style={{ background: '#25D366' }}
              >
                <WhatsAppIcon />
                {t('contacto.whatsappBtn')}
              </a>
              <a
                href="tel:+34680765314"
                className="flex items-center justify-center px-6 py-3.5 font-body text-sm font-semibold tracking-label uppercase text-[rgb(var(--text-primary))] border border-[rgb(var(--accent-gold))] hover:bg-[rgb(var(--accent-gold))] hover:text-black transition-all duration-200 cursor-pointer rounded-sm"
              >
                {t('contacto.llamarBtn')}
              </a>
            </div>
          </motion.div>

          {/* Columna derecha — Mapa */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
          >
            <div className="relative w-full h-full min-h-[450px]">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-2.1948%2C42.8936%2C-2.1748%2C42.9056&layer=mapnik&marker=42.89961853718202%2C-2.1847835597400764"
                width="100%"
                height="100%"
                style={{
                  minHeight: '450px',
                  border: 0,
                  filter: theme === 'dark'
                    ? 'brightness(0.85) saturate(0.6) contrast(1.1) hue-rotate(180deg) invert(1)'
                    : 'none',
                }}
                allowFullScreen
                loading="lazy"
                title="Sakana Detail - Polígono Ibarrea 1, Altsasu"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
