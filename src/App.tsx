import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Education from './components/Education'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Projects from './components/Projects'
import Skills from './components/Skills'

export default function App() {
  const [loading, setLoading] = useState(true)
  const finish = useCallback(() => setLoading(false), [])

  useEffect(() => {
    document.body.classList.toggle('is-locked', loading)
    return () => document.body.classList.remove('is-locked')
  }, [loading])

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <a
          href="#about"
          className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink-950 transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <AnimatePresence>{loading && <Loader key="loader" onDone={finish} />}</AnimatePresence>
        <Cursor />
        <Nav ready={!loading} />
        <main>
          <Hero ready={!loading} />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  )
}
