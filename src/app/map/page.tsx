'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EuropeMap from '@/components/map/EuropeMap'
import PostcardGrid from '@/components/map/PostcardGrid'

type Phase = 'map' | 'postcards'

export default function MapPage() {
  const [phase, setPhase] = useState<Phase>('map')

  return (
    <main className="min-h-screen bg-void overflow-x-hidden">
      <AnimatePresence mode="wait">
        {phase === 'map' && (
          <motion.div
            key="map"
            className="min-h-screen flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <EuropeMap onRevealReady={() => setPhase('postcards')} />
          </motion.div>
        )}

        {phase === 'postcards' && (
          <motion.div
            key="postcards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <PostcardGrid />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
