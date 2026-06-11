'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import EuropeMap from '@/components/map/EuropeMap'
import DestinationModal from '@/components/map/DestinationModal'
import type { Destination } from '@/lib/types'

export default function MapPage() {
  const [selected, setSelected] = useState<Destination | null>(null)

  return (
    <main className="min-h-screen bg-cream flex flex-col">
      <motion.div
        className="text-center pt-12 pb-6 px-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-blush/60 font-body mb-3">
          The big reveal
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink mb-2">
          Where are we going?
        </h1>
        <p className="font-body text-ink/40 text-sm italic">
          Tap a destination to explore it
        </p>
      </motion.div>

      <div className="flex-1 px-4 md:px-8 pb-8 max-w-5xl mx-auto w-full">
        <EuropeMap onSelect={setSelected} />
      </div>

      <DestinationModal destination={selected} onClose={() => setSelected(null)} />
    </main>
  )
}
