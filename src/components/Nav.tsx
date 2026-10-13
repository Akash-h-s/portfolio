import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Download, Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { navLinks, profile } from '../data/content'

export default function Nav({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)
  const firstLink = useRef<HTMLAnchorElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const top = () => window.scrollY < 200 && setActive('')
    window.addEventListener('scroll', top, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', top)
    }
  }, [ready])

  // lock scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    if (!open) return
    firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('is-locked')
    }
  }, [open])

  const go = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      setOpen(false)
      document.body.classList.remove('is-locked')
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
        history.replaceState(null, '', `#${id}`)
      }, 30)
    },
    [reduce],
  )

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-4"
        initial={reduce ? false : { y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          aria-label="Primary"
          className={`flex w-full items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled ? 'glass max-w-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]' : 'max-w-6xl border border-transparent'
          }`}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
            }}
            className="display text-2xl leading-none tracking-[0.06em]"
            aria-label="Akash H S, back to top"
          >
            AKASH H S
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors ${
                    active === l.id ? 'text-paper' : 'text-paper-dim hover:text-paper'
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              download="Akash_H_S_Resume.pdf"
              className="hidden items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.04] active:scale-95 sm:inline-flex"
            >
              <Download size={15} aria-hidden="true" />
              Resume
            </a>
            <button
              ref={toggle}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink-950/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    className="display flex items-center justify-between border-b border-white/10 py-4 text-5xl"
                  >
                    {l.label}
                    <ArrowUpRight size={26} className="text-signal" aria-hidden="true" />
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={profile.resume}
              download="Akash_H_S_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-paper px-6 py-4 text-base font-medium text-ink-950"
            >
              <Download size={18} aria-hidden="true" />
              Download resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
