'use client'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type { Destination } from '@/lib/types'
import SimsBar from '@/components/ui/SimsBar'
import LanguageGuide from '@/components/ui/LanguageGuide'

interface DestinationModalProps {
  destination: Destination | null
  onClose: () => void
}

const ratingConfig = [
  { key: 'food', label: 'Food & Gluten-free', colorClass: 'bg-gold' },
  { key: 'culture', label: 'Culture & Sightseeing', colorClass: 'bg-blush' },
  { key: 'activities', label: 'Activities', colorClass: 'bg-amber' },
  { key: 'romance', label: 'Romance', colorClass: 'bg-wine' },
  { key: 'ease', label: 'Ease of Travel', colorClass: 'bg-champagne' },
] as const

export default function DestinationModal({ destination, onClose }: DestinationModalProps) {
  const router = useRouter()

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent background scroll when modal open
  useEffect(() => {
    if (destination) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [destination])

  return (
    <AnimatePresence>
      {destination && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${destination.name} — ${destination.city}`}
            className="fixed inset-0 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-full flex items-start justify-center p-4 md:p-8">
              <motion.div
                className="w-full max-w-2xl bg-cream rounded-2xl shadow-2xl overflow-hidden relative"
                initial={{ scale: 0.93, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.93, y: 20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Hero */}
                <div className={`h-52 bg-gradient-to-br ${destination.coverColor} relative flex items-end p-6`}>
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink/20 hover:bg-ink/30 flex items-center justify-center text-cream transition-colors"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                  <div>
                    <div className="text-5xl mb-2">{destination.flag}</div>
                    <h2 className="font-display text-3xl text-cream font-semibold leading-tight">
                      {destination.name}
                    </h2>
                    <p className="text-cream/80 font-body text-sm">{destination.city}</p>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  {/* Tagline & description */}
                  <div>
                    <p className="font-display italic text-xl text-blush mb-3">{destination.tagline}</p>
                    <p className="font-body text-ink/70 leading-relaxed text-sm">{destination.description}</p>
                  </div>

                  {/* Sims-style rating bars */}
                  <div>
                    <h3 className="font-display text-lg text-ink mb-4">At a glance</h3>
                    {ratingConfig.map((r, i) => (
                      <SimsBar
                        key={r.key}
                        label={r.label}
                        value={destination.ratings[r.key]}
                        colorClass={r.colorClass}
                        delay={i * 0.1}
                      />
                    ))}
                  </div>

                  {/* Activities */}
                  <div>
                    <h3 className="font-display text-lg text-ink mb-3">Things to do together</h3>
                    <ul className="space-y-2">
                      {destination.activities.map((act) => (
                        <li key={act} className="flex items-start gap-2 text-sm font-body text-ink/70">
                          <span className="text-blush mt-0.5 flex-shrink-0">✦</span>
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Food */}
                  <div>
                    <h3 className="font-display text-lg text-ink mb-3">Where to eat</h3>
                    <ul className="space-y-2">
                      {destination.foodHighlights.map((food) => (
                        <li key={food} className="flex items-start gap-2 text-sm font-body text-ink/70">
                          <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
                          {food}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Language guide */}
                  <div>
                    <h3 className="font-display text-lg text-ink mb-3">Allergy phrases</h3>
                    <LanguageGuide guide={destination.languageGuide} />
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => router.push(`/reveal?dest=${destination.id}`)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blush to-wine text-cream font-display text-lg tracking-wide hover:opacity-90 active:scale-98 transition-all duration-200 shadow-md"
                  >
                    Choose {destination.city}! ✦
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
