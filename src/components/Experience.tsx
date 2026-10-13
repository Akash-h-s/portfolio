import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { CalendarRange, MapPin } from 'lucide-react'
import { useRef } from 'react'
import { experience, journey } from '../data/content'
import { Reveal, SectionHeading, Tag } from './primitives'

function PerfBar() {
  const reduce = useReducedMotion()
  return (
    <div className="mt-6 space-y-2.5" aria-label="UI rendering time reduced by 30 percent">
      {[
        { label: 'Before', w: '100%', cls: 'bg-white/20' },
        { label: 'After', w: '70%', cls: 'bg-signal' },
      ].map((b, i) => (
        <div key={b.label} className="flex items-center gap-3 text-xs text-paper-mute">
          <span className="w-11">{b.label}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
            <motion.div
              className={`h-full rounded-full ${b.cls}`}
              initial={reduce ? false : { width: '0%' }}
              whileInView={{ width: b.w }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
      <p className="text-xs text-paper-mute">UI rendering time, relative. 30% reduction.</p>
    </div>
  )
}

function ModuleDots() {
  const reduce = useReducedMotion()
  return (
    <div className="mt-6 flex items-center gap-2" aria-label="Adopted across 5 or more product modules">
      {[0, 1, 2, 3, 4].map((n) => (
        <motion.span
          key={n}
          className="h-3.5 w-3.5 rounded-[5px] bg-signal/80"
          initial={reduce ? false : { opacity: 0.1, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ delay: 0.3 + n * 0.1, type: 'spring', stiffness: 300, damping: 18 }}
        />
      ))}
      <span className="ml-1 text-xs text-paper-mute">+ product modules</span>
    </div>
  )
}

export default function Experience() {
  const reduce = useReducedMotion()
  const railRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  const jRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: jp } = useScroll({ target: jRef, offset: ['start 80%', 'end 60%'] })
  const jSpring = useSpring(jp, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <section id="experience" className="relative border-y border-white/[0.06] bg-ink-900/60 py-28 md:py-40" aria-labelledby="exp-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          title={['Where I have', 'shipped real work.']}
          lead="An eight-month internship on enterprise workflow software, from first component to production tests."
        />
        <h2 id="exp-title" className="sr-only">Experience</h2>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="display text-5xl leading-none sm:text-6xl">{experience.company}</p>
                <h3 className="mt-5 text-xl font-medium">{experience.role}</h3>
                <p className="text-paper-dim">{experience.team}</p>
                <ul className="mt-6 space-y-2.5 text-sm text-paper-dim">
                  <li className="flex items-center gap-2.5">
                    <CalendarRange size={16} className="text-signal" aria-hidden="true" />
                    <time>{experience.period}</time>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <MapPin size={16} className="text-signal" aria-hidden="true" />
                    {experience.place}
                  </li>
                </ul>
                <p className="mt-6 max-w-sm text-pretty text-[15px] leading-relaxed text-paper-mute">{experience.summary}</p>
              </Reveal>
            </div>
          </aside>

          <div ref={railRef} className="relative lg:col-span-8">
            <div className="absolute bottom-2 left-[11px] top-2 w-px bg-white/10" aria-hidden="true">
              <motion.div className="h-full origin-top bg-gradient-to-b from-signal to-signal/30" style={{ scaleY: reduce ? 1 : progress }} />
            </div>
            <ol className="space-y-8 md:space-y-10">
              {experience.work.map((w) => (
                <li key={w.key} className="relative pl-12 md:pl-14">
                  <motion.span
                    className="absolute left-0 top-2 grid h-[23px] w-[23px] place-items-center rounded-full border border-signal/70 bg-ink-900"
                    initial={reduce ? false : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    aria-hidden="true"
                  >
                    <span className="h-2 w-2 rounded-full bg-signal" />
                  </motion.span>
                  <Reveal>
                    <article className="group glass rounded-3xl p-6 transition-colors duration-500 hover:border-signal/30 md:p-8">
                      <h3 className="display text-3xl leading-tight md:text-4xl">{w.title}</h3>
                      <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-paper-dim">{w.text}</p>
                      {w.key === 'perf' && <PerfBar />}
                      {w.key === 'lib' && <ModuleDots />}
                      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies and practices">
                        {w.tags.map((t) => (
                          <li key={t}>
                            <Tag>{t}</Tag>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Career journey: a true chronological sequence */}
        <div className="mt-28 md:mt-40">
          <Reveal>
            <h3 className="display text-4xl md:text-5xl">The journey so far</h3>
          </Reveal>
          <div ref={jRef} className="relative mt-12">
            <div className="absolute left-[7px] top-1 hidden h-[calc(100%-0.5rem)] w-px bg-white/10 max-md:block" aria-hidden="true">
              <motion.div className="h-full origin-top bg-signal" style={{ scaleY: reduce ? 1 : jSpring }} />
            </div>
            <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/10 md:block" aria-hidden="true">
              <motion.div className="h-full origin-left bg-signal" style={{ scaleX: reduce ? 1 : jSpring }} />
            </div>
            <ol className="grid gap-9 max-md:pl-8 md:grid-cols-6 md:gap-5">
              {journey.map((j) => (
                <li key={j.when + j.title} className="relative md:pt-9">
                  <span
                    className="absolute top-1 h-[15px] w-[15px] rounded-full border-2 border-signal bg-ink-900 max-md:-left-8 md:left-0 md:top-0"
                    aria-hidden="true"
                  />
                  <p className="mono text-xs text-signal">{j.when}</p>
                  <p className="mt-2 text-[15px] font-medium leading-snug">{j.title}</p>
                  <p className="mt-1.5 text-sm leading-snug text-paper-mute">{j.where}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
