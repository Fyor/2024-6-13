'use client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const ParticleField   = dynamic(() => import('@/components/ui/ParticleField'),   { ssr: false })
const FloatingPetals  = dynamic(() => import('@/components/ui/FloatingPetals'),  { ssr: false })

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-void">
      {/* Particle constellation — right half dominant */}
      <div className="absolute inset-0 z-0">
        <ParticleField count={520} heartSide="right" className="opacity-90" />
      </div>

      {/* Rose petals drifting down */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <FloatingPetals count={18} type="rose" />
      </div>

      {/* Subtle radial vignette from left */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 20% 50%, #0D030888 0%, transparent 70%)',
        }}
      />

      {/* A faint glow behind the text */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle, #C41E3A18 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Text block — left column, Dala-style layout */}
      <div className="relative z-20 px-8 md:px-16 lg:px-24 max-w-xl">
        <motion.p
          className="text-xs uppercase tracking-[0.35em] text-crimson font-body font-semibold mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          June 13 · Two Years
        </motion.p>

        <motion.h1
          className="font-display text-[clamp(64px,12vw,120px)] text-cream font-semibold leading-[0.87] tracking-[-0.03em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
        >
          Two
          <br />
          <span className="font-display italic font-normal text-[0.85em] text-petal/90">
            years
          </span>
          <br />
          <span className="font-display text-[0.45em] font-normal italic text-cream/40 tracking-[0.02em]">
            of us
          </span>
        </motion.h1>

        <motion.p
          className="font-body text-base text-ash leading-relaxed max-w-xs mb-10 tracking-[0.02em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          This time has been so precious, but has also flown by. I can&apos;t wait for many more years to come. This little surprise is for you, my adelillan
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-dusk font-body text-sm tracking-wide">
            <div className="w-8 h-px bg-crimson/50" />
            scroll to remember
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-void to-transparent z-20 pointer-events-none" />
    </section>
  )
}
