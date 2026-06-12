'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import EuropeMap from '@/components/map/EuropeMap'
import DestinationModal from '@/components/map/DestinationModal'
import type { Destination } from '@/lib/types'

export default function MapPage() {
  const [selected, setSelected] = useState<Destination | null>(null)

  return (
    <main className="min-h-screen bg-void flex flex-col">
      <motion.div
        className="text-center pt-16 pb-8 px-6"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-[11px] uppercase tracking-[0.3em] text-crimson/60 font-body font-semibold mb-4">
          The big reveal
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-cream leading-tight mb-3 font-semibold">
          Where are we going?
        </h1>
        <p className="font-body text-sm text-dusk italic tracking-wide">
          Tap a destination to explore it
        </p>
      </motion.div>

      <motion.div
        className="flex-1 px-4 md:px-8 pb-8 max-w-5xl mx-auto w-full"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <EuropeMap onSelect={setSelected} />
      </motion.div>

      <DestinationModal destination={selected} onClose={() => setSelected(null)} />
    </main>
  )
}
