'use client'
import { useState } from 'react'
import { destinations } from '@/data/destinations'
import PostcardCard from './PostcardCard'

// Slight static rotations — deterministic so no hydration mismatch
const ROTATIONS = [-1.8, 1.1, -1.4, 1.6, -0.9, 1.3]

export default function PostcardGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div
      className="w-screen h-screen bg-void overflow-hidden"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        padding: '10px',
        gap: '8px',
      }}
    >
      {destinations.map((dest, i) => (
        <PostcardCard
          key={dest.id}
          destination={dest}
          index={i}
          isSelected={selectedId === dest.id}
          onSelect={() => setSelectedId(dest.id)}
          onClose={() => setSelectedId(null)}
          rotation={ROTATIONS[i]}
        />
      ))}
    </div>
  )
}
