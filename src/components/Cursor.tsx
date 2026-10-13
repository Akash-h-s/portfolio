import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * A trailing ring that sits on top of the native cursor (which is never hidden).
 * Only mounts on devices with a fine pointer and hover support.
 */
export default function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 })

  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const t = e.target as Element | null
      setHover(!!t?.closest('a, button, [role="button"], input, [data-cursor]'))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [reduce, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-signal/70"
        animate={{
          scale: hover ? 1.7 : 1,
          opacity: visible ? 1 : 0,
          backgroundColor: hover ? 'rgba(139,155,255,0.14)' : 'rgba(139,155,255,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
    </motion.div>
  )
}
