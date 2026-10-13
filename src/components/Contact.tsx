import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin, Mail } from 'lucide-react'
import { useState } from 'react'
import { profile } from '../data/content'
import Magnetic from './Magnetic'
import { MaskLines, Reveal } from './primitives'

export default function Contact() {
  const reduce = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setFailed(false)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setFailed(true)
      window.setTimeout(() => setFailed(false), 3000)
    }
  }

  const links = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail, ext: false },
    { label: 'LinkedIn', value: 'linkedin.com/in/akash-h-s-006766266', href: profile.linkedin, icon: Linkedin, ext: true },
    { label: 'GitHub', value: 'github.com/Akash-h-s', href: profile.github, icon: Github, ext: true },
  ]

  return (
    <section id="contact" className="relative isolate overflow-hidden px-5 pb-16 pt-28 sm:px-8 md:pt-40" aria-labelledby="contact-title">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%]" aria-hidden="true">
        <div className="orb-a absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(91,108,255,0.22),transparent)]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <MaskLines
          lines={['Let us build something', 'people can depend on.']}
          className="display text-balance text-[clamp(2.75rem,8vw,7rem)] leading-[0.96]"
        />
        <h2 id="contact-title" className="sr-only">Contact</h2>

        <Reveal delay={0.2} className="mt-8 max-w-xl">
          <p className="text-pretty text-lg leading-relaxed text-paper-dim">
            I'm happy to talk with recruiters and engineering teams about software roles, my internship work, or any of the
            projects above.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {links.map((l) => {
                const Icon = l.icon
                return (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center gap-4 py-5 transition-colors hover:text-signal"
                    >
                      <Icon size={20} className="shrink-0 text-paper-mute transition-colors group-hover:text-signal" aria-hidden="true" />
                      <span className="w-20 shrink-0 text-sm text-paper-mute">{l.label}</span>
                      <span className="min-w-0 flex-1 truncate text-base sm:text-lg">{l.value}</span>
                      {l.ext && <span className="sr-only">(opens in a new tab)</span>}
                      <ArrowUpRight size={20} className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm transition-colors hover:border-white/40 hover:bg-white/[0.05]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'ok' : 'copy'}
                    initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex"
                  >
                    {copied ? <Check size={16} className="text-ok" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                  </motion.span>
                </AnimatePresence>
                {copied ? 'Email copied' : 'Copy email address'}
              </button>
              <a
                href={profile.resume}
                download="Akash_H_S_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm transition-colors hover:border-white/40 hover:bg-white/[0.05]"
              >
                <Download size={16} aria-hidden="true" />
                Download resume
              </a>
              <span role="status" className="text-sm text-paper-mute">
                {failed ? `Copy failed. The address is ${profile.email}` : ''}
              </span>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <Magnetic strength={0.22}>
              <a
                href={`mailto:${profile.email}?subject=Hello%20Akash`}
                className="group relative grid h-56 w-56 place-items-center rounded-full bg-signal text-ink-950 transition-colors duration-500 hover:bg-paper sm:h-64 sm:w-64"
              >
                <span className="absolute inset-3 rounded-full border border-ink-950/20" aria-hidden="true" />
                <span className="flex flex-col items-center gap-1">
                  <span className="display text-4xl leading-none sm:text-5xl">Say hello</span>
                  <ArrowUpRight size={28} className="transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-28 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-8 text-sm text-paper-mute sm:flex-row sm:items-center md:mt-40">
        <p>© 2026 Akash H S. Designed and built in Bengaluru.</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
          className="rounded-full px-3 py-2 transition-colors hover:text-paper"
        >
          Back to top
        </button>
      </footer>
    </section>
  )
}
