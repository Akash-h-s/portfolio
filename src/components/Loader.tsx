import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3)

export default function Loader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    if (reduce) {
      const t = window.setTimeout(() => done.current(), 250)
      return () => window.clearTimeout(t)
    }
    const start = performance.now()
    const dur = 1500
    let raf = 0
    let t2 = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      setN(Math.round(easeOut(p) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else t2 = window.setTimeout(() => done.current(), 280)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t2)
    }
  }, [reduce])

  const letters = 'Akash H S'.split('')

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink-950 px-6 py-8 sm:px-12 sm:py-10"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="flex items-center justify-between text-sm text-paper-mute">
        <span>Portfolio</span>
        <span>Bengaluru, India</span>
      </div>

      <div className="display select-none text-[clamp(3.5rem,14vw,11rem)] leading-none text-paper" aria-hidden="true">
        {letters.map((c, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {c === ' ' ? '\u00A0' : c}
            </motion.span>
          </span>
        ))}
      </div>

      <div>
        <div className="mb-3 flex items-end justify-between">
          <span className="text-sm text-paper-mute">Loading</span>
          <span className="display text-5xl tabular-nums text-paper sm:text-6xl">{n}</span>
        </div>
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div className="h-full origin-left bg-signal" style={{ transform: `scaleX(${n / 100})` }} />
        </div>
      </div>
    </motion.div>
  )
}
