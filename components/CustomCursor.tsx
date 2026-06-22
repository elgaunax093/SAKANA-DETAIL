'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useVelocity } from 'framer-motion'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  AJUSTES DEL CURSOR — edita solo estos valores
const CURSOR_SIZE = 10 // px — diámetro del punto
const SPRING_CONFIG = { stiffness: 180, damping: 22, mass: 0.4 }
const STRETCH_STRENGTH = 0.018
const VELOCITY_THRESHOLD = 5 // px/frame — por debajo, sin deformación
const MAX_STRETCH = 0.45
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Selectores que activan el efecto hover del cursor.
// Excluye inputs de texto/textarea: esos ya usan cursor:text (ver globals.css).
const INTERACTIVE =
  'a, button, [role="button"], label, select, ' +
  'input[type="submit"], input[type="button"], input[type="reset"], [data-cursor-hover]'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, SPRING_CONFIG)
  const springY = useSpring(mouseY, SPRING_CONFIG)
  const velocityX = useVelocity(springX)
  const velocityY = useVelocity(springY)

  const scaleX = useMotionValue(1)
  const scaleY = useMotionValue(1)
  const rotate = useMotionValue(0)

  // Seguimiento del ratón — solo en dispositivos con puntero fino
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - CURSOR_SIZE / 2)
      mouseY.set(e.clientY - CURSOR_SIZE / 2)
      setVisible(v => v || true)
    }
    const hide = () => setVisible(false)
    const show = () => setVisible(true)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [mouseX, mouseY])

  // Hover en interactivos — delegado en document, cubre elementos dinámicos
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE)) setHovering(true)
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE)) setHovering(false)
    }
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  // Squash & stretch — deformación direccional según la velocidad
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let frame: number
    const update = () => {
      const vx = velocityX.get()
      const vy = velocityY.get()
      const speed = Math.hypot(vx, vy)

      if (speed > VELOCITY_THRESHOLD) {
        rotate.set(Math.atan2(vy, vx) * (180 / Math.PI))
        const stretch = Math.min(speed * STRETCH_STRENGTH, MAX_STRETCH)
        scaleX.set(1 + stretch)
        scaleY.set(1 - stretch * 0.4)
      } else {
        scaleX.set(1)
        scaleY.set(1)
      }
      frame = requestAnimationFrame(update)
    }
    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [velocityX, velocityY, scaleX, scaleY, rotate])

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        borderRadius: '50%',
        background: 'rgb(var(--text-primary))',
        pointerEvents: 'none',
        zIndex: 999999,
        willChange: 'transform',
        x: springX,
        y: springY,
        scaleX,
        scaleY,
        rotate,
      }}
      animate={{ opacity: visible ? (hovering ? 0.6 : 1) : 0 }}
      transition={{ opacity: { duration: 0.2 } }}
    />
  )
}
