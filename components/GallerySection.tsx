'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import { useTranslation } from '@/context/LanguageContext'
import 'swiper/css'
import 'swiper/css/pagination'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'

// ══════════════════════════════════════════════════════════════════
//  EDITA AQUÍ para gestionar las fotos del carrusel y el lightbox.
//
//  Ambos (carrusel + lightbox) usan el mismo array — no hay datos duplicados.
//  `alt` describe el contenido de la foto (no se traduce). `key` resuelve
//  el label visible vía el diccionario de idiomas (lib/i18n).
//  Para añadir una foto:
//    1. Copia el archivo a  public/images/gallery/
//    2. Añade una línea y su label en lib/i18n/es.ts y eu.ts → galeria.items
// ══════════════════════════════════════════════════════════════════
const galeria = [
  { src: '/images/gallery/audi.png',               alt: 'Audi exterior',           key: 'audi'       },
  { src: '/images/gallery/audi-dentro.png',        alt: 'Audi interior',           key: 'audiDentro' },
  { src: '/images/gallery/bmw.png',                alt: 'BMW interior',            key: 'bmw'        },
  { src: '/images/gallery/furgo.png',              alt: 'Furgoneta',               key: 'furgo'      },
  { src: '/images/gallery/mb-a45.png',             alt: 'Mercedes A45',            key: 'mbA45'      },
  { src: '/images/gallery/mb-amg.png',             alt: 'Mercedes AMG',            key: 'mbAmg'      },
  { src: '/images/gallery/mb.png',                 alt: 'Mercedes',                key: 'mb'         },
  { src: '/images/gallery/opel-corsa-manta-gsi.png', alt: 'Opel Corsa Manta GSI', key: 'opelCorsa'  },
  { src: '/images/gallery/opel-manta-gsi.png',    alt: 'Opel Manta GSI',          key: 'opelManta'  },
  { src: '/images/gallery/ossa.png',               alt: 'Moto Ossa',               key: 'ossa'       },
] as const

// Slides para el lightbox — derivadas directamente del mismo array
const slides = galeria.map(({ src, alt }) => ({ src, alt }))

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)
const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
)

export default function GallerySection() {
  const swiperRef  = useRef<SwiperType | null>(null)
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })
  const { t }      = useTranslation()

  const [lbOpen,  setLbOpen]  = useState(false)
  const [lbIndex, setLbIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLbIndex(index)
    setLbOpen(true)
  }

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="bg-[rgb(var(--bg-alt))] py-24"
      style={{ overflowX: 'hidden' }}
    >
      {/* ── Cabecera + botones de navegación ── */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--accent-gold))] mb-4">
              {t('galeria.subtitle')}
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-display uppercase text-[rgb(var(--text-primary))]">
              {t('galeria.heading')}
            </h2>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label={t('galeria.prev')}
              className="w-11 h-11 rounded-full border border-[rgb(var(--border-subtle))] flex items-center justify-center text-[rgb(var(--text-muted))] hover:border-[rgb(var(--accent-gold))] hover:text-[rgb(var(--accent-gold))] transition-all duration-200"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label={t('galeria.next')}
              className="w-11 h-11 rounded-full border border-[rgb(var(--border-subtle))] flex items-center justify-center text-[rgb(var(--text-muted))] hover:border-[rgb(var(--accent-gold))] hover:text-[rgb(var(--accent-gold))] transition-all duration-200"
            >
              <ChevronRight />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Carrusel ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="max-w-7xl mx-auto pl-6"
      >
        <Swiper
          modules={[Pagination, A11y]}
          onSwiper={(s) => { swiperRef.current = s }}
          spaceBetween={16}
          slidesPerView={1.15}
          breakpoints={{
            480:  { slidesPerView: 1.5,  spaceBetween: 16 },
            768:  { slidesPerView: 2.2,  spaceBetween: 20 },
            1024: { slidesPerView: 3.1,  spaceBetween: 20 },
            1280: { slidesPerView: 3.4,  spaceBetween: 20 },
          }}
          loop
          pagination={{ clickable: true, el: '.gallery-pagination' }}
          style={{ overflow: 'visible' }}
        >
          {galeria.map((item, i) => (
            <SwiperSlide key={i}>
              <div
                role="button"
                tabIndex={0}
                aria-label={`${t('galeria.ver')} ${item.alt} ${t('galeria.enPantallaCompleta')}`}
                onClick={() => openLightbox(i)}
                onKeyDown={e => e.key === 'Enter' && openLightbox(i)}
                className="group relative overflow-hidden rounded-[10px] bg-[rgb(var(--bg-card))] border border-[rgb(var(--border-subtle))] hover:border-[rgb(var(--accent-gold)/0.5)] transition-colors duration-300"
                style={{ aspectRatio: '4 / 3' }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 480px) 85vw, (max-width: 768px) 65vw, (max-width: 1280px) 45vw, 32vw"
                  className="object-cover brightness-90 group-hover:brightness-100 group-hover:scale-[1.04] transition-all duration-500"
                  loading={i < 3 ? 'eager' : 'lazy'}
                />

                {/* Gradiente inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

                {/* Icono expandir — aparece en hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-250 text-white/70 pointer-events-none">
                  <ExpandIcon />
                </div>

                {/* Label servicio */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                  <p className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--accent-gold))]">
                    {t(`galeria.items.${item.key}`)}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* ── Paginación + Instagram ── */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="gallery-pagination" />
        <a
          href="https://www.instagram.com/sakana.detail?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs font-semibold tracking-label uppercase text-[rgb(var(--text-faint))] hover:text-[rgb(var(--accent-gold))] transition-colors duration-200"
        >
          {t('galeria.verEnInstagram')}
        </a>
      </div>

      {/* ── Lightbox ── */}
      <Lightbox
        open={lbOpen}
        index={lbIndex}
        close={() => setLbOpen(false)}
        slides={slides}
        plugins={[Zoom, Counter]}
        zoom={{
          maxZoomPixelRatio: 4,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
        }}
        styles={{
          container: {
            backgroundColor: 'rgba(5, 5, 5, 0.94)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          },
        }}
        carousel={{ finite: false }}
        animation={{ swipe: 280 }}
      />
    </section>
  )
}
