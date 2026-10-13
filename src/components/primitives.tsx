import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

/** Soft reveal for body content as it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/** Headline that rises out of a mask, one line at a time. */
export function MaskLines({
  lines,
  className,
  as: Tag = 'h2',
  delay = 0,
  trigger = 'view',
}: {
  lines: string[]
  className?: string
  as?: 'h1' | 'h2' | 'h3'
  delay?: number
  trigger?: 'view' | 'now'
}) {
  const reduce = useReducedMotion()
  const target = {
    initial: reduce ? false : ('hidden' as const),
    ...(trigger === 'view'
      ? { whileInView: 'show' as const, viewport: { once: true, margin: '0px 0px -10% 0px' } }
      : { animate: 'show' as const }),
  }
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block"
            {...target}
            variants={{
              hidden: { y: '110%' },
              show: { y: 0, transition: { duration: 1.0, delay: delay + i * 0.12, ease } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function SectionHeading({
  title,
  lead,
}: {
  title: string[]
  lead?: string
}) {
  return (
    <header className="mb-14 md:mb-20 grid gap-6 md:grid-cols-12 md:items-end">
      <MaskLines
        lines={title}
        className="display text-balance text-[clamp(2.75rem,10vw,4rem)] leading-[0.98] sm:text-6xl md:col-span-7 md:text-[5.25rem]"
      />
      {lead && (
        <Reveal className="md:col-span-5 md:pb-3" delay={0.25}>
          <p className="max-w-md text-pretty text-base leading-relaxed text-paper-dim md:ml-auto">{lead}</p>
        </Reveal>
      )}
    </header>
  )
}

export function Tag({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[13px] leading-none transition-colors duration-300 ${
        active
          ? 'border-signal/60 bg-signal/15 text-paper'
          : 'border-white/10 bg-white/[0.03] text-paper-dim'
      }`}
    >
      {children}
    </span>
  )
}

export function CountUp({
  to,
  decimals = 0,
  suffix = '',
}: {
  to: number
  decimals?: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, reduce, to])

  return (
    <span ref={ref} className="tabular-nums" aria-label={`${to}${suffix}`}>
      <span aria-hidden="true">
        {val.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  )
}

export { ease }
