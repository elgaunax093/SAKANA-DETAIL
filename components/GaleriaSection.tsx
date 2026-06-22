'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const PlaceholderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth={1} className="w-10 h-10 opacity-40">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
)

type GalleryItem = {
  src: string | null
  label: string
  real: boolean
}

const items: GalleryItem[] = [
  { src: '/images/pulido.jpg',       label: 'Pulido y corrección',   real: true },
  { src: '/images/ceramico.jpg',     label: 'Tratamiento cerámico',  real: true },
  { src: '/images/bmw-antes.jpg',    label: 'BMW antes del detailing', real: true },
  { src: '/images/bmw-despues.jpg',  label: 'BMW después del detailing', real: true },
  { src: '/images/img-interior.jpg', label: 'Limpieza interior',     real: true },
  { src: '/images/galeria-extra.jpg',label: 'Detailing completo',    real: true },
]

export default function GaleriaSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [lightbox, setLightbox] = useState<number | null>(null)

  const realItems = items.filter(i => i.real)

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const prev = () => {
    if (lightbox === null) return
    const realIdxs = items.map((item, i) => item.real ? i : -1).filter(i => i !== -1)
    const cur = realIdxs.indexOf(lightbox)
    if (cur > 0) setLightbox(realIdxs[cur - 1])
  }

  const next = () => {
    if (lightbox === null) return
    const realIdxs = items.map((item, i) => item.real ? i : -1).filter(i => i !== -1)
    const cur = realIdxs.indexOf(lightbox)
    if (cur < realIdxs.length - 1) setLightbox(realIdxs[cur + 1])
  }

  return (
    <section id="galeria" className="bg-[#080808] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="font-body text-xs font-semibold tracking-label uppercase text-[#C9A84C] mb-4">
            Nuestros Trabajos
          </p>
          <h2 className="font-display text-5xl md:text-6xl tracking-display uppercase text-[#F2F2F2] mb-4">
            Cada Detalle, un Antes y un Después
          </h2>
          <p className="font-body text-[#888] font-light">Resultados reales de clientes reales.</p>
        </div>

        {/* Masonry grid */}
        <div ref={ref} style={{ columns: '3', columnGap: '16px' }} className="block [column-count:1] sm:[column-count:2] lg:[column-count:3]">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative group mb-4 break-inside-avoid overflow-hidden rounded-[10px] cursor-pointer"
              style={{ breakInside: 'avoid', marginBottom: '16px' }}
              onClick={() => item.real && setLightbox(i)}
            >
              {item.src ? (
                <div className="relative w-full" style={{ aspectRatio: i % 3 === 0 ? '4/5' : '4/3' }}>
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <span className="font-display text-xl tracking-display uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.label}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="w-full flex flex-col items-center justify-center bg-[#1A1A1A] border border-[#2A2A2A]/50 rounded-[10px]"
                  style={{ aspectRatio: i % 2 === 0 ? '4/3' : '3/4', minHeight: '200px' }}
                >
                  <PlaceholderIcon />
                  <p className="font-body text-xs text-[#444] mt-3 tracking-label uppercase">Próximamente</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && items[lightbox].src && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <div className="relative max-w-5xl w-full max-h-[90vh] px-12" onClick={e => e.stopPropagation()}>
              <Image
                src={items[lightbox].src!}
                alt={items[lightbox].label}
                width={1200}
                height={900}
                className="object-contain max-h-[90vh] w-full rounded-lg"
              />
              <button
                onClick={closeLightbox}
                className="absolute top-0 right-4 text-white text-3xl hover:text-[#C9A84C] transition-colors cursor-pointer"
                aria-label="Cerrar"
              >
                ✕
              </button>
              {realItems.length > 1 && (
                <>
                  <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-3xl px-3 hover:text-[#C9A84C] transition-colors cursor-pointer">←</button>
                  <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-3xl px-3 hover:text-[#C9A84C] transition-colors cursor-pointer">→</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
