'use client'
import { motion } from 'framer-motion'

// 5-petal flower helper (SVG, centered at cx,cy)
function Flower({ cx, cy, r, opacity = 0.6 }: { cx: number; cy: number; r: number; opacity?: number }) {
  const pr = r * 0.95
  const pw = r * 0.4
  return (
    <g opacity={opacity}>
      {[0, 1, 2, 3, 4].map(i => (
        <ellipse key={i} cx={0} cy={-pr} rx={pw} ry={pr}
          transform={`translate(${cx},${cy}) rotate(${i * 72})`} fill="#FFF8F0" />
      ))}
      {[0, 1, 2, 3, 4].map(i => (
        <ellipse key={i} cx={0} cy={-pr * 0.55} rx={pw * 0.6} ry={pr * 0.5}
          transform={`translate(${cx},${cy}) rotate(${i * 72 + 36})`} fill="#FFE8F2" opacity={0.7} />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.3} fill="#D4A85390" />
      <circle cx={cx} cy={cy} r={r * 0.14} fill="#FFD0A0" />
    </g>
  )
}

export default function FloralDivider({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center justify-center py-2 ${className}`}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg width="360" height="54" viewBox="0 0 360 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left vine */}
        <path
          d="M8,28 C28,16 55,34 80,24 C102,16 118,24 138,26"
          stroke="#C41E3A22" strokeWidth="1.3" strokeLinecap="round" fill="none"
        />
        {/* Left leaf pair */}
        <ellipse cx="60"  cy="20" rx="7" ry="2.8" transform="rotate(-22 60 20)"  fill="#3A6A3A" opacity="0.22" />
        <ellipse cx="100" cy="20" rx="6" ry="2.4" transform="rotate(16 100 20)" fill="#3A6A3A" opacity="0.18" />
        {/* Left small bud */}
        <Flower cx={30}  cy={28} r={4.5} opacity={0.42} />
        {/* Left medium flower */}
        <Flower cx={115} cy={26} r={6}   opacity={0.48} />

        {/* Centre large flower */}
        <Flower cx={180} cy={27} r={10}  opacity={0.82} />
        {/* Tiny sparkle dots around centre */}
        {[[-14,-8],[14,-8],[-10,12],[10,12],[0,-16]].map(([dx,dy],i) => (
          <circle key={i} cx={180+dx} cy={27+dy} r={1.2} fill="#FFF8F0" opacity={0.45} />
        ))}

        {/* Right vine (mirror) */}
        <path
          d="M352,28 C332,16 305,34 280,24 C258,16 242,24 222,26"
          stroke="#C41E3A22" strokeWidth="1.3" strokeLinecap="round" fill="none"
        />
        <ellipse cx="300" cy="20" rx="7" ry="2.8" transform="rotate(22 300 20)"  fill="#3A6A3A" opacity="0.22" />
        <ellipse cx="260" cy="20" rx="6" ry="2.4" transform="rotate(-16 260 20)" fill="#3A6A3A" opacity="0.18" />
        <Flower cx={330} cy={28} r={4.5} opacity={0.42} />
        <Flower cx={245} cy={26} r={6}   opacity={0.48} />
      </svg>
    </motion.div>
  )
}
