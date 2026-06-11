'use client'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient placeholder – replace with a real couple photo */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blossom/60 via-champagne/80 to-cream"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blush/20 via-champagne/40 to-cream/80" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blossom/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-champagne/20 blur-3xl pointer-events-none" />

      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="text-sm uppercase tracking-[0.3em] text-blush/70 font-body mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          13 June 2024 — 13 June 2026
        </motion.p>

        <motion.h1
          className="font-display text-7xl md:text-9xl text-ink leading-none mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Two Years
        </motion.h1>

        <motion.p
          className="font-display italic text-3xl md:text-4xl text-ink/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          of everything
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="text-xs text-ink/30 font-body tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-ink/20 to-transparent" />
      </motion.div>
    </section>
  )
}
