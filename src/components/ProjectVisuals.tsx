import { motion, useReducedMotion } from 'framer-motion'
import type { VisualKey } from '../data/content'

const S = '#8B9BFF'
const A = '#F2B66D'
const G = '#6FD3A8'

function Box({ x, y, w, h, label, sub, accent = S }: { x: number; y: number; w: number; h: number; label: string; sub?: string; accent?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="rgba(139,155,255,0.07)" stroke={accent} strokeOpacity={0.55} />
      <text x={x + w / 2} y={y + h / 2 + (sub ? -2 : 5)} textAnchor="middle" fill="#ECE9F4" fontSize="13" fontWeight="500">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fill="#8A8CA6" fontSize="10.5">
          {sub}
        </text>
      )}
    </g>
  )
}

/** Architecture diagram: client, local store, Hasura, Postgres and Lambda. */
function Student({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 520 340" role="img" aria-label="Architecture diagram: React frontend with Redux Toolkit and RXDB syncing through Hasura GraphQL to PostgreSQL, with AWS Lambda deployed using SAM" className="h-full w-full">
      <Box x={20} y={30} w={150} h={56} label="React + TypeScript" sub="Tailwind CSS UI" />
      <Box x={20} y={140} w={150} h={56} label="Redux Toolkit" sub="state" />
      <Box x={20} y={250} w={150} h={56} label="RXDB" sub="offline-first store" accent={A} />
      <Box x={195} y={140} w={130} h={56} label="Hasura" sub="GraphQL + RBAC" />
      <Box x={370} y={80} w={130} h={56} label="PostgreSQL" sub="student records" />
      <Box x={370} y={200} w={130} h={56} label="AWS Lambda" sub="deployed with SAM" accent={G} />
      {[
        'M95 86 V140',
        'M95 196 V250',
        'M170 168 H195',
        'M325 160 C345 160 345 108 370 108',
        'M325 176 C345 176 345 228 370 228',
      ].map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={1.5} />
          <path d={d} fill="none" stroke={S} strokeWidth={1.5} className={reduce ? '' : 'flow'} strokeLinecap="round" />
        </g>
      ))}
      <path d="M45 250 C 10 220 10 190 45 196" fill="none" stroke={A} strokeOpacity={0.6} strokeDasharray="3 5" />
      <text x="260" y="320" textAnchor="middle" fill="#6E7089" fontSize="11">Real-time sync when online, local reads when not</text>
    </svg>
  )
}

/** Abstract map with a worker pin travelling to the customer, plus booking and email cards. */
function Market({ reduce }: { reduce: boolean }) {
  const route = 'M60 270 C 130 250 150 190 220 190 S 330 120 400 90'
  return (
    <svg viewBox="0 0 520 340" role="img" aria-label="Abstract map showing a worker travelling to a customer, with an appointment confirmed card and an email notification" className="h-full w-full">
      <defs>
        <pattern id="roads" width="52" height="52" patternUnits="userSpaceOnUse">
          <path d="M0 26 H52 M26 0 V52" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="520" height="340" rx="18" fill="rgba(255,255,255,0.02)" />
      <rect x="0" y="0" width="520" height="340" rx="18" fill="url(#roads)" />
      <path d={route} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
      <motion.path
        d={route}
        fill="none"
        stroke={S}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
      />
      {/* availability pins */}
      {[ [110, 120], [300, 250], [450, 190], [190, 60] ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="14" fill={G} fillOpacity="0.12" />
          <circle cx={x} cy={y} r="5" fill={G} />
        </g>
      ))}
      {/* customer */}
      <g>
        <circle cx="400" cy="90" r="18" fill={A} fillOpacity="0.16" className={reduce ? '' : 'pulse-ring'} style={{ transformOrigin: '400px 90px' }} />
        <circle cx="400" cy="90" r="7" fill={A} />
      </g>
      {/* worker */}
      <circle r="8" fill={S} stroke="#080B12" strokeWidth="3">
        {!reduce && <animateMotion dur="5s" repeatCount="indefinite" path={route} keyPoints="0;1;1" keyTimes="0;0.85;1" calcMode="linear" />}
        {reduce && <animateMotion dur="1s" path={route} keyPoints="0.6;0.6" keyTimes="0;1" calcMode="linear" fill="freeze" />}
      </circle>
      {/* cards */}
      <g transform="translate(24 24)">
        <rect width="168" height="62" rx="14" fill="rgba(12,16,24,0.85)" stroke="rgba(255,255,255,0.1)" />
        <circle cx="22" cy="31" r="6" fill={G} />
        <text x="38" y="28" fill="#ECE9F4" fontSize="12" fontWeight="500">Appointment booked</text>
        <text x="38" y="45" fill="#8A8CA6" fontSize="10.5">Availability checked live</text>
      </g>
      <g transform="translate(316 262)">
        <rect width="180" height="58" rx="14" fill="rgba(12,16,24,0.85)" stroke="rgba(255,255,255,0.1)" />
        <rect x="14" y="20" width="22" height="16" rx="3" fill="none" stroke={S} />
        <path d="M14 22 L25 31 L36 22" fill="none" stroke={S} />
        <text x="48" y="27" fill="#ECE9F4" fontSize="12" fontWeight="500">Email sent</text>
        <text x="48" y="43" fill="#8A8CA6" fontSize="10.5">Automated notification</text>
      </g>
    </svg>
  )
}

/** Illustrative charts: shapes only, not real results. */
function Movie({ reduce }: { reduce: boolean }) {
  const bars = [46, 78, 112, 92, 60, 34]
  const labels = ['Genre', 'Genre', 'Genre', 'Genre', 'Genre', 'Genre']
  const pts: [number, number][] = [ [300,230],[322,206],[340,214],[362,176],[380,184],[404,140],[420,150],[446,108],[468,96] ]
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ')
  return (
    <svg viewBox="0 0 520 340" role="img" aria-label="Illustrative dashboard with a genre bar chart, a prediction trend line and a fitted model" className="h-full w-full">
      <rect x="14" y="14" width="492" height="312" rx="18" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
      <text x="36" y="46" fill="#ECE9F4" fontSize="13" fontWeight="500">Ratings by genre</text>
      <text x="300" y="46" fill="#ECE9F4" fontSize="13" fontWeight="500">Model fit</text>
      <line x1="36" y1="270" x2="250" y2="270" stroke="rgba(255,255,255,0.15)" />
      {bars.map((h, i) => (
        <g key={i}>
          <motion.rect
            x={44 + i * 35}
            width="22"
            rx="5"
            fill={i === 2 ? A : S}
            fillOpacity={i === 2 ? 1 : 0.75}
            initial={reduce ? false : { y: 270, height: 0 }}
            whileInView={{ y: 270 - h, height: h }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            y={270 - h}
            height={h}
          />
          <text x={55 + i * 35} y="288" textAnchor="middle" fill="#6E7089" fontSize="9">{labels[i].slice(0, 1)}{i + 1}</text>
        </g>
      ))}
      <line x1="290" y1="250" x2="490" y2="250" stroke="rgba(255,255,255,0.15)" />
      <line x1="290" y1="60" x2="290" y2="250" stroke="rgba(255,255,255,0.15)" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill={S} fillOpacity="0.8" />
      ))}
      <motion.path
        d={line}
        fill="none"
        stroke={A}
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.5, ease: 'easeInOut' }}
      />
      <g transform="translate(36 302)">
        <circle cx="4" cy="0" r="3.5" fill={A} />
        <text x="14" y="3.5" fill="#8A8CA6" fontSize="10">Illustration of the analysis, not project data</text>
      </g>
    </svg>
  )
}

export default function ProjectVisual({ kind }: { kind: VisualKey }) {
  const reduce = !!useReducedMotion()
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[22px] border border-white/[0.07] bg-gradient-to-br from-ink-800 to-ink-950 p-3 sm:p-4">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-signal/10 blur-3xl" aria-hidden="true" />
      {kind === 'student' && <Student reduce={reduce} />}
      {kind === 'market' && <Market reduce={reduce} />}
      {kind === 'movie' && <Movie reduce={reduce} />}
    </div>
  )
}
