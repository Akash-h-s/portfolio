import { motion, useReducedMotion } from 'framer-motion'
import { achievements, education } from '../data/content'
import { Reveal, SectionHeading } from './primitives'

function Ring({ value, max, label }: { value: number; max: number; label: string }) {
  const reduce = useReducedMotion()
  const r = 26
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0 -rotate-90" role="img" aria-label={label}>
      <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
      <motion.circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="#8B9BFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={reduce ? false : { strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: c * (1 - value / max) }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ strokeDashoffset: c * (1 - value / max) }}
      />
    </svg>
  )
}

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40" aria-labelledby="edu-title">
      <SectionHeading
        title={['Education and', 'what I have won.']}
        lead="Strong academics, and a habit of entering competitions to test the fundamentals."
      />
      <h2 id="edu-title" className="sr-only">Education and achievements</h2>

      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h3 className="display text-3xl md:text-4xl">Education</h3>
          <ol className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {education.map((e) => (
              <li key={e.title}>
                <Reveal>
                  <div className="flex items-center gap-5 py-6 md:gap-7">
                    <Ring value={e.value} max={e.max} label={`${e.score}`} />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-lg font-medium leading-snug">{e.title}</h4>
                      <p className="mt-1 text-[15px] text-paper-dim">{e.school}</p>
                      <p className="mt-1 text-sm text-paper-mute">
                        <time>{e.period}</time>
                      </p>
                    </div>
                    <p className="display text-right text-3xl leading-none md:text-4xl">{e.score}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-5">
          <h3 className="display text-3xl md:text-4xl">Achievements</h3>
          <ul className="mt-8 space-y-5">
            {achievements.map((a, i) => (
              <li key={a.title}>
                <Reveal delay={i * 0.1}>
                  <article className="glass rounded-3xl p-6 md:p-7">
                    <div className="flex items-baseline gap-4">
                      <p className="display text-6xl leading-none text-signal" aria-label={`${a.place} place`}>
                        {a.place}
                      </p>
                      <div>
                        <h4 className="font-medium leading-snug">{a.title}</h4>
                        <p className="text-sm text-paper-mute">{a.where}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-paper-dim">{a.text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
