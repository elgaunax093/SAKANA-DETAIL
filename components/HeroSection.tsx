'use client'
import { useEffect, useRef } from 'react'
import { useTranslation } from '@/context/LanguageContext'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    let st: any = null
    let cleanupFn: (() => void) | undefined

    const init = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const video   = videoRef.current
      const section = sectionRef.current
      if (!video || !section) return

      const setup = () => {
        // play→pause: fuerza al navegador a decodificar el primer fotograma
        video.play().then(() => {
          video.pause()
          video.currentTime = 0
        }).catch(() => {
          video.currentTime = 0
        })

        // Bloquear cualquier reproducción autónoma posterior
        const stopPlay = () => { if (!video.paused) video.pause() }
        video.addEventListener('play', stopPlay)
        cleanupFn = () => video.removeEventListener('play', stopPlay)

        // ScrollTrigger SIN pin — el CSS sticky gestiona el anclaje
        // trigger = section de 250vh → recorre el vídeo de 0 a duration
        st = ScrollTrigger.create({
          trigger: section,
          start:   'top top',
          end:     'bottom top',
          scrub:   1,
          onUpdate: (self) => {
            if (video.duration) {
              video.currentTime = self.progress * video.duration
            }
            if (!video.paused) video.pause()
          },
        })
      }

      if (video.readyState >= 1) {
        setup()
      } else {
        video.addEventListener('loadedmetadata', setup, { once: true })
      }
    }

    init()

    return () => {
      cleanupFn?.()
      st?.kill()
    }
  }, [])

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    // 250vh: espacio de scroll que consume el hero mientras el vídeo scruba.
    // CSS sticky mantiene el vídeo anclado sin position:fixed ni espaciadores GSAP.
    // Al pasar los 250vh el hero se suelta y el contenido siguiente fluye limpio.
    <section ref={sectionRef} style={{ height: '250vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[rgb(var(--bg-page))]">

        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/SAKANA_PORTADA.mp4" type="video/mp4" />
        </video>

        {/* Gradientes estáticos — sin transición ni animación CSS */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />

        {/* Indicador de scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <span className="font-body text-xs text-[rgb(var(--text-muted))] tracking-label uppercase">{t('hero.scroll')}</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-[rgb(var(--accent-gold))] to-transparent animate-pulse" />
        </div>

        {/* Texto hero — siempre visible */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pb-16 md:pb-20">
          <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--accent-gold))] mb-4">
            {t('hero.badge')}
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-display uppercase text-[rgb(var(--text-primary))] leading-none mb-4 max-w-3xl">
            {t('hero.headline')}
          </h1>
          <p className="font-body text-[rgb(var(--text-muted))] text-base md:text-lg mb-8 max-w-xl font-light">
            {t('hero.subheadline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleNav('#contacto')}
              className="font-body text-sm font-semibold tracking-label uppercase px-8 py-3.5 bg-[rgb(var(--accent-blue))] text-white hover:bg-[rgb(var(--accent-blue)/0.8)] transition-all duration-200 cursor-pointer"
            >
              {t('hero.ctaPrimary')}
            </button>
            <button
              onClick={() => handleNav('#servicios')}
              className="font-body text-sm text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors duration-200 cursor-pointer flex items-center gap-2"
            >
              {t('hero.ctaSecondary')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
