'use client'
import type { Destination } from '@/lib/types'

// Per-destination illustrated colour themes
const THEMES: Record<string, {
  sky: string; ground: string; accent: string; textColor: string; label: string
}> = {
  england:        { sky: '#6B7C93', ground: '#4A5568', accent: '#C8B88A', textColor: '#F0EAD6', label: 'LONDON · ENGLAND' },
  france:         { sky: '#7B6B8A', ground: '#5C4A6B', accent: '#E8C86B', textColor: '#FFF8E7', label: 'PARIS · FRANCE' },
  germany:        { sky: '#5C6B7B', ground: '#3D4A56', accent: '#D4A853', textColor: '#F5F0E8', label: 'DORTMUND · GERMANY' },
  poland:         { sky: '#8A5C5C', ground: '#6B3D3D', accent: '#C9A87C', textColor: '#FFF5F0', label: 'KRAKÓW · POLAND' },
  austria:        { sky: '#8A6B7B', ground: '#6B4A5C', accent: '#E8B4A0', textColor: '#FFF8F5', label: 'VIENNA · AUSTRIA' },
  'north-sweden': { sky: '#3A4A6B', ground: '#2A3A56', accent: '#8BC4E8', textColor: '#F0F5FF', label: 'KIRUNA · SWEDEN' },
}

// Simple CSS "illustration" silhouettes per destination
function Illustration({ id, theme }: { id: string; theme: typeof THEMES[string] }) {
  if (id === 'england') return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.sky} 0%, ${theme.sky}BB 55%, ${theme.ground} 100%)` }}>
      {/* Big Ben silhouette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center gap-3">
        <div className="w-4 rounded-t-sm" style={{ height: '60%', background: theme.accent + 'CC' }} />
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full mb-0.5" style={{ background: theme.accent }} />
          <div className="w-6 rounded-t" style={{ height: '80%', background: theme.accent }} />
          <div className="w-8 h-3" style={{ background: theme.accent + 'EE' }} />
          <div className="w-8" style={{ height: '40%', background: theme.accent }} />
        </div>
        <div className="w-5 rounded-t" style={{ height: '45%', background: theme.accent + 'BB' }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8" style={{ background: theme.ground }} />
    </div>
  )
  if (id === 'france') return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.sky} 0%, ${theme.sky}99 60%, ${theme.ground} 100%)` }}>
      {/* Eiffel Tower silhouette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-0.5 h-10" style={{ background: theme.accent }} />
        <div className="w-1 h-8 " style={{ background: theme.accent }} />
        <div className="flex gap-6 items-end">
          <div className="w-0.5 h-6 rotate-12" style={{ background: theme.accent }} />
          <div className="w-0.5 h-6 -rotate-12" style={{ background: theme.accent }} />
        </div>
        <div className="flex gap-10 items-end">
          <div className="w-1 h-8 rotate-6" style={{ background: theme.accent }} />
          <div className="w-1 h-8 -rotate-6" style={{ background: theme.accent }} />
        </div>
        <div className="w-16 h-2" style={{ background: theme.accent + 'AA' }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: theme.ground }} />
    </div>
  )
  if (id === 'germany') return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.sky} 0%, ${theme.sky}99 50%, ${theme.ground} 100%)` }}>
      {/* Cathedral / industrial skyline */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-1">
        {[28, 20, 52, 20, 28].map((h, i) => (
          <div key={i} className="rounded-t" style={{ width: 10, height: h, background: theme.accent + (i === 2 ? '' : 'AA') }} />
        ))}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1.5 h-8" style={{ background: theme.accent }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: theme.ground }} />
    </div>
  )
  if (id === 'poland') return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.sky} 0%, ${theme.sky}AA 55%, ${theme.ground} 100%)` }}>
      {/* Wawel castle silhouette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex items-end justify-center gap-0.5">
        {[18, 24, 20, 36, 22, 28, 16].map((h, i) => (
          <div key={i} style={{ width: 12, height: h, background: i === 3 ? theme.accent : theme.accent + 'AA' }} className="rounded-t" />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-5" style={{ background: theme.ground }} />
    </div>
  )
  if (id === 'austria') return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.sky} 0%, ${theme.sky}BB 50%, ${theme.ground} 100%)` }}>
      {/* Dome / Schönbrunn silhouette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-3 h-3 rounded-full mb-0" style={{ background: theme.accent }} />
        <div className="w-8 h-12 rounded-t-full" style={{ background: theme.accent + 'CC' }} />
        <div className="w-24 h-10" style={{ background: theme.accent + '99' }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: theme.ground }} />
    </div>
  )
  // north-sweden
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.sky} 0%, #1A2A4A 60%, ${theme.ground} 100%)` }}>
      {/* Aurora borealis */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, #2A8A4A33 30%, transparent 60%)' }} />
      <div className="absolute top-6 left-0 right-0 h-12" style={{ background: 'linear-gradient(90deg, transparent, #4AC88A44 30%, #8BC4E844 70%, transparent)', filter: 'blur(6px)' }} />
      {/* Pine trees */}
      <div className="absolute bottom-0 flex items-end justify-around w-full">
        {[0.3, 0.5, 0.4, 0.6, 0.35, 0.5].map((s, i) => (
          <div key={i} className="flex flex-col items-center" style={{ transform: `scale(${s})`, transformOrigin: 'bottom center' }}>
            <div className="w-0 h-0" style={{ borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: `18px solid ${theme.accent}` }} />
            <div className="w-0 h-0" style={{ borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderBottom: `22px solid ${theme.accent}`, marginTop: -8 }} />
            <div className="w-3 h-5" style={{ background: theme.accent + 'AA' }} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-4" style={{ background: '#1A2A3A' }} />
    </div>
  )
}

interface Props { destination: Destination }

export default function PostcardFront({ destination }: Props) {
  const theme = THEMES[destination.id] ?? THEMES['england']

  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden"
      style={{ background: '#F5E8C8', fontFamily: 'Georgia, serif' }}
    >
      {/* Illustrated top area (65%) */}
      <div className="relative" style={{ height: '62%' }}>
        <Illustration id={destination.id} theme={theme} />
        {/* Postmark in top-right */}
        <div className="absolute top-3 right-3 flex flex-col items-center">
          <div
            className="w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 border-dashed"
            style={{ borderColor: theme.accent + 'BB', background: 'rgba(0,0,0,0.25)' }}
          >
            <span style={{ fontSize: 14 }}>{destination.flag}</span>
          </div>
        </div>
        {/* Vintage "WISH YOU WERE HERE" overlay */}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: 9,
              letterSpacing: '0.25em',
              color: theme.textColor,
              textShadow: '0 1px 3px rgba(0,0,0,0.6)',
              textTransform: 'uppercase',
            }}
          >
            Wish You Were Here
          </span>
        </div>
      </div>

      {/* Text area (38%) — aged paper */}
      <div
        className="flex flex-col items-center justify-center px-4 py-3 h-[38%]"
        style={{ background: '#F5E8C8', borderTop: '1px solid #C8B090' }}
      >
        {/* Destination country name — large display */}
        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            fontSize: 'clamp(18px, 4.5vw, 26px)',
            color: '#3D2B1F',
            letterSpacing: '0.06em',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          {destination.name}
        </div>
        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(11px, 2.5vw, 14px)',
            color: '#7A5C3A',
            letterSpacing: '0.12em',
            marginTop: 3,
          }}
        >
          {destination.city}
        </div>
        <div
          className="mt-2 text-center leading-tight"
          style={{
            fontSize: 'clamp(8px, 1.8vw, 10px)',
            color: '#9A7A5A',
            fontStyle: 'italic',
            letterSpacing: '0.04em',
          }}
        >
          {destination.tagline}
        </div>
      </div>
    </div>
  )
}
