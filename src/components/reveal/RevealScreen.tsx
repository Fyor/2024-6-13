'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { destinations } from '@/data/destinations'
import Link from 'next/link'

const Confetti = dynamic(() => import('react-confetti'), { ssr: false })
const FloatingPetals = dynamic(() => import('@/components/ui/FloatingPetals'), { ssr: false })
const ParticleField = dynamic(() => import('@/components/ui/ParticleField'), { ssr: false })

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
    const t = setTimeout(() => setShowConfetti(false), 10000)
    return () => clearTimeout(t)
  }, [])

  if (!destination) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <p className="font-body text-dusk">Destination not found.</p>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.28, delayChildren: 0.5 } },
  }

  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
  }

  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center px-6 text-center overflow-hidden relative">
      {/* Background particles */}
      <div className="absolute inset-0 opacity-40">
        <ParticleField count={350} heartSide="center" />
      </div>

      {/* Floating petals — mix of rose teardrops + white blossoms */}
      <div className="absolute inset-0">
        <FloatingPetals count={28} type="mixed" />
      </div>

      {/* Confetti — rose/crimson palette */}
      {showConfetti && (
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-10">
          <Confetti
            width={width}
            height={height}
            colors={['#C41E3A', '#E63950', '#FF9DB2', '#D4A853', '#FF6B4A', '#FFF8F0']}
            numberOfPieces={250}
            gravity={0.2}
            recycle={false}
          />
        </div>
      )}

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, #C41E3A1A 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-20 max-w-lg"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Flag with white blossom wreath */}
        <motion.div className="relative inline-block mb-6" variants={item}>
          {/* Wreath ring of white blossoms */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 140 140"
            style={{ top: '-20px', left: '-20px', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)', opacity: 0.55 }}
            aria-hidden="true"
          >
            {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
              const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
              const cx = 70 + Math.cos(angle) * 50
              const cy = 70 + Math.sin(angle) * 50
              return (
                <g key={i} transform={`translate(${cx},${cy}) rotate(${i * 30})`}>
                  {[0,1,2,3,4].map(j => (
                    <ellipse key={j} cx={0} cy={-4.5} rx={1.8} ry={3.5}
                      transform={`rotate(${j * 72})`} fill="#FFF8F0" />
                  ))}
                  <circle cx={0} cy={0} r={1.4} fill="#FFD0A0" />
                </g>
              )
            })}
          </svg>

          <motion.div
            className="text-8xl relative z-10"
            animate={{ y: [0, -14, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          >
            {destination.flag}
          </motion.div>
        </motion.div>

        <motion.p
          className="text-[11px] uppercase tracking-[0.35em] text-crimson/70 font-body font-semibold mb-3"
          variants={item}
        >
          We&apos;re going to
        </motion.p>

        <motion.h1
          className="font-display text-[clamp(52px,10vw,88px)] text-cream font-semibold leading-[0.88] tracking-[-0.02em] mb-3"
          variants={item}
        >
          {destination.name}
        </motion.h1>

        <motion.p
          className="font-display italic text-2xl text-petal mb-12"
          variants={item}
        >
          {destination.city}
        </motion.p>

        {/* Message card */}
        <motion.div
          className="border border-crimson/20 rounded-2xl p-7 mb-8 bg-midnight/60 backdrop-blur-sm"
          style={{ boxShadow: '0 0 40px #C41E3A12' }}
          variants={item}
        >
          <p className="font-display italic text-cream/50 text-base leading-relaxed">
            {/* ✏️ FYOR — replace the text below with your personal message to Adelin */}
            &ldquo;I&apos;ve been thinking about this for months. I wanted to give you something
            that isn&apos;t a thing — just us, somewhere new, making more memories. Two years of
            everything, and I can&apos;t wait for what comes next. I love you.&rdquo;
          </p>
          <div className="flex items-center justify-end gap-2 mt-5">
            <div className="w-8 h-px bg-crimson/30" />
            <p className="font-body text-sm text-crimson/60 tracking-wide">Fyor ♡</p>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <Link
            href="/"
            className="text-xs font-body text-dusk hover:text-ash transition-colors tracking-wide"
          >
            ← Back to the beginning
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
