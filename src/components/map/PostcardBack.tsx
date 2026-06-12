'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type { Destination } from '@/lib/types'

// Stamp accent colours per destination
const STAMP_COLORS: Record<string, { bg: string; text: string; mark: string }> = {
  england:        { bg: '#4A5568', text: '#F0EAD6', mark: '#C8102E' },
  france:         { bg: '#5C4A6B', text: '#FFF8E7', mark: '#002395' },
  germany:        { bg: '#3D4A56', text: '#F5F0E8', mark: '#D4A853' },
  poland:         { bg: '#6B3D3D', text: '#FFF5F0', mark: '#DC143C' },
  austria:        { bg: '#6B4A5C', text: '#FFF8F5', mark: '#C8102E' },
  'north-sweden': { bg: '#2A3A56', text: '#F0F5FF', mark: '#006AA7' },
}

const RATING_BARS = [
  { key: 'food',       label: 'Food & GF',     color: '#D4A853' },
  { key: 'culture',    label: 'Culture',        color: '#C41E3A' },
  { key: 'activities', label: 'Activities',     color: '#E63950' },
  { key: 'romance',    label: 'Romance',        color: '#FF9DB2' },
  { key: 'ease',       label: 'Ease',           color: '#FF6B4A' },
] as const

interface Props {
  destination: Destination
  onClose: () => void
}

export default function PostcardBack({ destination, onClose }: Props) {
  const router = useRouter()
  const stamp = STAMP_COLORS[destination.id] ?? STAMP_COLORS['england']

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden select-none"
      style={{ background: '#F0DFB8', fontFamily: 'Georgia, serif' }}
    >
      {/* ── Airmail border stripes (4 edges) ── */}
      <div className="absolute inset-0 pointer-events-none z-10 rounded-xl overflow-hidden">
        {/* Top stripe */}
        <div className="absolute top-0 left-0 right-0 h-3" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #C8102E 0, #C8102E 10px, #fff 10px, #fff 14px, #1235A3 14px, #1235A3 24px, #fff 24px, #fff 28px)' }} />
        {/* Bottom stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-3" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #C8102E 0, #C8102E 10px, #fff 10px, #fff 14px, #1235A3 14px, #1235A3 24px, #fff 24px, #fff 28px)' }} />
        {/* Left stripe */}
        <div className="absolute top-0 bottom-0 left-0 w-3" style={{ backgroundImage: 'repeating-linear-gradient(180deg, #C8102E 0, #C8102E 10px, #fff 10px, #fff 14px, #1235A3 14px, #1235A3 24px, #fff 24px, #fff 28px)' }} />
        {/* Right stripe */}
        <div className="absolute top-0 bottom-0 right-0 w-3" style={{ backgroundImage: 'repeating-linear-gradient(180deg, #C8102E 0, #C8102E 10px, #fff 10px, #fff 14px, #1235A3 14px, #1235A3 24px, #fff 24px, #fff 28px)' }} />
      </div>

      {/* Inner content — padded inside the airmail border */}
      <div className="absolute inset-3 flex flex-col overflow-hidden">

        {/* ── Top bar: PAR AVION label + stamp area ── */}
        <div className="flex items-start justify-between mb-2 flex-shrink-0">
          <div className="flex flex-col">
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded"
              style={{ background: '#1235A3', width: 'fit-content' }}
            >
              <span style={{ color: '#fff', fontSize: 7, fontStyle: 'italic', fontWeight: 700, letterSpacing: '0.2em' }}>✈ PAR AVION</span>
            </div>
            <span style={{ fontSize: 6, color: '#9A7A5A', letterSpacing: '0.15em', marginTop: 2 }}>BY AIR MAIL</span>
          </div>

          {/* Stamp */}
          <div
            className="relative flex-shrink-0 rounded overflow-hidden"
            style={{
              width: 52, height: 64,
              border: '2px solid #A08060',
              background: stamp.bg,
              boxShadow: '1px 1px 4px rgba(0,0,0,0.3)',
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-0.5 px-1">
              <span style={{ fontSize: 18 }}>{destination.flag}</span>
              <span style={{ fontSize: 6, color: stamp.text, fontWeight: 700, textAlign: 'center', lineHeight: 1.1, letterSpacing: '0.05em' }}>
                {destination.city.toUpperCase()}
              </span>
              <span style={{ fontSize: 5, color: stamp.text + 'AA', letterSpacing: '0.1em' }}>
                {new Date().getFullYear()}
              </span>
            </div>
            {/* Perforated edge dots */}
            {[...Array(7)].map((_, i) => (
              <div key={`t${i}`} className="absolute top-[-3px] rounded-full bg-[#F0DFB8]"
                style={{ width: 5, height: 5, left: i * 8 - 1 }} />
            ))}
            {[...Array(7)].map((_, i) => (
              <div key={`b${i}`} className="absolute bottom-[-3px] rounded-full bg-[#F0DFB8]"
                style={{ width: 5, height: 5, left: i * 8 - 1 }} />
            ))}
            {/* Postmark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'rotate(-20deg)' }}>
              <div className="rounded-full border-2 w-10 h-10 flex items-center justify-center"
                style={{ borderColor: stamp.mark + '99', borderStyle: 'dashed' }}>
                <span style={{ fontSize: 5, color: stamp.mark + 'BB', fontWeight: 700, textAlign: 'center', letterSpacing: '0.1em' }}>
                  {destination.city.toUpperCase().slice(0, 3)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Thin horizontal divider ── */}
        <div className="flex-shrink-0 border-t border-[#C8B090] mb-2" />

        {/* ── Main body: left message | right address ── */}
        <div className="flex gap-3 flex-1 min-h-0">

          {/* LEFT — Message / details (60%) */}
          <div className="flex flex-col flex-1 min-w-0 overflow-y-auto pr-2" style={{ scrollbarWidth: 'none' }}>
            {/* Description in handwriting */}
            <p style={{
              fontFamily: 'var(--font-caveat), cursive',
              fontSize: 'clamp(10px, 2vw, 13px)',
              color: '#3D2B1F',
              lineHeight: 1.55,
              marginBottom: 8,
              borderBottom: '1px solid #D4B896',
              paddingBottom: 6,
            }}>
              {destination.description}
            </p>

            {/* Rating bars */}
            <div className="mb-3">
              <div style={{ fontSize: 7, color: '#9A7A5A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
                At a glance
              </div>
              {RATING_BARS.map(({ key, label, color }) => (
                <div key={key} className="flex items-center gap-2 mb-1">
                  <span style={{ fontSize: 8, color: '#7A5C3A', width: 52, flexShrink: 0, fontStyle: 'italic' }}>{label}</span>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: '#D4B89044' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${destination.ratings[key]}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + RATING_BARS.findIndex(r => r.key === key) * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                  <span style={{ fontSize: 8, color: '#9A7A5A', width: 20 }}>{destination.ratings[key]}</span>
                </div>
              ))}
            </div>

            {/* Activities */}
            <div className="mb-3">
              <div style={{ fontSize: 7, color: '#9A7A5A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 3 }}>
                Things to do
              </div>
              {destination.activities.slice(0, 4).map((a) => (
                <div key={a} className="flex items-start gap-1.5 mb-0.5">
                  <span style={{ color: '#C41E3A', fontSize: 7, marginTop: 1, flexShrink: 0 }}>✦</span>
                  <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: 'clamp(9px, 1.8vw, 12px)', color: '#5A3A2A', lineHeight: 1.3 }}>{a}</span>
                </div>
              ))}
            </div>

            {/* Food */}
            <div className="mb-3">
              <div style={{ fontSize: 7, color: '#9A7A5A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 3 }}>
                Where to eat
              </div>
              {destination.foodHighlights.slice(0, 3).map((f) => (
                <div key={f} className="flex items-start gap-1.5 mb-0.5">
                  <span style={{ color: '#D4A853', fontSize: 7, marginTop: 1, flexShrink: 0 }}>✦</span>
                  <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: 'clamp(9px, 1.8vw, 12px)', color: '#5A3A2A', lineHeight: 1.3 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Language guide */}
            <div className="mb-3 p-2 rounded" style={{ background: '#E8D4A880', border: '1px solid #C8B090' }}>
              <div style={{ fontSize: 7, color: '#9A7A5A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 3 }}>
                {destination.languageGuide.language} phrases
              </div>
              <div className="flex flex-col gap-1">
                <div>
                  <span style={{ fontSize: 7, color: '#7A5C3A', fontStyle: 'italic' }}>Gluten free: </span>
                  <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: 12, color: '#3D2B1F', fontWeight: 700 }}>
                    {destination.languageGuide.glutenFree}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: 7, color: '#7A5C3A', fontStyle: 'italic' }}>Without nuts: </span>
                  <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: 12, color: '#3D2B1F', fontWeight: 700 }}>
                    {destination.languageGuide.withoutNuts}
                  </span>
                </div>
                {destination.languageGuide.phonetic && (
                  <div style={{ fontSize: 8, color: '#9A7A5A', fontStyle: 'italic' }}>
                    {destination.languageGuide.phonetic}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="flex-shrink-0 w-px border-l border-dashed border-[#C8B090]" />

          {/* RIGHT — Address block (40%) */}
          <div className="flex flex-col justify-between" style={{ width: '38%', flexShrink: 0 }}>
            {/* Address lines */}
            <div className="flex flex-col gap-1">
              <div style={{ fontSize: 7, color: '#9A7A5A', letterSpacing: '0.15em', marginBottom: 2 }}>To:</div>
              <div style={{
                fontFamily: 'var(--font-caveat), cursive',
                fontSize: 16,
                color: '#3D2B1F',
                fontWeight: 700,
                lineHeight: 1.2,
                borderBottom: '1px solid #C8B090',
                paddingBottom: 3,
                marginBottom: 4,
              }}>
                Adelin ♡
              </div>
              {/* Ruled lines */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-b border-[#C8B09044]" style={{ height: 14 }} />
              ))}
            </div>

            {/* Destination name at bottom + CTA */}
            <div className="flex flex-col gap-2 mt-3">
              <div
                className="text-center py-1 px-2 rounded"
                style={{ background: '#D4B890', border: '1px solid #B89870' }}
              >
                <div style={{ fontSize: 8, color: '#5A3A2A', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {destination.name}
                </div>
                <div style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: 13, color: '#3D2B1F', fontWeight: 700 }}>
                  {destination.city}
                </div>
              </div>

              <motion.button
                onClick={() => router.push(`/reveal?dest=${destination.id}`)}
                className="w-full py-2 px-3 rounded text-center font-semibold uppercase tracking-wide transition-all"
                style={{
                  fontSize: 9,
                  background: '#C41E3A',
                  color: '#FFF8F0',
                  letterSpacing: '0.12em',
                  border: 'none',
                  fontFamily: 'var(--font-space-grotesk), system-ui',
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 0 16px #C41E3A60' }}
                whileTap={{ scale: 0.97 }}
              >
                Choose {destination.city} ✦
              </motion.button>

              <button
                onClick={onClose}
                className="w-full py-1 text-center transition-opacity hover:opacity-70"
                style={{ fontSize: 8, color: '#9A7A5A', letterSpacing: '0.1em', background: 'none', border: 'none' }}
              >
                ← back to all destinations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
