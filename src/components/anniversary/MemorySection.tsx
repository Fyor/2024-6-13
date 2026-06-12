'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import FloralDivider from '@/components/ui/FloralDivider'

const FloatingPetals = dynamic(() => import('@/components/ui/FloatingPetals'), { ssr: false })

// Tiny 5-petal ornament for photo corners
function CornerFlower({ opacity = 0.28 }: { opacity?: number }) {
  return (
    <svg width="26" height="26" viewBox="-13 -13 26 26" aria-hidden="true" style={{ opacity }}>
      {[0,1,2,3,4].map(i => (
        <ellipse key={i} cx={0} cy={-7} rx={2.8} ry={5}
          transform={`rotate(${i * 72})`} fill="#FFF8F0" />
      ))}
      <circle cx={0} cy={0} r={2.4} fill="#D4A85370" />
    </svg>
  )
}

interface MemorySectionProps {
  caption: string
  subcaption?: string
  align?: 'left' | 'right'
  gradientFrom: string
  gradientVia?: string
  gradientTo: string
  index: number
  imageSrc?: string    // e.g. /photos/2024-06-13.jpg
  dateLabel?: string   // e.g. "June 13, 2024"
}

export default function MemorySection({
  caption,
  subcaption,
  align = 'left',
  gradientFrom,
  gradientVia,
  gradientTo,
  index,
  imageSrc,
  dateLabel,
}: MemorySectionProps) {
  const isLeft = align === 'left'
  const [portrait, setPortrait] = useState(false)

  return (
    <section className="relative py-24 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden">
      <FloatingPetals count={6} type="mixed" />

      <motion.div
        className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-center`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Photo placeholder */}
        <motion.div
          className="w-full md:w-1/2 flex-shrink-0"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div
            className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientVia ?? ''} ${gradientTo} relative overflow-hidden border border-wine/20`}
          >
            {/* Actual photo — blurred backdrop handles portrait images */}
            {imageSrc && portrait && (
              <img
                src={imageSrc}
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover scale-110 opacity-60"
                style={{ filter: 'blur(16px)' }}
              />
            )}
            {imageSrc && (
              <img
                src={imageSrc}
                alt=""
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: portrait ? 'contain' : 'cover' }}
                onLoad={e => {
                  const img = e.currentTarget
                  setPortrait(img.naturalHeight > img.naturalWidth * 1.15)
                }}
              />
            )}

            {/* Grain overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
                mixBlendMode: 'overlay',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />

            {/* Date badge (or number fallback) */}
            <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-crimson/80 font-body border border-crimson/25 rounded-full px-3 py-1 bg-void/50 backdrop-blur-sm">
              {dateLabel ?? String(index + 1).padStart(2, '0')}
            </div>

            {/* Flower corner ornaments */}
            <div className="absolute top-2 right-2 pointer-events-none">
              <CornerFlower />
            </div>
            <div className="absolute bottom-2 right-2 pointer-events-none" style={{ transform: 'rotate(180deg)' }}>
              <CornerFlower opacity={0.18} />
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          className={`w-full md:w-1/2 ${isLeft ? 'md:text-left' : 'md:text-right'}`}
          initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className={`w-10 h-px bg-crimson/40 mb-6 ${isLeft ? '' : 'ml-auto'}`}
          />
          <h2 className="font-display italic text-3xl md:text-4xl text-cream leading-snug mb-5">
            {caption}
          </h2>
          {subcaption && (
            <p className="font-body text-ash/70 text-base leading-relaxed tracking-[0.015em]">
              {subcaption}
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Botanical divider below each memory */}
      <FloralDivider className="mt-8 opacity-70" />
    </section>
  )
}
