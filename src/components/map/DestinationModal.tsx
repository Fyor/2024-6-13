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
  { key: 'culture', label: 'Culture & Sightseeing', colorClass: 'bg-crimson' },
  { key: 'activities', label: 'Activities', colorClass: 'bg-rose-red' },
  { key: 'romance', label: 'Romance', colorClass: 'bg-petal' },
  { key: 'ease', label: 'Ease of Travel', colorClass: 'bg-ember' },
] as const

export default function DestinationModal({ destination, onClose }: DestinationModalProps) {
  const router = useRouter()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = destination ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [destination])

  return (
    <AnimatePresence>
      {destination && (
        <>
          <motion.div
            className="fixed inset-0 bg-void/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${destination.name}`}
            className="fixed inset-0 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-full flex items-start justify-center p-4 md:p-8">
              <motion.div
                className="w-full max-w-2xl bg-midnight rounded-2xl shadow-2xl overflow-hidden relative border border-wine/30"
                style={{ boxShadow: '0 0 60px #C41E3A15, 0 20px 80px #00000080' }}
                initial={{ scale: 0.92, y: 24 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 24 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Hero gradient */}
                <div
                  className={`h-52 bg-gradient-to-br ${destination.coverColor} relative flex items-end p-6`}
                >
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{ background: 'linear-gradient(to bottom, transparent 30%, #1A0510 100%)' }}
                  />
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-void/40 border border-cream/10 hover:bg-void/70 flex items-center justify-center text-cream/60 hover:text-cream transition-all"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                  <div className="relative z-10">
                    <div className="text-4xl mb-2">{destination.flag}</div>
                    <h2 className="font-display text-3xl text-cream font-semibold leading-tight">
                      {destination.name}
                    </h2>
                    <p className="text-ash/70 font-body text-sm tracking-wide">{destination.city}</p>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  {/* Tagline & desc */}
                  <div>
                    <p className="font-display italic text-xl text-petal mb-3">{destination.tagline}</p>
                    <p className="font-body text-ash/70 leading-relaxed text-sm tracking-[0.015em]">
                      {destination.description}
                    </p>
                  </div>

                  {/* Sims bars */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-dusk font-body mb-4">
                      At a glance
                    </p>
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
                    <p className="text-[10px] uppercase tracking-[0.2em] text-dusk font-body mb-4">
                      Things to do together
                    </p>
                    <ul className="space-y-2.5">
                      {destination.activities.map((act) => (
                        <li key={act} className="flex items-start gap-2.5 text-sm font-body text-ash/70">
                          <span className="text-crimson/60 mt-0.5 flex-shrink-0 text-xs">✦</span>
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Food */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-dusk font-body mb-4">
                      Where to eat
                    </p>
                    <ul className="space-y-2.5">
                      {destination.foodHighlights.map((food) => (
                        <li key={food} className="flex items-start gap-2.5 text-sm font-body text-ash/70">
                          <span className="text-gold/60 mt-0.5 flex-shrink-0 text-xs">✦</span>
                          {food}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Language guide */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-dusk font-body mb-4">
                      Allergy phrases
                    </p>
                    <LanguageGuide guide={destination.languageGuide} />
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => router.push(`/reveal?dest=${destination.id}`)}
                    className="w-full py-4 rounded-2xl border border-crimson bg-crimson/10 text-cream font-body text-sm font-semibold uppercase tracking-[0.15em] hover:bg-crimson hover:shadow-[0_0_30px_#C41E3A60] active:scale-98 transition-all duration-300"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Choose {destination.city} ✦
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
