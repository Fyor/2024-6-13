'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { destinations } from '@/data/destinations'
import Link from 'next/link'

const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return size
}

export default function RevealScreen() {
  const params = useSearchParams()
  const destId = params.get('dest')
  const destination = destinations.find((d) => d.id === destId)
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 8000)
    return () => clearTimeout(t)
  }, [])

  if (!destination) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-body text-ink/50">Destination not found.</p>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.3 } },
  }

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blossom/30 via-cream to-champagne/40 flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0">
          <Confetti
            width={width}
            height={height}
            colors={['#C9848A', '#D4A853', '#E8B4B8', '#F0D9A0', '#A05C63', '#F5ECD7']}
            numberOfPieces={220}
            gravity={0.25}
            recycle={false}
          />
        </div>
      )}

      <motion.div
        className="relative z-10 max-w-lg"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Flag */}
        <motion.div
          className="text-8xl mb-4"
          variants={item}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          {destination.flag}
        </motion.div>

        {/* Destination name */}
        <motion.p
          className="text-xs uppercase tracking-[0.35em] text-blush/70 font-body mb-3"
          variants={item}
        >
          We&apos;re going to
        </motion.p>

        <motion.h1
          className="font-display text-6xl md:text-7xl text-ink font-semibold mb-2"
          variants={item}
        >
          {destination.name}
        </motion.h1>

        <motion.p className="font-display italic text-2xl text-blush mb-10" variants={item}>
          {destination.city}
        </motion.p>

        {/* Personal message — replace the placeholder below with your real message */}
        <motion.div
          className="bg-cream/80 border border-gold/20 rounded-2xl p-6 mb-8 shadow-sm"
          variants={item}
        >
          <p className="font-display italic text-ink/40 text-base leading-relaxed">
            {/* ✏️ FYOR — replace this with your personal message to Adelin */}
            &ldquo;I&apos;ve been thinking about this for months. I wanted to give you something that
            isn&apos;t a thing — just us, somewhere new, making more memories. Two years of
            everything, and I can&apos;t wait for what comes next. I love you.&rdquo;
          </p>
          <p className="mt-4 font-body text-sm text-gold/70">— Fyor ♡</p>
        </motion.div>

        <motion.div variants={item}>
          <Link
            href="/"
            className="text-xs font-body text-ink/30 hover:text-ink/60 transition-colors border-b border-ink/10 hover:border-ink/30 pb-0.5"
          >
            ← Back to the beginning
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
