'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type { Destination } from '@/lib/types'
import FlagEmoji from '@/components/ui/FlagEmoji'

const STAMP_THEMES: Record<string, { bg: string; text: string; mark: string }> = {
  england:        { bg: '#3D4A5C', text: '#F0EAD6', mark: '#C8102E' },
  france:         { bg: '#4A3D5A', text: '#FFF8E7', mark: '#002395' },
  germany:        { bg: '#2D3A46', text: '#F5F0E8', mark: '#D4A853' },
  poland:         { bg: '#5A2D2D', text: '#FFF5F0', mark: '#DC143C' },
  austria:        { bg: '#5A3D4A', text: '#FFF8F5', mark: '#C8102E' },
  'north-sweden': { bg: '#1E2E48', text: '#F0F5FF', mark: '#006AA7' },
}

const BARS = [
  { key: 'food',       label: 'Food & GF',  color: '#D4A853' },
  { key: 'culture',    label: 'Culture',    color: '#C41E3A' },
  { key: 'activities', label: 'Activities', color: '#E63950' },
  { key: 'romance',    label: 'Romance',    color: '#FF9DB2' },
  { key: 'ease',       label: 'Ease',       color: '#FF6B4A' },
] as const

interface Props { destination: Destination; onClose: () => void }

export default function PostcardBack({ destination, onClose }: Props) {
  const router = useRouter()
  const stamp  = STAMP_THEMES[destination.id] ?? STAMP_THEMES.england

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden"
      style={{ background: '#EFD9A8', fontFamily: 'Georgia, serif' }}
    >
      {/* ── Botanical watermark — very faint centred flower ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.055, zIndex: 0 }}>
        <svg width="220" height="220" viewBox="-110 -110 220 220" aria-hidden="true">
          {[0,1,2,3,4].map(i => (
            <ellipse key={`op${i}`} cx={0} cy={-58} rx={20} ry={46}
              transform={`rotate(${i * 72})`} fill="#8A6A3A" />
          ))}
          {[0,1,2,3,4].map(i => (
            <ellipse key={`ip${i}`} cx={0} cy={-38} rx={13} ry={28}
              transform={`rotate(${i * 72 + 36})`} fill="#8A6A3A" opacity={0.6} />
          ))}
          <circle cx={0} cy={0} r={16} fill="#C0A070" />
          {[0,1,2,3,4,5].map(i => (
            <ellipse key={`l${i}`} cx={0} cy={-80} rx={7} ry={16}
              transform={`rotate(${i * 60 + 10})`} fill="#6A8A5A" opacity={0.5} />
          ))}
        </svg>
      </div>

      {/* ── Airmail border stripes ── */}
      <div className="absolute inset-0 pointer-events-none z-10 rounded-xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-4" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #C8102E 0,#C8102E 14px,#fff 14px,#fff 18px,#1235A3 18px,#1235A3 32px,#fff 32px,#fff 36px)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-4" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #C8102E 0,#C8102E 14px,#fff 14px,#fff 18px,#1235A3 18px,#1235A3 32px,#fff 32px,#fff 36px)' }} />
        <div className="absolute top-0 bottom-0 left-0 w-4" style={{ backgroundImage: 'repeating-linear-gradient(180deg, #C8102E 0,#C8102E 14px,#fff 14px,#fff 18px,#1235A3 18px,#1235A3 32px,#fff 32px,#fff 36px)' }} />
        <div className="absolute top-0 bottom-0 right-0 w-4" style={{ backgroundImage: 'repeating-linear-gradient(180deg, #C8102E 0,#C8102E 14px,#fff 14px,#fff 18px,#1235A3 18px,#1235A3 32px,#fff 32px,#fff 36px)' }} />
      </div>

      {/* ── Inner layout (inside the stripe border) ── */}
      <div className="absolute inset-4 flex flex-col overflow-hidden">

        {/* TOP ROW: Par Avion label  |  space  |  Stamp */}
        <div className="flex items-start justify-between mb-3 flex-shrink-0">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded" style={{ background: '#1235A3', width: 'fit-content' }}>
              <span style={{ color: '#fff', fontSize: 11, fontStyle: 'italic', fontWeight: 700, letterSpacing: '0.18em' }}>✈  PAR AVION</span>
            </div>
            <span style={{ fontSize: 9, color: '#8A6A3A', letterSpacing: '0.18em', marginTop: 2 }}>BY AIR MAIL</span>
          </div>

          {/* Stamp */}
          <div
            className="relative flex-shrink-0 rounded overflow-hidden"
            style={{ width: 80, height: 96, border: '2px solid #9A7050', background: stamp.bg, boxShadow: '2px 2px 8px rgba(0,0,0,0.35)' }}
          >
            {/* Perforations top */}
            {[...Array(9)].map((_,i) => (
              <div key={`t${i}`} className="absolute top-[-4px] rounded-full bg-[#EFD9A8]" style={{ width:7, height:7, left: i*9-1 }} />
            ))}
            {[...Array(9)].map((_,i) => (
              <div key={`b${i}`} className="absolute bottom-[-4px] rounded-full bg-[#EFD9A8]" style={{ width:7, height:7, left: i*9-1 }} />
            ))}
            <div className="flex flex-col items-center justify-center h-full gap-1 px-2">
              <FlagEmoji flag={destination.flag} size={28} />
              <span style={{ fontSize: 9, color: stamp.text, fontWeight: 700, textAlign: 'center', letterSpacing: '0.06em', lineHeight: 1.2 }}>
                {destination.city.toUpperCase()}
              </span>
              <span style={{ fontSize: 8, color: stamp.text + '99', letterSpacing: '0.1em' }}>2026</span>
            </div>
            {/* Postmark circle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'rotate(-22deg)' }}>
              <div className="rounded-full border-[2.5px] w-14 h-14 flex items-center justify-center"
                style={{ borderColor: stamp.mark + 'BB', borderStyle: 'dashed' }}>
                <span style={{ fontSize: 8, color: stamp.mark + 'CC', fontWeight: 700, letterSpacing: '0.1em' }}>
                  {destination.city.slice(0,4).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* HORIZONTAL DIVIDER */}
        <div className="flex-shrink-0 border-t border-[#C0A070] mb-3" />

        {/* MAIN BODY: left message | divider | right address */}
        <div className="flex gap-4 flex-1 min-h-0">

          {/* ── LEFT: Message content (60%) ── */}
          <div className="flex flex-col flex-1 min-w-0 overflow-y-auto pr-2" style={{ scrollbarWidth: 'none' }}>
            {/* Handwritten description */}
            <p style={{
              fontFamily: 'var(--font-caveat), cursive',
              fontSize: 'clamp(14px, 2vw, 18px)',
              color: '#2A1A0E',
              lineHeight: 1.6,
              marginBottom: 12,
              paddingBottom: 10,
              borderBottom: '1px solid #C0A07088',
            }}>
              {destination.description}
            </p>

            {/* Activities */}
            <div className="mb-3">
              <p style={{ fontSize: 10, color: '#8A6A3A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 5 }}>
                Things to do
              </p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                {destination.activities.slice(0, 6).map(a => (
                  <div key={a} className="flex items-start gap-1.5">
                    <span style={{ color: '#C41E3A', fontSize: 9, marginTop: 2, flexShrink: 0 }}>✶</span>
                    <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: 'clamp(12px, 1.6vw, 15px)', color: '#3A2010', lineHeight: 1.35 }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Food */}
            <div className="mb-3">
              <p style={{ fontSize: 10, color: '#8A6A3A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 5 }}>
                Where to eat
              </p>
              {destination.foodHighlights.slice(0, 3).map(f => (
                <div key={f} className="flex items-start gap-1.5 mb-1">
                  <span style={{ color: '#D4A853', fontSize: 9, marginTop: 2, flexShrink: 0 }}>✶</span>
                  <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: 'clamp(12px, 1.6vw, 15px)', color: '#3A2010', lineHeight: 1.35 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Language */}
            <div className="p-3 rounded-lg" style={{ background: '#E0C88066', border: '1px solid #C0A07088' }}>
              <p style={{ fontSize: 10, color: '#8A6A3A', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 5 }}>
                {destination.languageGuide.language} phrases
              </p>
              <div className="flex flex-col gap-1.5">
                <div>
                  <span style={{ fontSize: 11, color: '#6A4A2A', fontStyle: 'italic' }}>Gluten free: </span>
                  <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: 18, color: '#1E0E04', fontWeight: 700 }}>
                    {destination.languageGuide.glutenFree}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: '#6A4A2A', fontStyle: 'italic' }}>Without nuts: </span>
                  <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: 18, color: '#1E0E04', fontWeight: 700 }}>
                    {destination.languageGuide.withoutNuts}
                  </span>
                </div>
                {destination.languageGuide.phonetic && (
                  <span style={{ fontSize: 10, color: '#8A6A3A', fontStyle: 'italic', marginTop: 2 }}>
                    {destination.languageGuide.phonetic}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Vertical dashed divider */}
          <div className="flex-shrink-0 w-px border-l border-dashed border-[#C0A070]" />

          {/* ── RIGHT: Address block (38%) ── */}
          <div className="flex flex-col justify-between" style={{ width: '36%', flexShrink: 0 }}>
            {/* "To:" block */}
            <div>
              <p style={{ fontSize: 12, color: '#8A6A3A', letterSpacing: '0.18em', marginBottom: 4 }}>To:</p>
              <div className="relative" style={{ borderBottom: '1.5px solid #C0A070', paddingBottom: 6, marginBottom: 10 }}>
                <p style={{
                  fontFamily: 'var(--font-caveat), cursive',
                  fontSize: 'clamp(24px, 3.5vw, 36px)',
                  color: '#1E0E04',
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}>
                  Adelin ♡
                </p>
                {/* Tiny white flower beside the name */}
                <svg className="absolute bottom-2 right-0" width="22" height="22" viewBox="-11 -11 22 22" aria-hidden="true" style={{ opacity: 0.45 }}>
                  {[0,1,2,3,4].map(i => (
                    <ellipse key={i} cx={0} cy={-6} rx={2.4} ry={4.5}
                      transform={`rotate(${i * 72})`} fill="#8A6A3A" />
                  ))}
                  <circle cx={0} cy={0} r={2} fill="#C0A070" />
                </svg>
              </div>
              {/* Ruled address lines */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-b border-[#C0A07055]" style={{ height: 20, marginBottom: 2 }} />
              ))}
              {/* Mini rating bars */}
              <div className="mt-3">
                {BARS.map(({ key, label, color }, idx) => (
                  <div key={key} className="flex items-center gap-1.5 mb-1.5">
                    <span style={{ fontSize: 9, color: '#9A7A4A', width: 52, flexShrink: 0, fontStyle: 'italic' }}>{label}</span>
                    <div className="flex-1 rounded-full" style={{ height: 3, background: '#D4B89044' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: color, opacity: 0.6 }}
                        initial={{ width: 0 }}
                        animate={{ width: `${destination.ratings[key]}%` }}
                        transition={{ duration: 0.9, delay: 0.3 + idx * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination + CTA */}
            <div className="flex flex-col gap-3 mt-4">
              <div
                className="text-center rounded-lg py-2 px-3"
                style={{ background: '#D4B888', border: '1px solid #B89A60' }}
              >
                <p style={{ fontSize: 11, color: '#4A2A10', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  {destination.name}
                </p>
                <p style={{
                  fontFamily: 'var(--font-caveat), cursive',
                  fontSize: 'clamp(20px, 2.5vw, 28px)',
                  color: '#1E0E04',
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}>
                  {destination.city}
                </p>
                <p style={{ fontStyle: 'italic', fontSize: 10, color: '#7A5A30', marginTop: 2 }}>
                  {destination.tagline}
                </p>
              </div>

              <motion.button
                onClick={() => router.push(`/reveal?dest=${destination.id}`)}
                className="w-full py-3 rounded-xl font-semibold uppercase transition-all"
                style={{
                  fontSize: 'clamp(10px, 1.4vw, 13px)',
                  letterSpacing: '0.14em',
                  background: '#C41E3A',
                  color: '#FFF8F0',
                  fontFamily: 'var(--font-space-grotesk), system-ui',
                  border: 'none',
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 0 24px #C41E3A70' }}
                whileTap={{ scale: 0.97 }}
              >
                Choose {destination.city} ✶
              </motion.button>

              <button
                onClick={onClose}
                style={{
                  fontSize: 11, color: '#8A6A3A', letterSpacing: '0.12em',
                  background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'center', textDecoration: 'underline',
                }}
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
