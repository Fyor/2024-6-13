'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { destinations } from '@/data/destinations'

// Linköping: 58.4°N, 15.6°E  →  SVG (460, 233)
// Projection: x = (lon + 12) / 54 * 900,  y = (72 - lat) / 38 * 650
const ORIGIN = { x: 460, y: 233 }

function ll(lat: number, lon: number) {
  return { x: Math.round((lon + 12) / 54 * 900), y: Math.round((72 - lat) / 38 * 650) }
}

// Destination SVG positions from real lat/lon
const DEST_POS: Record<string, { x: number; y: number }> = {
  england:        ll(51.5, -0.1),
  france:         ll(48.9,  2.4),
  germany:        ll(51.5,  7.5),
  poland:         ll(50.1, 19.9),
  austria:        ll(48.2, 16.4),
  'north-sweden': ll(67.9, 20.2),
}

// Simplified geographic country paths (SVG 900×650 viewBox)
const PATHS = [
  // Norway — west Scandinavian coast + arctic north
  { id: 'no', hi: false, d: 'M408,208 L400,222 L333,239 L295,222 L288,199 L302,163 L375,146 L450,100 L517,58 L633,17 L700,47 L667,68 L617,110 L567,132 L533,165 L500,182 L450,199 Z' },
  // Sweden
  { id: 'se', hi: true,  d: 'M417,300 L467,291 L500,275 L500,232 L492,171 L567,132 L567,100 L533,68 L517,58 L450,100 L450,199 L408,208 L397,234 L400,259 Z' },
  // Finland
  { id: 'fi', hi: false, d: 'M567,132 L617,110 L667,68 L700,47 L683,79 L700,129 L717,163 L683,196 L617,213 L583,220 L550,196 L567,163 Z' },
  // Denmark
  { id: 'dk', hi: false, d: 'M375,249 L358,262 L333,287 L358,300 L367,283 L400,276 L408,276 L397,262 Z' },
  // Great Britain — two polygons separated by space in d
  { id: 'gb', hi: true,  d: 'M125,360 L167,351 L208,348 L222,356 L200,319 L183,307 L167,308 L133,319 Z M165,234 L183,252 L183,270 L163,278 L133,267 L125,258 Z' },
  // Ireland
  { id: 'ie', hi: false, d: 'M133,295 L150,283 L167,308 L150,316 L133,311 Z' },
  // France
  { id: 'fr', hi: true,  d: 'M142,409 L183,389 L240,364 L333,405 L325,461 L290,465 L183,462 L200,443 Z' },
  // Iberian peninsula
  { id: 'es', hi: false, d: 'M67,461 L183,461 L250,476 L200,517 L183,565 L125,568 L67,530 L50,527 Z' },
  // Benelux
  { id: 'bx', hi: false, d: 'M267,322 L317,323 L308,350 L302,382 L258,366 L258,350 Z' },
  // Germany
  { id: 'de', hi: true,  d: 'M367,308 L425,305 L425,356 L417,415 L333,419 L308,344 Z' },
  // Poland
  { id: 'pl', hi: true,  d: 'M442,322 L508,305 L592,314 L583,397 L533,385 L467,376 Z' },
  // Czech Republic
  { id: 'cz', hi: false, d: 'M400,360 L508,359 L500,381 L467,393 L417,397 L400,375 Z' },
  // Austria
  { id: 'at', hi: true,  d: 'M375,419 L473,406 L483,419 L450,436 L367,427 Z' },
  // Switzerland
  { id: 'ch', hi: false, d: 'M333,419 L417,415 L417,427 L375,436 L333,436 Z' },
  // Italy
  { id: 'it', hi: false, d: 'M317,444 L430,437 L463,582 L375,565 L317,478 Z' },
  // SE Europe — Balkans, Hungary, Romania, Greece
  { id: 'se_eu', hi: false, d: 'M433,437 L567,420 L600,419 L650,436 L667,478 L633,547 L567,592 L533,547 L450,527 L433,487 Z' },
  // Baltic states
  { id: 'balt', hi: false, d: 'M583,213 L617,213 L650,197 L617,230 L567,244 L542,278 L567,302 Z' },
  // Ukraine / Belarus
  { id: 'ua', hi: false, d: 'M567,302 L650,302 L700,324 L750,342 L800,410 L750,461 L600,444 L567,410 Z' },
  // Russia (partial)
  { id: 'ru', hi: false, d: 'M700,47 L783,68 L800,150 L750,190 L717,163 L683,113 Z' },
]

const ROUTE_DURATION = 1.4
const ROUTE_STAGGER = 0.45

interface Props { onRevealReady: () => void }

export default function EuropeMap({ onRevealReady }: Props) {
  const [zoomed, setZoomed]         = useState(false)
  const [routes, setRoutes]         = useState(false)
  const [markers, setMarkers]       = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [bursting, setBursting]     = useState(false)

  // Sequence: zoom → routes → markers → button
  useEffect(() => {
    const t1 = setTimeout(() => setZoomed(true), 200)
    const t2 = setTimeout(() => setRoutes(true), 800)
    const t3 = setTimeout(() => setMarkers(true), 800 + (destinations.length * ROUTE_STAGGER + ROUTE_DURATION) * 1000)
    const t4 = setTimeout(() => setShowButton(true), 800 + (destinations.length * ROUTE_STAGGER + ROUTE_DURATION) * 1000 + 600)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  function handleReveal() {
    setBursting(true)
    setTimeout(onRevealReady, 1100)
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      {/* Header */}
      <motion.div
        className="text-center pt-14 pb-6 px-6 z-10"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-[11px] uppercase tracking-[0.3em] text-crimson/60 font-body font-semibold mb-3">
          The big reveal
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-cream leading-tight font-semibold">
          Where are we going?
        </h1>
      </motion.div>

      {/* Map container */}
      <div className="relative flex-1 w-full max-w-5xl mx-auto px-4 pb-4">
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-wine/20"
          style={{ paddingBottom: '60%' }}
        >
          <div className="absolute inset-0 bg-void">
            <svg viewBox="0 0 900 650" className="w-full h-full" aria-label="Map of Europe">
              <defs>
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="origin-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Zoom group — starts 4.5× centred on Linköping, eases to 1× */}
              <motion.g
                style={{ transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px` }}
                initial={{ scale: 4.5 }}
                animate={zoomed ? { scale: 1 } : { scale: 4.5 }}
                transition={{ duration: 3.2, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Country fills */}
                {PATHS.map((p) => (
                  <path
                    key={p.id}
                    d={p.d}
                    fill={p.hi ? '#2D0A18' : '#1A0510'}
                    stroke="#4A1020"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                  />
                ))}

                {/* Animated route lines */}
                {routes && destinations.map((dest, i) => {
                  const pos = DEST_POS[dest.id] ?? { x: 0, y: 0 }
                  const mx = (ORIGIN.x + pos.x) / 2 + (pos.y - ORIGIN.y) * 0.18
                  const my = (ORIGIN.y + pos.y) / 2 - Math.abs(pos.x - ORIGIN.x) * 0.14
                  return (
                    <motion.path
                      key={dest.id}
                      d={`M${ORIGIN.x},${ORIGIN.y} Q${mx},${my} ${pos.x},${pos.y}`}
                      stroke="#C41E3A"
                      strokeWidth="1.6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="5 4"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.9 }}
                      transition={{
                        pathLength: { duration: ROUTE_DURATION, delay: i * ROUTE_STAGGER, ease: 'easeOut' },
                        opacity:    { duration: 0.4, delay: i * ROUTE_STAGGER },
                      }}
                    />
                  )
                })}

                {/* Destination dots */}
                {markers && destinations.map((dest, i) => {
                  const pos = DEST_POS[dest.id] ?? { x: 0, y: 0 }
                  return (
                    <motion.circle
                      key={dest.id}
                      cx={pos.x} cy={pos.y} r={5}
                      fill="#C41E3A"
                      filter="url(#glow)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 18, delay: i * 0.12 }}
                    />
                  )
                })}

                {/* Origin — Linköping */}
                <motion.circle
                  cx={ORIGIN.x} cy={ORIGIN.y} r={5}
                  fill="#C41E3A"
                  filter="url(#origin-glow)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 260 }}
                />
                <motion.circle
                  cx={ORIGIN.x} cy={ORIGIN.y} r={9}
                  fill="none"
                  stroke="#C41E3A"
                  strokeWidth="1.5"
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
                />
                <text
                  x={ORIGIN.x + 13} y={ORIGIN.y - 8}
                  fontSize="8" fill="#E63950" fillOpacity="0.75"
                  fontFamily="Georgia, serif" fontStyle="italic"
                >
                  Linköping
                </text>

                {/* Destination city labels */}
                {markers && destinations.map((dest) => {
                  const pos = DEST_POS[dest.id] ?? { x: 0, y: 0 }
                  const above = pos.y < ORIGIN.y
                  return (
                    <motion.text
                      key={dest.id}
                      x={pos.x + 10} y={above ? pos.y - 7 : pos.y + 14}
                      fontSize="7" fill="#FF9DB2" fillOpacity="0.85"
                      fontFamily="Georgia, serif" fontStyle="italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {dest.city}
                    </motion.text>
                  )
                })}
              </motion.g>
            </svg>

            {/* Origin label overlay */}
            <div className="absolute bottom-3 left-4 text-[10px] font-body italic text-crimson/30 pointer-events-none">
              Starting from Linköping, Sweden
            </div>
          </div>
        </div>
      </div>

      {/* Reveal button */}
      <AnimatePresence>
        {showButton && !bursting && (
          <motion.div
            className="pb-10 pt-2 z-10"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={handleReveal}
              className="px-10 py-4 rounded-full border border-crimson bg-crimson/10 text-cream font-body text-sm font-semibold uppercase tracking-[0.2em] hover:bg-crimson hover:shadow-[0_0_40px_#C41E3A70] transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Reveal our destinations ✦
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Burst transition overlay */}
      <AnimatePresence>
        {bursting && (
          <>
            {/* Expanding rings */}
            {[0, 0.1, 0.2, 0.3, 0.45].map((delay, i) => (
              <motion.div
                key={i}
                className="fixed rounded-full border-2 border-crimson pointer-events-none z-50"
                style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
                initial={{ width: 0, height: 0, opacity: 0.9 }}
                animate={{ width: '280vmax', height: '280vmax', opacity: 0 }}
                transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.4, 1] }}
              />
            ))}
            {/* Final dark fill */}
            <motion.div
              className="fixed inset-0 bg-void pointer-events-none z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
