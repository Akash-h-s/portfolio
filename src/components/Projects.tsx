import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Github } from 'lucide-react'
import { projects, profile } from '../data/content'
import ProjectVisual from './ProjectVisuals'
import { Reveal, SectionHeading, Tag } from './primitives'

function Tilt({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })
  return (
    <motion.div
      style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40" aria-labelledby="proj-title">
      <SectionHeading
        title={['Three projects,', 'three kinds of problems.']}
        lead="A full-stack enterprise app, a real-time marketplace and a machine learning analysis. Each one is explained below."
      />
      <h2 id="proj-title" className="sr-only">Projects</h2>

      <div className="space-y-28 md:space-y-40">
        {projects.map((p, i) => (
          <article key={p.key} className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14" aria-labelledby={`p-${p.key}`}>
            <div className={`lg:col-span-6 ${i % 2 ? 'lg:order-2' : ''} lg:sticky lg:top-28`}>
              <Reveal>
                <Tilt>
                  <ProjectVisual kind={p.key} />
                </Tilt>
              </Reveal>
            </div>

            <div className={`lg:col-span-6 ${i % 2 ? 'lg:order-1' : ''}`}>
              <Reveal>
                <p className="text-sm text-signal">
                  <time>{p.period}</time>
                  <span className="mx-2 text-paper-mute" aria-hidden="true">/</span>
                  <span className="text-paper-dim">{p.kind}</span>
                </p>
                <h3 id={`p-${p.key}`} className="display mt-3 text-balance text-4xl leading-[1.02] sm:text-5xl">
                  {p.name}
                </h3>
                <div className="mt-7">
                  <h4 className="text-sm font-medium text-paper">The problem</h4>
                  <p className="mt-2 text-pretty leading-relaxed text-paper-dim">{p.problem}</p>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="mt-7 grid gap-7 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-paper">Key features</h4>
                    <ul className="mt-3 space-y-2.5 text-[15px] leading-snug text-paper-dim">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-paper">What I built</h4>
                    <ul className="mt-3 space-y-2.5 text-[15px] leading-snug text-paper-dim">
                      {p.built.map((f) => (
                        <li key={f} className="flex gap-3">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-glow" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <ul className="mt-8 flex flex-wrap gap-2" aria-label={`Technologies used in ${p.name}`}>
                  {p.stack.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </article>
        ))}
      </div>

      <Reveal className="mt-28 md:mt-36">
        <div className="glass flex flex-col items-start justify-between gap-6 rounded-3xl p-7 sm:flex-row sm:items-center md:p-10">
          <div>
            <h3 className="display text-3xl md:text-4xl">Want to see the code?</h3>
            <p className="mt-2 max-w-md text-paper-dim">My repositories are on GitHub.</p>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-white/40 hover:bg-white/[0.05]"
          >
            <Github size={18} aria-hidden="true" />
            github.com/Akash-h-s
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </Reveal>
    </section>
  )
}
