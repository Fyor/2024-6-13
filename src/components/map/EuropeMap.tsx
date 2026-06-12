'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { destinations } from '@/data/destinations'

// ── Constants ─────────────────────────────────────────────────────────────────
const ORIGIN_LL   = [58.4, 15.6] as const   // Linköping
const EUROPE_LL   = [54.5, 11.0] as const   // centre of Europe view
const EUROPE_ZOOM = 4.4

const DEST_LL: Record<string, readonly [number, number]> = {
  england:        [51.5, -0.1],
  france:         [48.9,  2.4],
  germany:        [51.5,  7.5],
  poland:         [50.1, 19.9],
  austria:        [48.2, 16.4],
  'north-sweden': [67.9, 20.2],
}

const ROUTE_DUR  = 1.4    // seconds each route draws
const ROUTE_STAG = 0.42   // seconds stagger between routes
const routesTotalMs = (destinations.length * ROUTE_STAG + ROUTE_DUR) * 1000
// Timing: 400ms pause → 3.5s fly → 300ms settle → routes → markers → 4s viewing → burst
const ROUTES_AT_MS  = 4300
const AUTO_BURST_MS = ROUTES_AT_MS + routesTotalMs + 4000

interface Pt { x: number; y: number }
interface RoutePt { sx: number; sy: number; dx: number; dy: number }

interface Props { onRevealReady: () => void }

export default function EuropeMap({ onRevealReady }: Props) {
  const mapDivRef  = useRef<HTMLDivElement>(null)
  const leafletRef = useRef<any>(null)

  const [svgSize,     setSvgSize]     = useState({ w: 0, h: 0 })
  const [routePts,    setRoutePts]    = useState<RoutePt[]>([])
  const [originPt,    setOriginPt]    = useState<Pt | null>(null)
  const [showRoutes,  setShowRoutes]  = useState(false)
  const [showMarkers, setShowMarkers] = useState(false)
  const [burst,       setBurst]       = useState(false)

  // Convert lat/lon → pixel coords inside the map container
  const computeOverlay = useCallback(() => {
    const map = leafletRef.current
    if (!map) return
    const el  = map.getContainer() as HTMLElement
    setSvgSize({ w: el.offsetWidth, h: el.offsetHeight })
    const op = map.latLngToContainerPoint(ORIGIN_LL as [number, number])
    setOriginPt({ x: op.x, y: op.y })
    setRoutePts(
      destinations.map(dest => {
        const dp = map.latLngToContainerPoint(DEST_LL[dest.id] as [number, number])
        return { sx: op.x, sy: op.y, dx: dp.x, dy: dp.y }
      })
    )
  }, [])

  useEffect(() => {
    if (!mapDivRef.current) return
    let alive = true
    const timers: ReturnType<typeof setTimeout>[] = []

    ;(async () => {
      // Leaflet must only run in the browser
      const L = (await import('leaflet')).default
      if (!alive) return

      const map = L.map(mapDivRef.current!, {
        center:            ORIGIN_LL as [number, number],
        zoom:              11,
        zoomControl:       false,
        attributionControl: true,
        scrollWheelZoom:   false,
        dragging:          false,
        touchZoom:         false,
        doubleClickZoom:   false,
        keyboard:          false,
      })

      // CartoDB Dark Matter — free, no API key, crisp dark cartographic style
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://openstreetmap.org/copyright" style="color:#C41E3A55">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" style="color:#C41E3A55">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        }
      ).addTo(map)

      leafletRef.current = map

      // Fly out from Linköping close-up → full Europe view
      timers.push(setTimeout(() => {
        if (!alive) return
        map.flyTo(EUROPE_LL as [number, number], EUROPE_ZOOM, {
          animate: true,
          duration: 3.5,
          easeLinearity: 0.12,
        })
      }, 400))

      // Routes appear once map settles
      timers.push(setTimeout(() => {
        if (!alive) return
        computeOverlay()
        setShowRoutes(true)
      }, ROUTES_AT_MS))

      // Markers after all routes drawn
      timers.push(setTimeout(() => {
        if (!alive) return
        setShowMarkers(true)
      }, ROUTES_AT_MS + routesTotalMs))

      // Burst → void fill → transition to postcards
      timers.push(setTimeout(() => {
        if (!alive) return
        setBurst(true)
      }, AUTO_BURST_MS))
    })()

    return () => {
      alive = false
      timers.forEach(clearTimeout)
      if (leafletRef.current) {
        leafletRef.current.remove()
        leafletRef.current = null
      }
    }
  }, [computeOverlay])

  useEffect(() => {
    if (!burst) return
    const t = setTimeout(onRevealReady, 1100)
    return () => clearTimeout(t)
  }, [burst, onRevealReady])

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

      {/* Map + overlay */}
      <div className="relative flex-1 w-full max-w-5xl mx-auto px-3 pb-4 flex flex-col">
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-wine/20 flex-1"
          style={{ minHeight: 480 }}
        >
          {/* Leaflet mount point */}
          <div ref={mapDivRef} className="absolute inset-0" />

          {/* SVG overlay — route lines + markers drawn on top of tiles */}
          {showRoutes && svgSize.w > 0 && (
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 400 }}
              width={svgSize.w}
              height={svgSize.h}
            >
              <defs>
                <filter id="rg" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="og" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Dashed arc routes */}
              {routePts.map((c, i) => {
                const mx = (c.sx + c.dx) / 2 + (c.dy - c.sy) * 0.18
                const my = (c.sy + c.dy) / 2 - Math.abs(c.dx - c.sx) * 0.14
                return (
                  <motion.path
                    key={destinations[i].id}
                    d={`M${c.sx},${c.sy} Q${mx},${my} ${c.dx},${c.dy}`}
                    stroke="#C41E3A"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="7 5"
                    filter="url(#rg)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.9 }}
                    transition={{
                      pathLength: { duration: ROUTE_DUR, delay: i * ROUTE_STAG, ease: 'easeOut' },
                      opacity:    { duration: 0.4,      delay: i * ROUTE_STAG },
                    }}
                  />
                )
              })}

              {/* Destination markers */}
              {showMarkers && routePts.map((c, i) => {
                const dest  = destinations[i]
                const above = dest.id === 'north-sweden'
                return (
                  <motion.g
                    key={dest.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 16, delay: i * 0.1 }}
                    style={{ transformOrigin: `${c.dx}px ${c.dy}px` }}
                  >
                    <circle cx={c.dx} cy={c.dy} r={5} fill="#C41E3A" filter="url(#og)" />
                    <text
                      x={c.dx + 9} y={above ? c.dy - 8 : c.dy + 12}
                      fontSize="9" fill="#FF9DB2" fillOpacity="0.9"
                      fontFamily="Georgia, serif" fontStyle="italic"
                    >{dest.city}</text>
                  </motion.g>
                )
              })}

              {/* Origin — Linköping pulsing dot */}
              {originPt && (
                <>
                  <motion.circle
                    cx={originPt.x} cy={originPt.y} r={5}
                    fill="#C41E3A" filter="url(#og)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, delay: 0.1 }}
                    style={{ transformOrigin: `${originPt.x}px ${originPt.y}px` }}
                  />
                  <motion.circle
                    cx={originPt.x} cy={originPt.y} r={9}
                    fill="none" stroke="#C41E3A" strokeWidth="1.8"
                    initial={{ scale: 0.4, opacity: 0.9 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
                    style={{ transformOrigin: `${originPt.x}px ${originPt.y}px` }}
                  />
                  <text
                    x={originPt.x + 13} y={originPt.y - 9}
                    fontSize="9" fill="#E63950" fillOpacity="0.8"
                    fontFamily="Georgia, serif" fontStyle="italic"
                  >Linköping</text>
                </>
              )}
            </svg>
          )}

          <div className="absolute bottom-3 left-4 text-[10px] font-body italic text-crimson/25 pointer-events-none" style={{ zIndex: 500 }}>
            Starting from Linköping, Sweden
          </div>
        </div>
      </div>

      {/* Burst rings → void fill → triggers onRevealReady */}
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
