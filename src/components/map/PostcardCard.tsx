'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Destination } from '@/lib/types'
import PostcardFront from './PostcardFront'
import PostcardBack from './PostcardBack'

interface OriginRect {
  top: number; left: number
  width: number; height: number
  vpW: number; vpH: number
}

// Cream paper border + layered drop shadow — physical postcard on a dark table
const PAPER_SHADOW = [
  '0 0 0 5px #F5ECD7',
  '0 0 0 6px #A0804066',
  '0 6px 18px 2px rgba(0,0,0,0.55)',
  '0 18px 50px 4px rgba(0,0,0,0.5)',
  '2px 4px 12px rgba(0,0,0,0.35)',
].join(', ')

interface Props {
  destination: Destination
  index: number
  isSelected: boolean
  onSelect: () => void
  onClose: () => void
  rotation?: number
}

export default function PostcardCard({ destination, index, isSelected, onSelect, onClose, rotation = 0 }: Props) {
  const [flipped,      setFlipped]      = useState(false)
  const [showFullBack, setShowFullBack] = useState(false)
  const [originRect,   setOriginRect]   = useState<OriginRect | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleSelect = () => {
    if (cardRef.current) {
      const r = cardRef.current.getBoundingClientRect()
      setOriginRect({ top: r.top, left: r.left, width: r.width, height: r.height, vpW: window.innerWidth, vpH: window.innerHeight })
    }
    onSelect()
  }

  useEffect(() => {
    if (isSelected) {
      setFlipped(true)
      const t = setTimeout(() => setShowFullBack(true), 500)
      return () => clearTimeout(t)
    } else {
      const t1 = setTimeout(() => setShowFullBack(false), 50)
      const t2 = setTimeout(() => setFlipped(false), 100)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [isSelected])

  return (
    <>
      {/* Grid card */}
      <motion.div
        ref={cardRef}
        className="relative cursor-pointer w-full h-full"
        style={{ perspective: '1200px', rotate: rotation }}
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        whileHover={!isSelected ? { scale: 1.04, y: -6, rotate: 0, zIndex: 10 } : {}}
        onClick={() => !isSelected && handleSelect()}
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
              boxShadow: PAPER_SHADOW,
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
              boxShadow: PAPER_SHADOW,
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

      {/* Full-screen postcard back — grows from card's position */}
      <AnimatePresence>
        {showFullBack && originRect && (
          <motion.div
            className="fixed z-50 overflow-hidden"
            initial={{
              top: originRect.top,
              left: originRect.left,
              width: originRect.width,
              height: originRect.height,
              borderRadius: 12,
            }}
            animate={{
              top: 0,
              left: 0,
              width: originRect.vpW,
              height: originRect.vpH,
              borderRadius: 0,
            }}
            exit={{
              top: originRect.top,
              left: originRect.left,
              width: originRect.width,
              height: originRect.height,
              borderRadius: 12,
              opacity: 0,
            }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            <PostcardBack destination={destination} onClose={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
