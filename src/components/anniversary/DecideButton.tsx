'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DecideButton() {
  return (
    <motion.div
      className="py-24 flex flex-col items-center text-center px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1 }}
    >
      <div className="w-24 h-px bg-gold/40 mx-auto mb-12" />

      <p className="font-display italic text-2xl text-ink/50 mb-3">
        There&apos;s still one more thing I want to give you...
      </p>
      <p className="font-body text-sm text-ink/30 mb-10 max-w-xs">
        A little something I&apos;ve been thinking about for a while.
      </p>

      <Link href="/quiz" className="group inline-flex items-center gap-3">
        <span className="font-display italic text-lg text-gold/70 group-hover:text-gold transition-colors duration-300 border-b border-gold/20 group-hover:border-gold/60 pb-0.5">
          Decide what&apos;s next
        </span>
        <span className="text-gold/40 group-hover:text-gold/80 group-hover:translate-x-1 transition-all duration-300">
          →
        </span>
      </Link>
    </motion.div>
  )
}
