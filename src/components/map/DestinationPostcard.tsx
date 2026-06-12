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
      transition={{ type: 'spring', stiffness: 240, damping: 18, delay }}
      whileHover={{ scale: 1.12, zIndex: 20 }}
      aria-label={`View ${destination.name} — ${destination.city}`}
    >
      <div className="bg-midnight border border-crimson/30 rounded-xl shadow-lg px-3 py-2 min-w-[78px] text-center transition-all duration-200 group-hover:border-crimson group-hover:shadow-[0_0_16px_#C41E3A44]">
        <div className="text-xl mb-0.5">{destination.flag}</div>
        <div className="text-[11px] font-body font-semibold text-cream/90 leading-tight">{destination.city}</div>
        <div className="text-[9px] font-body text-dusk leading-tight">{destination.name}</div>
      </div>
      {/* Connector arrow */}
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-midnight border-r border-b border-crimson/30 rotate-45 group-hover:border-crimson" />
    </motion.button>
  )
}
