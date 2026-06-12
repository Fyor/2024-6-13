'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Destination } from '@/lib/types'
import PostcardFront from './PostcardFront'
import PostcardBack from './PostcardBack'

interface Props {
  destination: Destination
  index: number
  isSelected: boolean
  onSelect: () => void
  onClose: () => void
}

export default function PostcardCard({ destination, index, isSelected, onSelect, onClose }: Props) {
  const [flipped,      setFlipped]      = useState(false)
  const [showFullBack, setShowFullBack] = useState(false)

  useEffect(() => {
    if (isSelected) {
      setFlipped(true)
      const t = setTimeout(() => setShowFullBack(true), 500)
      return () => clearTimeout(t)
    } else {
      // Small delay so the fullscreen back can animate out first
      const t1 = setTimeout(() => setShowFullBack(false), 50)
      const t2 = setTimeout(() => setFlipped(false), 100)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [isSelected])

  return (
    <>
      {/* Grid card */}
      <motion.div
        className="relative cursor-pointer w-full h-full"
        style={{ perspective: '1200px' }}
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        whileHover={!isSelected ? { scale: 1.025, y: -4, zIndex: 2 } : {}}
        onClick={() => !isSelected && onSelect()}
      >
        <motion.div
          className="w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)',
            }}
          >
            <PostcardFront destination={destination} />
          </div>
          {/* Back placeholder (real content in fullscreen modal) */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: '#F0DFB8',
            }}
          />
        </motion.div>

        {/* Hover hint */}
        {!isSelected && (
          <motion.div
            className="absolute inset-0 rounded-xl flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }}
          >
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-xs text-cream/80 tracking-widest uppercase">
              Tap to open
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Full-screen postcard back — zooms out from centre */}
      <AnimatePresence>
        {showFullBack && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Blurred backdrop */}
            <motion.div
              className="absolute inset-0 bg-void/85 backdrop-blur-md"
              onClick={onClose}
            />
            {/* Postcard — zooms out from a tiny dot at centre */}
            <motion.div
              className="relative z-10 w-full"
              style={{ maxWidth: 960, aspectRatio: '3/2' }}
              initial={{ scale: 0.04, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.04, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <PostcardBack destination={destination} onClose={onClose} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
