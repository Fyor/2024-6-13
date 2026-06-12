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
}

const PETAL_COLORS = [
  '#C41E3A',
  '#E63950',
  '#FF9DB2',
  '#D4A853',
  '#FF6B4A',
  '#FFF8F0',
]

interface FloatingPetalsProps {
  count?: number
}

export default function FloatingPetals({ count = 14 }: FloatingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 8,
        swayDuration: 3 + Math.random() * 3,
        size: 5 + Math.random() * 9,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        rotate: Math.random() * 360,
        opacity: 0.3 + Math.random() * 0.45,
      }))
    )
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${p.left}%`,
            top: '-30px',
            animationDelay: `${p.delay}s, ${p.delay * 0.7}s`,
            animationDuration: `${p.duration}s, ${p.swayDuration}s`,
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.size * 1.7,
              borderRadius: '50% 50% 50% 0',
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
