'use client'

import { useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// ─── Ajusta solo estos valores ────────────────────────────────────────────────
const CURSOR_SIZE = 10        // diámetro base (px)
const MAX_STRETCH  = 0.35     // deformación máxima por velocidad (35 %)
const SPEED_SCALE  = 2200     // velocidad (px/s) a la que se alcanza MAX_STRETCH
const HOVER_SCALE  = 1.8      // tamaño relativo al pasar sobre interactivos
// ──────────────────────────────────────────────────────────────────────────────

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'

/**
 * CustomCursor — cursor de alto rendimiento:
 *
 * • Cero re-renders: la posición del mouse se escribe directamente en
 *   MotionValues; Framer Motion los empuja al DOM vía rAF interno.
 * • Dos springs: posición (stiffness 700 → snappy) y hover-scale (500 → ágil).
 * • Squash & stretch directo en rAF a partir de .getVelocity(), sin useState.
 * • Opacidad controlada por MotionValue (sin setState) → cero re-renders.
 * • Gateado con (pointer: fine) para no activarse en pantallas táctiles.
 */
export default function CustomCursor() {
  // Posición raw del ratón
  const mouseX      = useMotionValue(-CURSOR_SIZE / 2)
  const mouseY      = useMotionValue(-CURSOR_SIZE / 2)
  const cursorAlpha = useMotionValue(0)

  // Spring de posición: stiffness alta = sigue el ratón sin lag apreciable
  const cursorX = useSpring(mouseX, { stiffness: 700, damping: 38, mass: 0.5 })
  const cursorY = useSpring(mouseY, { stiffness: 700, damping: 38, mass: 0.5 })

  // Spring de escala para hover (animación limpia sin blur)
  const scaleTarget = useMotionValue(1)
  const scale       = useSpring(scaleTarget, { stiffness: 500, damping: 30 })

  // Squash & stretch — escritura directa desde rAF, no pasan por React
  const stretchX = useMotionValue(1)
  const stretchY = useMotionValue(1)
  const angle    = useMotionValue(0)

  // ─── Handlers de evento ────────────────────────────────────────────────────

  const onMove = useCallback((e: PointerEvent) => {
    mouseX.set(e.clientX - CURSOR_SIZE / 2)
    mouseY.set(e.clientY - CURSOR_SIZE / 2)
    if (cursorAlpha.get() === 0) cursorAlpha.set(1)
  }, [mouseX, mouseY, cursorAlpha])

  const onOver = useCallback((e: PointerEvent) => {
    if ((e.target as Element).closest(INTERACTIVE)) scaleTarget.set(HOVER_SCALE)
  }, [scaleTarget])

  const onOut = useCallback((e: PointerEvent) => {
    if ((e.target as Element).closest(INTERACTIVE)) scaleTarget.set(1)
  }, [scaleTarget])

  const onLeave  = useCallback(() => cursorAlpha.set(0), [cursorAlpha])
  const onEnter  = useCallback(() => cursorAlpha.set(1), [cursorAlpha])

  // ─── Efecto principal ──────────────────────────────────────────────────────

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    window.addEventListener('pointermove', onMove,  { passive: true })
    window.addEventListener('pointerover', onOver,  { passive: true })
    window.addEventListener('pointerout',  onOut,   { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)

    // Squash & stretch: lee velocidad del spring (no del mouse), así la
    // deformación es proporcional al movimiento real del cursor en pantalla.
    let raf: number
    const tick = () => {
      const vx    = cursorX.getVelocity()
      const vy    = cursorY.getVelocity()
      const speed = Math.hypot(vx, vy)
      const s     = Math.min(speed / SPEED_SCALE, 1) * MAX_STRETCH

      stretchX.set(1 + s)
      stretchY.set(1 - s * 0.5)

      if (speed > 40) angle.set((Math.atan2(vy, vx) * 180) / Math.PI)

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerout',  onOut)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [cursorX, cursorY, stretchX, stretchY, angle, onMove, onOver, onOut, onLeave, onEnter])

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <motion.div
      aria-hidden="true"
      style={{
        // Layout — fixed, fuera del flujo, no afecta al resto del DOM
        position:      'fixed',
        top:           0,
        left:          0,
        width:         CURSOR_SIZE,
        height:        CURSOR_SIZE,
        borderRadius:  '50%',
        pointerEvents: 'none',
        zIndex:        999999,

        // Color reactivo al tema: blanco en dark, casi-negro en light
        background: 'rgb(var(--text-primary))',

        // Aceleración por hardware — el browser mueve este div solo via GPU
        willChange: 'transform',

        // Transforms — todos son MotionValues: el DOM se actualiza vía rAF
        // sin que React vuelva a renderizar
        x:       cursorX,
        y:       cursorY,
        scaleX:  stretchX,
        scaleY:  stretchY,
        rotate:  angle,
        scale,
        opacity: cursorAlpha,
      }}
    />
  )
}
