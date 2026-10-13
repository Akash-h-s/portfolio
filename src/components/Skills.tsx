import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { contexts, skillGroups, type Context } from '../data/content'
import { Reveal, SectionHeading } from './primitives'

export default function Skills() {
  const reduce = useReducedMotion()
  const [ctx, setCtx] = useState<Context | null>(null)

  return (
    <section id="skills" className="relative border-y border-white/[0.06] bg-ink-900/60 py-28 md:py-40" aria-labelledby="skills-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          title={['The tools I reach for,', 'and where I used them.']}
          lead="Every skill is listed in plain text. Pick a project to see which ones it used."
        />
        <h2 id="skills-title" className="sr-only">Technical skills</h2>

        <Reveal>
          <div className="mb-12 flex flex-wrap items-center gap-2.5" role="group" aria-label="Highlight skills used in">
            <span className="mr-1 text-sm text-paper-mute">Highlight skills from</span>
            {contexts.map((c) => {
              const on = ctx === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCtx(on ? null : c.id)}
                  className={`rounded-full border px-4 py-2.5 text-sm transition-all duration-300 ${
                    on
                      ? 'border-signal bg-signal text-ink-950'
                      : 'border-white/15 text-paper-dim hover:border-white/40 hover:text-paper'
                  }`}
                >
                  {c.label}
                </button>
              )
            })}
            {ctx && (
              <button
                type="button"
                onClick={() => setCtx(null)}
                className="px-2 py-2.5 text-sm text-paper-mute underline underline-offset-4 hover:text-paper"
              >
                Clear
              </button>
            )}
          </div>
        </Reveal>

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.title} delay={Math.min(gi * 0.04, 0.2)}>
              <div className="grid gap-5 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                <div className="md:col-span-4">
                  <h3 className="display text-3xl leading-tight">{g.title}</h3>
                  <p className="mt-1.5 text-sm text-paper-mute">{g.note}</p>
                </div>
                <ul className="flex flex-wrap content-start gap-2.5 md:col-span-8">
                  {g.skills.map((s) => {
                    const hit = !!ctx && !!s.used?.includes(ctx)
                    const dim = !!ctx && !hit
                    return (
                      <motion.li
                        key={s.name}
                        layout={!reduce}
                        animate={{ opacity: dim ? 0.3 : 1 }}
                        transition={{ duration: 0.35 }}
                        className={`rounded-full border px-4 py-2 text-[15px] leading-none transition-colors duration-300 ${
                          hit
                            ? 'border-signal/70 bg-signal/15 text-paper shadow-[0_0_24px_-6px_rgba(139,155,255,0.6)]'
                            : 'border-white/10 bg-white/[0.03] text-paper-dim hover:border-white/30 hover:text-paper'
                        }`}
                      >
                        {s.name}
                      </motion.li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="grid gap-5 py-8 md:grid-cols-12 md:gap-8 md:py-10">
              <div className="md:col-span-4">
                <h3 className="display text-3xl leading-tight">Problem solving</h3>
                <p className="mt-1.5 text-sm text-paper-mute">Practice behind the engineering</p>
              </div>
              <p className="text-lg leading-relaxed text-paper-dim md:col-span-8">
                <span className="display text-5xl text-paper">500+</span>{' '}
                problems solved across LeetCode, GeeksforGeeks and CodeChef.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
