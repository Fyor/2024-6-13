'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { destinations } from '@/data/destinations'

// ── Map constants ─────────────────────────────────────────────────────────────
const MAP_W   = 900
const MAP_H   = 580
const MAP_CX  = 14    // projection centre longitude
const MAP_CY  = 56    // projection centre latitude
const MAP_SCALE = 500

// 50m resolution (sharper than 110m)
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'

// European ISO 3166-1 numeric codes to render
const EU_IDS = new Set([
  8,40,56,70,100,112,191,203,208,233,246,250,276,300,
  348,372,380,428,440,442,470,498,499,528,578,616,620,
  642,643,688,703,705,724,752,756,792,804,826,
])
// Destination countries — highlighted slightly brighter
const DEST_IDS = new Set([752, 826, 250, 276, 616, 40])

// ── Heart path helper ─────────────────────────────────────────────────────────
// Returns an SVG path d-string for a heart centred at (cx, cy) with half-size r
function heartPath(cx: number, cy: number, r: number) {
  const w = r * 1.18   // half-width
  const h = r * 1.3    // half-height (tip to notch)
  const c = r * 0.28   // notch depth
  return [
    `M ${cx} ${cy - c}`,
    `C ${cx - c * 0.5} ${cy - h * 1.05} ${cx - w} ${cy - h * 0.6} ${cx - w} ${cy + h * 0.18}`,
    `C ${cx - w} ${cy + h * 0.85} ${cx} ${cy + h} ${cx} ${cy + h}`,
    `C ${cx} ${cy + h} ${cx + w} ${cy + h * 0.85} ${cx + w} ${cy + h * 0.18}`,
    `C ${cx + w} ${cy - h * 0.6} ${cx + c * 0.5} ${cy - h * 1.05} ${cx} ${cy - c}`,
    'Z',
  ].join(' ')
}

// ── Mercator projection matching ComposableMap ────────────────────────────────
function project(lon: number, lat: number): [number, number] {
  const x = MAP_W / 2 + MAP_SCALE * (lon - MAP_CX) * (Math.PI / 180)
  const y = MAP_H / 2 - MAP_SCALE * (
    Math.log(Math.tan(Math.PI / 4 + (lat  * Math.PI) / 360)) -
    Math.log(Math.tan(Math.PI / 4 + (MAP_CY * Math.PI) / 360))
  )
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10]
}

const ORIGIN = project(15.6, 58.4)  // Linköping

const DEST_COORDS: Record<string, [number, number]> = {
  england:        [-0.1, 51.5],
  france:         [2.4,  48.9],
  germany:        [7.5,  51.5],
  poland:         [18.6, 54.4],
  austria:        [16.4, 48.2],
  'north-sweden': [20.2, 67.9],
}

const ROUTE_DUR  = 1.4
const ROUTE_STAG = 0.42

// Timing: zoom animation ~3.7s, then routes, then 4s viewing buffer
const routesTotalMs = (destinations.length * ROUTE_STAG + ROUTE_DUR) * 1000
const ROUTES_AT_MS  = 900
const AUTO_BURST_MS = ROUTES_AT_MS + routesTotalMs + 4000

interface Props { onRevealReady: () => void }

export default function EuropeMap({ onRevealReady }: Props) {
  const [showRoutes,  setShowRoutes]  = useState(false)
  const [showMarkers, setShowMarkers] = useState(false)
  const [burst,       setBurst]       = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowRoutes(true),  ROUTES_AT_MS)
    const t2 = setTimeout(() => setShowMarkers(true), ROUTES_AT_MS + routesTotalMs)
    const t3 = setTimeout(() => setBurst(true),       AUTO_BURST_MS)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (!burst) return
    const t = setTimeout(onRevealReady, 1100)
    return () => clearTimeout(t)
  }, [burst, onRevealReady])

  // CSS transform-origin as % of the SVG for the zoom-out
  const oxPct = `${((ORIGIN[0] / MAP_W) * 100).toFixed(1)}%`
  const oyPct = `${((ORIGIN[1] / MAP_H) * 100).toFixed(1)}%`

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-void">
      {/* Header */}
      <motion.div
        className="text-center pt-12 pb-5 px-6 z-10 flex-shrink-0"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-crimson/50 font-body font-semibold mb-2">
          The big reveal
        </p>
        <h1 className="font-display text-3xl md:text-5xl text-cream font-semibold">
          Where are we going?
        </h1>
      </motion.div>

      {/* Map container */}
      <div className="relative flex-1 w-full max-w-5xl mx-auto px-3 pb-4 flex flex-col">
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-wine/20 flex-1"
          style={{ minHeight: 0 }}
        >
          {/* Dark ocean background */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #0C021A 0%, #06020E 100%)' }}
          />

          {/* Geographic map — CSS scale zoom-out from Linköping (instant, no tile loading) */}
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: `${oxPct} ${oyPct}` }}
            initial={{ scale: 5.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3.5, ease: [0.3, 0, 0.12, 1], delay: 0.25 }}
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ center: [MAP_CX, MAP_CY], scale: MAP_SCALE }}
              width={MAP_W}
              height={MAP_H}
              style={{ width: '100%', height: '100%', display: 'block' }}
            >
              <defs>
                <filter id="rg" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="og" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <linearGradient id="cf" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#221028" />
                  <stop offset="100%" stopColor="#160A20" />
                </linearGradient>
                <linearGradient id="df" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2D0A18" />
                  <stop offset="100%" stopColor="#1E0612" />
                </linearGradient>
              </defs>

              {/* Country fills */}
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies
                    .filter(geo => EU_IDS.has(Number(geo.id)))
                    .map(geo => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={DEST_IDS.has(Number(geo.id)) ? 'url(#df)' : 'url(#cf)'}
                        stroke={DEST_IDS.has(Number(geo.id)) ? '#5C1228' : '#2D0A1A'}
                        strokeWidth={0.6}
                        style={{
                          default: { outline: 'none' },
                          hover:   { outline: 'none' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    ))
                }
              </Geographies>

              {/* Animated dashed route arcs */}
              {showRoutes && destinations.map((dest, i) => {
                const [dx, dy] = project(...(DEST_COORDS[dest.id] as [number, number]))
                const [sx, sy] = ORIGIN
                const mx = (sx + dx) / 2 + (dy - sy) * 0.22
                const my = (sy + dy) / 2 - Math.abs(dx - sx) * 0.16
                return (
                  <g key={dest.id}>
                    <motion.path
                      d={`M${sx},${sy} Q${mx},${my} ${dx},${dy}`}
                      stroke="#C41E3A"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="6 5"
                      filter="url(#rg)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.92 }}
                      transition={{
                        pathLength: { duration: ROUTE_DUR, delay: i * ROUTE_STAG, ease: 'easeOut' },
                        opacity:    { duration: 0.4, delay: i * ROUTE_STAG },
                      }}
                    />
                    {/* Heart tip — pops in as the route line arrives */}
                    <motion.path
                      d={heartPath(dx, dy - 6, 5)}
                      fill="#C41E3A"
                      filter="url(#rg)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{ transformOrigin: `${dx}px ${dy - 6}px` }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 14,
                        delay: i * ROUTE_STAG + ROUTE_DUR - 0.05,
                      }}
                    />
                  </g>
                )
              })}

              {/* Destination labels — appear after all routes finish */}
              {showMarkers && destinations.map((dest, i) => {
                const [dx, dy] = project(...(DEST_COORDS[dest.id] as [number, number]))
                const above = dest.id === 'north-sweden'
                return (
                  <motion.g
                    key={dest.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    style={{ transformOrigin: `${dx}px ${dy}px` }}
                  >
                    <text
                      x={dx} y={above ? dy - 18 : dy + 12}
                      fontSize="13" textAnchor="middle"
                    >{dest.flag}</text>
                    <text
                      x={dx} y={above ? dy - 6 : dy + 23}
                      fontSize="7" fill="#FF9DB2" fillOpacity="0.85"
                      fontFamily="Georgia, serif" fontStyle="italic" textAnchor="middle"
                    >{dest.city}</text>
                  </motion.g>
                )
              })}

              {/* Origin — Linköping pulsing dot */}
              <motion.circle
                cx={ORIGIN[0]} cy={ORIGIN[1]} r={5}
                fill="#C41E3A" filter="url(#og)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, delay: 0.3 }}
                style={{ transformOrigin: `${ORIGIN[0]}px ${ORIGIN[1]}px` }}
              />
              <motion.circle
                cx={ORIGIN[0]} cy={ORIGIN[1]} r={9}
                fill="none" stroke="#C41E3A" strokeWidth="1.6"
                initial={{ scale: 0.4, opacity: 0.9 }}
                animate={{ scale: 3.2, opacity: 0 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                style={{ transformOrigin: `${ORIGIN[0]}px ${ORIGIN[1]}px` }}
              />
              <text
                x={ORIGIN[0] + 13} y={ORIGIN[1] - 9}
                fontSize="8.5" fill="#E63950" fillOpacity="0.8"
                fontFamily="Georgia, serif" fontStyle="italic"
              >Linköping</text>
            </ComposableMap>
          </motion.div>

          <div className="absolute bottom-3 left-4 text-[10px] font-body italic text-crimson/25 pointer-events-none z-10">
            Starting from Linköping, Sweden
          </div>
        </div>
      </div>

      {/* Burst rings → void → transition to postcards (automatic, no button) */}
      <AnimatePresence>
        {burst && (
          <>
            {[0, 0.08, 0.17, 0.27, 0.4].map((delay, i) => (
              <motion.div
                key={i}
                className="fixed rounded-full border-[1.5px] border-crimson pointer-events-none z-50"
                style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
                initial={{ width: 0, height: 0, opacity: 0.85 }}
                animate={{ width: '300vmax', height: '300vmax', opacity: 0 }}
                transition={{ duration: 0.85, delay, ease: [0.2, 0.8, 0.3, 1] }}
              />
            ))}
            <motion.div
              className="fixed inset-0 bg-void pointer-events-none z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.5 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
