'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from '@/context/LanguageContext'

export default function AntesDepuesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useTranslation()
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const getPercent = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return 50
    const rect = el.getBoundingClientRect()
    return Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100))
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      setSliderPos(getPercent(e.clientX))
    }
    const onUp = () => { isDragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [getPercent])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    setSliderPos(getPercent(e.touches[0].clientX))
  }, [getPercent])

  return (
    <section className="bg-[rgb(var(--bg-alt))] py-24 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--accent-gold))] mb-4">
            {t('antesDespues.subtitle')}
          </p>
          <h2 className="font-display text-5xl md:text-6xl tracking-display uppercase text-[rgb(var(--text-primary))]">
            {t('antesDespues.heading')}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Slider container */}
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-2xl select-none"
            style={{ aspectRatio: '16/9', cursor: 'col-resize', touchAction: 'none' }}
            onMouseDown={() => { isDragging.current = true }}
            onTouchMove={onTouchMove}
            onTouchStart={e => setSliderPos(getPercent(e.touches[0].clientX))}
          >
            {/* DESPUÉS — imagen completa de fondo */}
            <div className="absolute inset-0">
              <Image
                src="/images/bmw-despues.jpg"
                alt="BMW después del detailing"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
                priority
              />
              {/* Label DESPUÉS */}
              <div className="absolute top-4 right-4 font-body text-xs font-semibold tracking-label uppercase text-white bg-[rgb(var(--accent-blue)/0.9)] backdrop-blur-sm px-3 py-1.5 rounded-full">
                {t('antesDespues.labelDespues')}
              </div>
            </div>

            {/* ANTES — recortado con clip-path dinámico */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <Image
                src="/images/bmw-antes.jpg"
                alt="BMW antes del detailing"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
                priority
              />
              {/* Label ANTES */}
              <div className="absolute top-4 left-4 font-body text-xs font-semibold tracking-label uppercase text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {t('antesDespues.labelAntes')}
              </div>
            </div>

            {/* Línea vertical divisoria */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            />

            {/* Handle circular */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[rgb(var(--accent-gold))] border-[3px] border-white shadow-[0_0_20px_rgba(0,0,0,0.6)] flex items-center justify-center pointer-events-none z-10"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Flechas ← → */}
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M8 7l-5 5 5 5V7zm8 0v10l5-5-5-5z" />
              </svg>
            </div>
          </div>

          <p className="text-center font-body text-sm text-[rgb(var(--text-muted))] font-light mt-6">
            {t('antesDespues.instruction')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
