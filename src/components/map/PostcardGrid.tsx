'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { destinations } from '@/data/destinations'
import PostcardCard from './PostcardCard'

export default function PostcardGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div
      className="w-screen h-screen bg-void overflow-hidden"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', padding: '20px', gap: '16px' }}
    >
      {destinations.map((dest, i) => (
        <PostcardCard
          key={dest.id}
          destination={dest}
          index={i}
          isSelected={selectedId === dest.id}
          onSelect={() => setSelectedId(dest.id)}
          onClose={() => setSelectedId(null)}
        />
      ))}
    </div>
  )
}
