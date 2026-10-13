import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useRef } from 'react'
import { principles, stats } from '../data/content'
import { CountUp, Reveal, SectionHeading } from './primitives'

export default function About() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%'])
  const frameY = useTransform(scrollYProgress, [0, 1], reduce ? ['0px', '0px'] : ['24px', '-24px'])

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40" aria-labelledby="about-title">
      <SectionHeading
        title={['A developer who likes', 'the whole path of a feature.']}
        lead="From the button someone clicks to the Lambda behind it and the test that guards it."
      />
      <h2 id="about-title" className="sr-only">About me</h2>

      <div ref={ref} className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <div className="relative mx-auto max-w-xs md:max-w-none">
            <motion.div
              style={{ y: frameY }}
              className="absolute -inset-3 -z-10 translate-x-3 translate-y-3 rounded-[28px] border border-signal/30"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-ink-800">
              <motion.picture style={{ y: imgY }} className="absolute inset-x-0 -inset-y-[8%] block">
                <source srcSet="/akash.webp" type="image/webp" />
                <img
                  src="/akash.jpg"
                  alt="Portrait of Akash H S, smiling, wearing glasses and a black shirt"
                  width={759}
                  height={725}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[50%_30%]"
                />
              </motion.picture>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/80 to-transparent" />
              <p className="glass absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px]">
                <MapPin size={14} className="text-signal" aria-hidden="true" />
                Bengaluru, India
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 md:pl-6">
          <div className="space-y-6 text-pretty text-lg leading-[1.7] text-paper-dim md:text-xl md:leading-[1.65]">
            <Reveal>
              <p>
                I'm a software developer from Bengaluru. I like owning a feature end to end: the interface, the API behind
                it, and the tests that prove it keeps working.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                From November 2025 to June 2026 I was a Software Developer Intern on the Workflow Tools team at{' '}
                <span className="text-paper">Talview</span>. I built React and TypeScript features for enterprise workflow
                software, connected them to GraphQL through Hasura, and used Temporal and AWS Lambda for reliable
                background processing.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                Alongside my B.E. in Computer Science and Engineering, I built a full-stack student management system, a
                MERN service marketplace, and a machine learning analysis of movie data. When a defect shows up, I look for
                the root cause rather than the quickest patch.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/10 pt-12 md:mt-32 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div>
              <dt className="display text-6xl leading-none text-paper sm:text-7xl">
                <CountUp to={s.value} suffix={s.suffix} decimals={s.decimals} />
              </dt>
              <dd className="mt-4 max-w-[16rem] text-sm leading-relaxed text-paper-mute">{s.label}</dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <div className="mt-24 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:mt-32 md:grid-cols-3">
        {principles.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} className="bg-ink-900">
            <article className="h-full p-7 md:p-9">
              <h3 className="display text-3xl leading-tight">{p.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-paper-dim">{p.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
