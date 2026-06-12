'use client'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  left: number
  delay: number
  duration: number
  swayDuration: number
  size: number
  color: string
  rotate: number
  opacity: number
  shape: 'petal' | 'rose'
}

// Fallen rose petal (teardrop) colors
const PETAL_COLORS = ['#C41E3A', '#E63950', '#FF9DB2', '#D4205A', '#9A1228', '#E84070']
// Rose bloom colors
const ROSE_COLORS  = ['#C41E3A', '#E04060', '#D4205A', '#B81832', '#E63950', '#A01025']

// Multi-layer SVG rose viewed from above
function Rose({ size, color, opacity, rotate }: { size: number; color: string; opacity: number; rotate: number }) {
  const r  = size
  const vb = size * 3
  return (
    <svg
      width={vb} height={vb}
      viewBox={`${-vb / 2} ${-vb / 2} ${vb} ${vb}`}
      style={{ opacity, transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      {/* Outer petals (5) – widest, semi-transparent for depth */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`o${i}`}
          cx={0} cy={-r * 0.85} rx={r * 0.54} ry={r * 0.85}
          transform={`rotate(${i * 72})`}
          fill={color} opacity={0.65} />
      ))}
      {/* Middle petals (5) – slightly smaller, offset 36° */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`m${i}`}
          cx={0} cy={-r * 0.58} rx={r * 0.42} ry={r * 0.6}
          transform={`rotate(${i * 72 + 36})`}
          fill={color} opacity={0.82} />
      ))}
      {/* Inner petals (5) – tight bud layer, offset 18° */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`i${i}`}
          cx={0} cy={-r * 0.32} rx={r * 0.27} ry={r * 0.36}
          transform={`rotate(${i * 72 + 18})`}
          fill={color} opacity={0.95} />
      ))}
      {/* Centre bud */}
      <circle r={r * 0.2}  fill={color} />
      <circle r={r * 0.09} fill="#FFD6A0CC" />
    </svg>
  )
}

export interface FloatingPetalsProps {
  count?: number
  /** 'petal' = teardrop rose petal · 'rose' = full SVG rose bloom · 'mixed' = both */
  type?: 'petal' | 'rose' | 'blossom' | 'mixed'
}

export default function FloatingPetals({ count = 14, type = 'petal' }: FloatingPetalsProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors =
      type === 'petal' ? PETAL_COLORS : ROSE_COLORS

    setParticles(
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
          type === 'petal' ? 'petal' :
          type === 'mixed' ? (Math.random() > 0.4 ? 'rose' : 'petal') :
          'rose',
      }))
    )
  }, [count, type])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${p.left}%`,
            top: '-60px',
            animationDelay: `${p.delay}s, ${p.delay * 0.7}s`,
            animationDuration: `${p.duration}s, ${p.swayDuration}s`,
          }}
        >
          {p.shape === 'rose' ? (
            <Rose size={p.size} color={p.color} opacity={p.opacity} rotate={p.rotate} />
          ) : (
            /* Fallen rose petal — rounded teardrop */
            <div style={{
              width:  p.size * 0.9,
              height: p.size * 1.6,
              borderRadius: '60% 60% 50% 10% / 70% 70% 30% 30%',
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: `rotate(${p.rotate}deg)`,
              boxShadow: `inset 0 0 ${p.size * 0.3}px rgba(0,0,0,0.15)`,
            }} />
          )}
        </div>
      ))}
    </div>
  )
}
