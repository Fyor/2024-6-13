'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { destinations } from '@/data/destinations'
import type { Destination } from '@/lib/types'
import DestinationPostcard from './DestinationPostcard'

interface EuropeMapProps {
  onSelect: (destination: Destination) => void
}

const countries = [
  { id: 'no', d: 'M455,28 L492,10 L528,20 L548,56 L534,90 L506,84 L488,62 L468,78 L455,66 Z', dest: false },
  { id: 'se', d: 'M548,56 L588,44 L616,66 L620,115 L612,165 L592,210 L568,225 L552,204 L544,158 L534,108 L534,90 Z', dest: true },
  { id: 'fi', d: 'M616,66 L655,55 L689,80 L694,142 L676,194 L646,202 L622,188 L612,165 L620,115 Z', dest: false },
  { id: 'dk', d: 'M480,200 L508,192 L518,210 L508,230 L488,234 L472,222 Z', dest: false },
  { id: 'gb-sct', d: 'M336,162 L360,140 L387,145 L395,172 L382,198 L372,198 L330,202 L334,184 Z', dest: false },
  { id: 'gb-eng', d: 'M330,202 L372,198 L398,214 L398,254 L378,272 L348,270 L322,248 L320,224 Z', dest: true },
  { id: 'ie', d: 'M290,190 L312,177 L324,197 L314,217 L290,214 Z', dest: false },
  { id: 'fr', d: 'M377,284 L437,272 L483,282 L487,312 L475,352 L457,382 L421,392 L391,382 L369,354 L365,320 Z', dest: true },
  { id: 'es', d: 'M311,400 L375,388 L421,394 L425,434 L411,494 L381,514 L341,518 L295,508 L269,470 L275,432 Z', dest: false },
  { id: 'bx', d: 'M433,248 L481,250 L479,272 L459,282 L435,272 Z', dest: false },
  { id: 'de', d: 'M459,236 L527,224 L573,234 L579,267 L567,314 L543,344 L509,350 L479,338 L453,308 L451,270 Z', dest: true },
  { id: 'ch', d: 'M457,354 L503,344 L511,358 L501,376 L461,378 L451,368 Z', dest: false },
  { id: 'at', d: 'M509,350 L567,342 L599,348 L599,364 L563,374 L529,374 L509,364 Z', dest: true },
  { id: 'cz', d: 'M509,310 L573,304 L597,314 L595,334 L563,342 L509,342 L499,326 Z', dest: false },
  { id: 'pl', d: 'M573,234 L637,230 L665,242 L661,294 L639,332 L607,342 L571,338 L551,314 L549,276 Z', dest: true },
  { id: 'baltic', d: 'M613,192 L637,170 L659,168 L665,190 L663,230 L637,230 L617,216 Z', dest: false },
  { id: 'ee', d: 'M615,170 L637,164 L659,168 L659,186 L637,190 L615,188 Z', dest: false },
  { id: 'it', d: 'M457,380 L503,372 L543,388 L553,414 L541,450 L527,494 L507,534 L495,538 L487,517 L491,480 L497,447 L487,414 L469,404 Z', dest: false },
  { id: 'hu', d: 'M567,374 L637,362 L659,382 L649,422 L619,437 L583,432 L559,412 L555,390 Z', dest: false },
  { id: 'ua', d: 'M637,192 L697,194 L717,216 L711,310 L681,332 L657,340 L637,322 L639,292 L659,268 L661,242 L637,230 Z', dest: false },
  { id: 'ro', d: 'M637,322 L681,332 L691,354 L671,378 L643,382 L627,368 L631,342 Z', dest: false },
]

const ORIGIN = { x: 550, y: 108 }

function coordFromPercent(x: string, y: string) {
  return { x: (parseFloat(x) / 100) * 1000, y: (parseFloat(y) / 100) * 600 }
}

function getRoutePath(dest: Destination) {
  const end = coordFromPercent(dest.mapCoords.x, dest.mapCoords.y)
  const mx = (ORIGIN.x + end.x) / 2 + (end.y - ORIGIN.y) * 0.15
  const my = (ORIGIN.y + end.y) / 2 - Math.abs(end.x - ORIGIN.x) * 0.12
  return `M ${ORIGIN.x},${ORIGIN.y} Q ${mx},${my} ${end.x},${end.y}`
}

const ROUTE_DURATION = 1.4
const ROUTE_STAGGER = 0.5
const POSTCARDS_DELAY_MS = (destinations.length * ROUTE_STAGGER + ROUTE_DURATION + 0.5) * 1000

export default function EuropeMap({ onSelect }: EuropeMapProps) {
  const [showPostcards, setShowPostcards] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowPostcards(true), POSTCARDS_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-wine/20" style={{ paddingBottom: '60%' }}>
      <div className="absolute inset-0 bg-void">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full"
          aria-label="Map of Europe"
        >
          <defs>
            {/* Glow filter for route lines */}
            <filter id="route-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="origin-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Country fills — dark wine tones on void */}
          {countries.map((c) => (
            <path
              key={c.id}
              d={c.d}
              fill={c.dest ? '#2D0A18' : '#1A0510'}
              stroke="#4A1020"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          ))}

          {/* Animated route lines with glow */}
          {destinations.map((dest, i) => (
            <motion.path
              key={dest.id}
              d={getRoutePath(dest)}
              stroke="#C41E3A"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              filter="url(#route-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{
                pathLength: {
                  duration: ROUTE_DURATION,
                  delay: i * ROUTE_STAGGER,
                  ease: 'easeOut',
                },
                opacity: { duration: 0.4, delay: i * ROUTE_STAGGER },
              }}
            />
          ))}

          {/* Origin — pulsing crimson */}
          <motion.circle
            cx={ORIGIN.x}
            cy={ORIGIN.y}
            r={5}
            fill="#C41E3A"
            filter="url(#origin-glow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 280 }}
          />
          <motion.circle
            cx={ORIGIN.x}
            cy={ORIGIN.y}
            r={8}
            fill="none"
            stroke="#C41E3A"
            strokeWidth="1.5"
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
          />
          <text
            x={ORIGIN.x + 12}
            y={ORIGIN.y - 9}
            fontSize="8"
            fill="#E63950"
            fillOpacity="0.7"
            fontFamily="Georgia, serif"
            fontStyle="italic"
          >
            Gothenburg
          </text>
        </svg>

        {/* Destination postcards */}
        {destinations.map((dest, i) => (
          <DestinationPostcard
            key={dest.id}
            destination={dest}
            visible={showPostcards}
            delay={i * 0.13}
            onSelect={() => onSelect(dest)}
          />
        ))}
      </div>

      <div className="absolute bottom-3 left-4 text-[10px] font-body italic text-crimson/30 pointer-events-none">
        Starting from Gothenburg, Sweden
      </div>
    </div>
  )
}
