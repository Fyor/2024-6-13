'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ParticleField = dynamic(() => import('@/components/ui/ParticleField'), { ssr: false })

export default function DecideButton() {
  return (
    <motion.div
      className="relative py-40 flex flex-col items-center text-center px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.2 }}
    >
      {/* Mini particle field behind the button */}
      <div className="absolute inset-0 opacity-30">
        <ParticleField count={120} heartSide="center" />
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 40% at 50% 50%, #C41E3A22 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-12 h-px bg-crimson/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-crimson/50 animate-pulse" />
          <div className="w-12 h-px bg-crimson/30" />
        </div>

        <p className="font-display italic text-xl text-cream/40 mb-3">
          There&apos;s still one more thing I want to give you...
        </p>
        <p className="font-body text-sm text-dusk mb-12 max-w-xs tracking-wide">
          Something we have been wanting to do for a while now.
        </p>

        <Link href="/quiz">
          <motion.div
            className="inline-flex items-center gap-4 border border-crimson/40 rounded-full px-8 py-4 group animate-pulse-glow relative overflow-hidden"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Button shimmer */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #C41E3A18, transparent)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
              }}
            />
            <span className="relative font-body text-sm font-semibold uppercase tracking-[0.15em] text-cream">
              Decide what&apos;s next
            </span>
            <motion.span
              className="relative text-crimson text-lg"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  )
}
