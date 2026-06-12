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
  const [flipped, setFlipped] = useState(false)
  const [showFullBack, setShowFullBack] = useState(false)

  // When selected: flip first, then show full back
  useEffect(() => {
    if (isSelected) {
      setFlipped(true)
      const t = setTimeout(() => setShowFullBack(true), 550)
      return () => clearTimeout(t)
    } else {
      setShowFullBack(false)
      setFlipped(false)
    }
  }, [isSelected])

  return (
    <>
      {/* Grid card with flip animation */}
      <motion.div
        className="relative cursor-pointer"
        style={{ perspective: '1000px', aspectRatio: '3/2' }}
        initial={{ opacity: 0, y: 32, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={!isSelected ? { y: -6, scale: 1.02 } : {}}
        onClick={() => !isSelected && onSelect()}
      >
        <motion.div
          style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <PostcardFront destination={destination} />
          </div>
          {/* Back face (visible during flip, hidden by fullscreen modal) */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
            }}
          >
            <div className="w-full h-full" style={{ background: '#F0DFB8' }} />
          </div>
        </motion.div>

        {/* Hover label */}
        {!isSelected && (
          <div className="absolute inset-0 rounded-xl flex items-end justify-center pb-3 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)' }}>
            <span className="font-body text-xs text-cream/90 tracking-widest uppercase">
              Tap to explore
            </span>
          </div>
        )}
      </motion.div>

      {/* Full-screen postcard back */}
      <AnimatePresence>
        {showFullBack && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-void/90 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Postcard back — fills available space with correct aspect ratio */}
            <motion.div
              className="relative w-full z-10"
              style={{ maxWidth: 900, maxHeight: '90vh', aspectRatio: '3/2' }}
              initial={{ scale: 0.72, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.72, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <PostcardBack destination={destination} onClose={onClose} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
