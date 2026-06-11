'use client'
import { motion } from 'framer-motion'

interface MemorySectionProps {
  caption: string
  subcaption?: string
  align?: 'left' | 'right'
  gradientFrom: string
  gradientTo: string
  index: number
}

export default function MemorySection({
  caption,
  subcaption,
  align = 'left',
  gradientFrom,
  gradientTo,
  index,
}: MemorySectionProps) {
  const isLeft = align === 'left'

  return (
    <motion.section
      className="py-20 px-6 md:px-12 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-center`}
      >
        {/* Photo placeholder */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <div
            className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-lg relative overflow-hidden`}
          >
            <img
              src={`/images/memory-${index + 1}.jpg`}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/5 to-transparent" />
          </div>
        </div>

        {/* Text */}
        <div className={`w-full md:w-1/2 ${isLeft ? 'md:text-left' : 'md:text-right'}`}>
          <p className="text-xs uppercase tracking-[0.25em] text-blush/60 font-body mb-3">
            Memory #{(index + 1).toString().padStart(2, '0')}
          </p>
          <h2 className="font-display italic text-3xl md:text-4xl text-ink leading-snug mb-4">
            {caption}
          </h2>
          {subcaption && (
            <p className="font-body text-ink/50 text-base leading-relaxed">{subcaption}</p>
          )}
        </div>
      </div>
    </motion.section>
  )
}
