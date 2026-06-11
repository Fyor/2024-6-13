'use client'
import { motion } from 'framer-motion'
import type { Destination } from '@/lib/types'

interface DestinationPostcardProps {
  destination: Destination
  visible: boolean
  delay: number
  onSelect: () => void
}

export default function DestinationPostcard({
  destination,
  visible,
  delay,
  onSelect,
}: DestinationPostcardProps) {
  return (
    <motion.button
      onClick={onSelect}
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={{
        left: `${destination.mapCoords.x}%`,
        top: `${destination.mapCoords.y}%`,
        zIndex: 10,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay,
      }}
      whileHover={{ scale: 1.1, zIndex: 20 }}
      aria-label={`View ${destination.name} — ${destination.city}`}
    >
      <div className="bg-cream border border-blush/30 rounded-lg shadow-lg px-3 py-2 min-w-[80px] text-center transition-shadow group-hover:shadow-xl group-hover:border-gold/60">
        <div className="text-2xl mb-0.5">{destination.flag}</div>
        <div className="text-xs font-body font-bold text-ink/80 leading-tight">{destination.city}</div>
        <div className="text-[10px] font-body text-ink/40 leading-tight">{destination.name}</div>
      </div>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-cream border-r border-b border-blush/30 rotate-45 group-hover:border-gold/60" />
    </motion.button>
  )
}
