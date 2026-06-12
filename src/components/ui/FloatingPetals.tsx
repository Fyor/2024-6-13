'use client'
import { useEffect, useState } from 'react'

interface Petal {
  id: number
  left: number
  delay: number
  duration: number
  swayDuration: number
  size: number
  color: string
  rotate: number
  opacity: number
  shape: 'petal' | 'blossom'
}

const PETAL_COLORS  = ['#C41E3A', '#E63950', '#FF9DB2', '#D4A853', '#FF6B4A', '#FFF8F0']
const BLOSSOM_COLORS = ['#FFF8F0', '#FFFFFF', '#FFE8F2', '#FFF0F5', '#FEFEFE', '#FFD6E8']

// 5-petal cherry blossom rendered as an inline SVG
function Blossom({ size, color, opacity, rotate }: { size: number; color: string; opacity: number; rotate: number }) {
  const pr = size * 0.9   // petal length
  const pw = size * 0.38  // petal width
  const s  = size * 2.8
  return (
    <svg
      width={s} height={s}
      viewBox={`${-s / 2} ${-s / 2} ${s} ${s}`}
      style={{ opacity, transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      {/* Outer petals */}
      {[0, 1, 2, 3, 4].map(i => (
        <ellipse key={i} cx={0} cy={-pr} rx={pw} ry={pr}
          transform={`rotate(${i * 72})`} fill={color} />
      ))}
      {/* Inner petals — offset 36° for a layered look */}
      {[0, 1, 2, 3, 4].map(i => (
        <ellipse key={i} cx={0} cy={-pr * 0.6} rx={pw * 0.65} ry={pr * 0.55}
          transform={`rotate(${i * 72 + 36})`} fill={color} opacity={0.55} />
      ))}
      {/* Stamen centre */}
      <circle cx={0} cy={0} r={size * 0.28}
        fill={color === '#FFF8F0' || color === '#FFFFFF' || color === '#FFF0F5' ? '#FFB8C8' : '#FFF8F066'} />
      <circle cx={0} cy={0} r={size * 0.12} fill="#FFD6A0CC" />
    </svg>
  )
}

export interface FloatingPetalsProps {
  count?: number
  /** 'petal' = teardrop (default) · 'blossom' = white 5-petal SVG · 'mixed' = both */
  type?: 'petal' | 'blossom' | 'mixed'
}

export default function FloatingPetals({ count = 14, type = 'petal' }: FloatingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const colors =
      type === 'blossom' ? BLOSSOM_COLORS :
      type === 'mixed'   ? [...PETAL_COLORS, ...BLOSSOM_COLORS] :
      PETAL_COLORS

    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: 11 + Math.random() * 9,
        swayDuration: 3 + Math.random() * 3,
        size: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate: Math.random() * 360,
        opacity: 0.28 + Math.random() * 0.42,
        shape:
          type === 'blossom' ? 'blossom' :
          type === 'mixed'   ? (Math.random() > 0.45 ? 'blossom' : 'petal') :
          'petal',
      }))
    )
  }, [count, type])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {petals.map(p => (
        <div
          key={p.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${p.left}%`,
            top: '-50px',
            animationDelay: `${p.delay}s, ${p.delay * 0.7}s`,
            animationDuration: `${p.duration}s, ${p.swayDuration}s`,
          }}
        >
          {p.shape === 'blossom' ? (
            <Blossom size={p.size} color={p.color} opacity={p.opacity} rotate={p.rotate} />
          ) : (
            <div style={{
              width: p.size,
              height: p.size * 1.7,
              borderRadius: '50% 50% 50% 0',
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: `rotate(${p.rotate}deg)`,
            }} />
          )}
        </div>
      ))}
    </div>
  )
}
