import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, Download, Mail } from 'lucide-react'
import { useRef } from 'react'
import { profile } from '../data/content'
import Magnetic from './Magnetic'
import { MaskLines } from './primitives'
import WorkflowViz from './WorkflowViz'

export default function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '12%'])
  const vizY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-8%'])

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden" aria-label="Introduction">
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="orb-a absolute -left-[10%] top-[-10%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(91,108,255,0.28),transparent)]" />
        <div className="orb-b absolute -right-[15%] top-[20%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(closest-side,rgba(242,182,109,0.10),transparent)]" />
        <div className="dot-grid absolute inset-0" />
      </motion.div>

      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-16">
        <motion.div style={{ y: textY }} className="lg:col-span-7">
          <motion.p
            {...fade(0.1)}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 text-sm text-paper-dim"
          >
            <span className="relative grid h-5 w-5 place-items-center" aria-hidden="true">
              <span className="pulse-ring absolute h-2.5 w-2.5 rounded-full bg-ok/60" />
              <span className="h-2 w-2 rounded-full bg-ok" />
            </span>
            Software Developer in Bengaluru. Former intern at Talview.
          </motion.p>

          <MaskLines
            as="h1"
            trigger={ready ? 'now' : 'view'}
            delay={0.15}
            lines={['Building thoughtful', 'digital experiences', 'with code.']}
            className="display text-[clamp(2.6rem,13.5vw,5.75rem)] leading-[0.95] lg:text-[clamp(3.5rem,6.2vw,6.25rem)]"
          />

          <motion.p {...fade(0.75)} className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-paper-dim">
            I'm Akash H S. I build enterprise applications from the interface to the cloud: React and TypeScript frontends,
            GraphQL and serverless APIs, and the automated tests that keep them dependable.
          </motion.p>

          <motion.div {...fade(0.9)} className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
                }}
                className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-[15px] font-medium text-ink-950 transition-colors hover:bg-white"
              >
                Explore projects
                <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-white/40 hover:bg-white/[0.05]"
              >
                <Mail size={17} aria-hidden="true" />
                Get in touch
              </a>
            </Magnetic>
            <a
              href={profile.resume}
              download="Akash_H_S_Resume.pdf"
              className="inline-flex items-center gap-2 px-3 py-3.5 text-[15px] text-paper-dim underline decoration-white/20 underline-offset-[6px] transition-colors hover:text-paper hover:decoration-signal"
            >
              <Download size={16} aria-hidden="true" />
              Download resume
            </a>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: vizY }} className="lg:col-span-5">
          <motion.div {...fade(0.6)}>
            <WorkflowViz ready={ready} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
