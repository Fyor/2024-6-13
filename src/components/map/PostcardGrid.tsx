'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { destinations } from '@/data/destinations'
import PostcardCard from './PostcardCard'

export default function PostcardGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-void flex flex-col">
      {/* Header */}
      <motion.div
        className="text-center pt-14 pb-8 px-6"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <p className="text-[11px] uppercase tracking-[0.3em] text-crimson/60 font-body font-semibold mb-3">
          Six destinations
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-cream font-semibold leading-tight">
          Pick your adventure
        </h1>
        <p className="font-body text-sm text-dusk italic tracking-wide mt-3">
          Tap a postcard to flip it open
        </p>
      </motion.div>

      {/* Postcard grid */}
      <div className="flex-1 px-4 md:px-8 pb-16 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
      </div>
    </div>
  )
}
