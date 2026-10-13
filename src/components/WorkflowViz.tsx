import { motion, useReducedMotion } from 'framer-motion'
import { Cloud, Database, LayoutDashboard, Workflow, Zap, Check, type LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

type Step = { icon: LucideIcon; name: string; detail: string; log: string }

const steps: Step[] = [
  { icon: Zap, name: 'Event', detail: 'A trigger arrives', log: 'event.received' },
  { icon: Cloud, name: 'AWS Lambda', detail: 'Serverless function runs', log: 'lambda.invoke' },
  { icon: Workflow, name: 'Temporal', detail: 'Workflow retries on failure', log: 'workflow.step' },
  { icon: Database, name: 'Hasura GraphQL', detail: 'Data is written and queried', log: 'graphql.mutation' },
  { icon: LayoutDashboard, name: 'React + TypeScript', detail: 'The UI updates', log: 'ui.render' },
]

/**
 * An illustration of the stack from my internship, replaying a single event end to end.
 * It is a loop, not a live system, and says so in its caption.
 */
export default function WorkflowViz({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(reduce ? steps.length : -1)

  useEffect(() => {
    if (reduce || !ready) return
    let step = -1
    let timer = 0
    const run = () => {
      step += 1
      if (step > steps.length + 2) step = -1
      setI(step)
      timer = window.setTimeout(run, step >= steps.length ? 1300 : 1050)
    }
    timer = window.setTimeout(run, 900)
    return () => window.clearTimeout(timer)
  }, [reduce, ready])

  const shown = Math.min(i, steps.length - 1)

  return (
    <figure className="relative">
      <div className="glass relative overflow-hidden rounded-[28px] shadow-[0_40px_120px_-30px_rgba(91,108,255,0.35)]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <span className="mono text-xs text-paper-mute">workflow.run</span>
          <span className="mono flex items-center gap-1.5 text-xs text-paper-mute">
            <span
              className={`h-1.5 w-1.5 rounded-full ${i >= steps.length ? 'bg-ok' : 'bg-amber-glow'}`}
              aria-hidden="true"
            />
            {i >= steps.length ? 'complete' : i < 0 ? 'idle' : 'running'}
          </span>
        </div>

        <ol className="relative px-5 py-6 sm:px-7" aria-label="Event flowing through the stack">
          {steps.map((s, idx) => {
            const state = idx < i ? 'done' : idx === i ? 'active' : 'idle'
            const Icon = s.icon
            return (
              <li key={s.name} className="relative flex gap-4 pb-7 last:pb-0">
                {idx < steps.length - 1 && (
                  <span className="absolute left-[21px] top-11 h-[calc(100%-2.75rem)] w-px bg-white/10" aria-hidden="true">
                    <motion.span
                      className="absolute inset-x-0 top-0 block bg-signal"
                      initial={false}
                      animate={{ height: idx < i ? '100%' : '0%' }}
                      transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {state === 'active' && !reduce && (
                      <motion.span
                        className="absolute -left-[3px] h-2 w-2 rounded-full bg-amber-glow shadow-[0_0_14px_3px_rgba(242,182,109,0.7)]"
                        initial={{ top: '0%' }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                      />
                    )}
                  </span>
                )}
                <motion.span
                  className="relative grid h-[44px] w-[44px] shrink-0 place-items-center rounded-xl border"
                  animate={{
                    borderColor: state === 'idle' ? 'rgba(255,255,255,0.1)' : 'rgba(139,155,255,0.6)',
                    backgroundColor: state === 'idle' ? 'rgba(255,255,255,0.02)' : 'rgba(139,155,255,0.14)',
                    scale: state === 'active' ? 1.06 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {state === 'active' && !reduce && (
                    <span className="pulse-ring absolute inset-0 rounded-xl border border-signal/60" aria-hidden="true" />
                  )}
                  <Icon size={19} className={state === 'idle' ? 'text-paper-mute' : 'text-signal'} aria-hidden="true" />
                </motion.span>
                <div className="min-w-0 pt-0.5">
                  <p className={`text-[15px] font-medium transition-colors ${state === 'idle' ? 'text-paper-mute' : 'text-paper'}`}>
                    {s.name}
                  </p>
                  <p className="text-sm text-paper-mute">{s.detail}</p>
                </div>
                <span className="mono ml-auto hidden items-center gap-1.5 pt-1 text-xs sm:flex">
                  {state === 'done' && (
                    <>
                      <Check size={13} className="text-ok" aria-hidden="true" />
                      <span className="text-ok">{s.log}</span>
                    </>
                  )}
                  {state === 'active' && <span className="text-amber-glow">{s.log}…</span>}
                </span>
              </li>
            )
          })}
        </ol>

        <div className="mono border-t border-white/[0.06] bg-black/20 px-5 py-3 text-xs text-paper-mute sm:px-7" aria-hidden="true">
          {i < 0 ? 'waiting for event' : i >= steps.length ? 'all steps succeeded' : `> ${steps[shown].log}`}
        </div>
      </div>
      <figcaption className="mt-3 px-2 text-xs text-paper-mute">
        An illustration of the stack I used at Talview, replaying one event from trigger to interface.
      </figcaption>
    </figure>
  )
}
