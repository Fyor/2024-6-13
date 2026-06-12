'use client'
import { useState } from 'react'
import type { Destination } from '@/lib/types'

const THEMES: Record<string, { sky: string; ground: string; accent: string; textColor: string }> = {
  england:        { sky: '#6B7C93', ground: '#4A5568', accent: '#C8B88A', textColor: '#F0EAD6' },
  france:         { sky: '#7B6B8A', ground: '#5C4A6B', accent: '#E8C86B', textColor: '#FFF8E7' },
  germany:        { sky: '#5C6B7B', ground: '#3D4A56', accent: '#D4A853', textColor: '#F5F0E8' },
  poland:         { sky: '#8A5C5C', ground: '#6B3D3D', accent: '#C9A87C', textColor: '#FFF5F0' },
  austria:        { sky: '#8A6B7B', ground: '#6B4A5C', accent: '#E8B4A0', textColor: '#FFF8F5' },
  'north-sweden': { sky: '#3A4A6B', ground: '#2A3A56', accent: '#8BC4E8', textColor: '#F0F5FF' },
}

function CssFallback({ destination }: { destination: Destination }) {
  const theme = THEMES[destination.id] ?? THEMES.england
  const id = destination.id
  return (
    <div className="relative w-full h-full" style={{ background: '#F5ECD7', fontFamily: 'Georgia, serif' }}>
      {/* Illustration area */}
      <div className="absolute inset-0 bottom-[18%] overflow-hidden">
        {id === 'england' && (
          <div className="relative w-full h-full overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.sky} 0%, ${theme.sky}BB 55%, ${theme.ground} 100%)` }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center gap-3">
              <div className="w-4 rounded-t-sm" style={{ height: '55%', background: theme.accent + 'CC' }} />
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full mb-0.5" style={{ background: theme.accent }} />
                <div className="w-6 rounded-t" style={{ height: '75%', background: theme.accent }} />
                <div className="w-8 h-3" style={{ background: theme.accent + 'EE' }} />
                <div className="w-8" style={{ height: '35%', background: theme.accent }} />
              </div>
              <div className="w-5 rounded-t" style={{ height: '40%', background: theme.accent + 'BB' }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8" style={{ background: theme.ground }} />
          </div>
        )}
        {id === 'france' && (
          <div className="relative w-full h-full overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.sky} 0%, ${theme.sky}99 60%, ${theme.ground} 100%)` }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-0.5 h-10" style={{ background: theme.accent }} />
              <div className="w-1 h-8" style={{ background: theme.accent }} />
              <div className="flex gap-6 items-end"><div className="w-0.5 h-6 rotate-12" style={{ background: theme.accent }} /><div className="w-0.5 h-6 -rotate-12" style={{ background: theme.accent }} /></div>
              <div className="flex gap-10 items-end"><div className="w-1 h-8 rotate-6" style={{ background: theme.accent }} /><div className="w-1 h-8 -rotate-6" style={{ background: theme.accent }} /></div>
              <div className="w-16 h-2" style={{ background: theme.accent + 'AA' }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: theme.ground }} />
          </div>
        )}
        {id === 'germany' && (
          <div className="relative w-full h-full overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.sky} 0%, ${theme.sky}99 50%, ${theme.ground} 100%)` }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-1">
              {[28, 20, 52, 20, 28].map((h, i) => <div key={i} className="rounded-t" style={{ width: 10, height: h, background: theme.accent + (i === 2 ? '' : 'AA') }} />)}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1.5 h-8" style={{ background: theme.accent }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: theme.ground }} />
          </div>
        )}
        {id === 'poland' && (
          <div className="relative w-full h-full overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.sky} 0%, ${theme.sky}AA 55%, ${theme.ground} 100%)` }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex items-end justify-center gap-0.5">
              {[18, 24, 20, 36, 22, 28, 16].map((h, i) => <div key={i} style={{ width: 12, height: h, background: i === 3 ? theme.accent : theme.accent + 'AA' }} className="rounded-t" />)}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-5" style={{ background: theme.ground }} />
          </div>
        )}
        {id === 'austria' && (
          <div className="relative w-full h-full overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.sky} 0%, ${theme.sky}BB 50%, ${theme.ground} 100%)` }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full" style={{ background: theme.accent }} />
              <div className="w-8 h-12 rounded-t-full" style={{ background: theme.accent + 'CC' }} />
              <div className="w-24 h-10" style={{ background: theme.accent + '99' }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: theme.ground }} />
          </div>
        )}
        {id === 'north-sweden' && (
          <div className="relative w-full h-full overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.sky} 0%, #1A2A4A 60%, ${theme.ground} 100%)` }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, #2A8A4A33 30%, transparent 60%)' }} />
            <div className="absolute top-6 left-0 right-0 h-12" style={{ background: 'linear-gradient(90deg, transparent, #4AC88A44 30%, #8BC4E844 70%, transparent)', filter: 'blur(6px)' }} />
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
        )}
        {/* Stamp top-right */}
        <div className="absolute top-2 right-2">
          <div className="w-10 h-10 rounded flex items-center justify-center border border-dashed"
            style={{ borderColor: theme.accent + 'BB', background: 'rgba(0,0,0,0.25)' }}>
            <span style={{ fontSize: 18 }}>{destination.flag}</span>
          </div>
        </div>
      </div>

      {/* Bottom label band — matches AI image style */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
        style={{ height: '18%', background: '#F5ECD7', borderTop: '2px solid #8B6A3E' }}
      >
        <span style={{
          fontFamily: 'Georgia, serif',
          fontWeight: 700,
          fontSize: 'clamp(11px, 1.8vw, 17px)',
          color: '#3D2B1F',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          {destination.city} · {destination.name}
        </span>
      </div>
    </div>
  )
}

// All candidate filenames to try for each destination (in order)
const IMAGE_CANDIDATES: Record<string, string[]> = {
  'north-sweden': ['north-sweden', 'sweden', 'kiruna', 'northern-sweden'],
}
function getCandidates(id: string) {
  return IMAGE_CANDIDATES[id] ?? [id]
}

interface Props { destination: Destination }

// Try every candidate slug × [png, jpg], then CSS fallback
export default function PostcardFront({ destination }: Props) {
  const candidates = getCandidates(destination.id)
  // Flat list: [slug0.png, slug0.jpg, slug1.png, slug1.jpg, ...]
  const srcs = candidates.flatMap(s => [`/postcards/${s}.png`, `/postcards/${s}.jpg`])
  const [idx, setIdx] = useState(0)

  if (idx < srcs.length) {
    return (
      <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 'inherit' }}>
        <img
          src={srcs[idx]}
          alt={`${destination.city}, ${destination.name}`}
          className="w-full h-full object-cover"
          onError={() => setIdx(i => i + 1)}
          draggable={false}
        />
      </div>
    )
  }

  return <CssFallback destination={destination} />
}
