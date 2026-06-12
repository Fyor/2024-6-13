'use client'
import { motion } from 'framer-motion'

// Multi-layer SVG rose (matches FloatingPetals palette)
function Rose({ cx, cy, r, opacity = 0.9 }: { cx: number; cy: number; r: number; opacity?: number }) {
  const colors = { outer: '#C41E3A', mid: '#D4205A', inner: '#E63950', centre: '#9A1228', stamen: '#FFD6A0' }
  return (
    <g opacity={opacity} transform={`translate(${cx},${cy})`}>
      {[0,1,2,3,4].map(i => (
        <ellipse key={`o${i}`} cx={0} cy={-r*0.85} rx={r*0.54} ry={r*0.85}
          transform={`rotate(${i * 72})`} fill={colors.outer} opacity={0.65} />
      ))}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`m${i}`} cx={0} cy={-r*0.58} rx={r*0.42} ry={r*0.6}
          transform={`rotate(${i * 72 + 36})`} fill={colors.mid} opacity={0.82} />
      ))}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`i${i}`} cx={0} cy={-r*0.32} rx={r*0.27} ry={r*0.36}
          transform={`rotate(${i * 72 + 18})`} fill={colors.inner} opacity={0.95} />
      ))}
      <circle r={r*0.2} fill={colors.centre} />
      <circle r={r*0.09} fill={colors.stamen} opacity={0.8} />
    </g>
  )
}

// Small leaf
function Leaf({ cx, cy, rx, ry, rotate }: { cx: number; cy: number; rx: number; ry: number; rotate: number }) {
  return (
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry}
      transform={`rotate(${rotate} ${cx} ${cy})`} fill="#3A6A3A" opacity={0.28} />
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
      <svg width="360" height="60" viewBox="0 0 360 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left vine */}
        <path
          d="M8,30 C28,18 55,36 80,26 C102,18 118,26 140,28"
          stroke="#C41E3A28" strokeWidth="1.3" strokeLinecap="round" fill="none"
        />
        {/* Left leaves */}
        <Leaf cx={58} cy={22} rx={7} ry={2.8} rotate={-22} />
        <Leaf cx={102} cy={22} rx={6} ry={2.4} rotate={16} />
        {/* Left small rose */}
        <Rose cx={30} cy={30} r={4.5} opacity={0.55} />
        {/* Left medium rose */}
        <Rose cx={118} cy={28} r={6} opacity={0.65} />

        {/* Centre large rose */}
        <Rose cx={180} cy={29} r={11} opacity={0.95} />
        {/* Sparkle dots around centre */}
        {[[-16,-9],[16,-9],[-11,13],[11,13],[0,-18]].map(([dx,dy],i) => (
          <circle key={i} cx={180+dx} cy={29+dy} r={1.2} fill="#FF9DB2" opacity={0.55} />
        ))}

        {/* Right vine (mirror) */}
        <path
          d="M352,30 C332,18 305,36 280,26 C258,18 242,26 220,28"
          stroke="#C41E3A28" strokeWidth="1.3" strokeLinecap="round" fill="none"
        />
        <Leaf cx={302} cy={22} rx={7} ry={2.8} rotate={22} />
        <Leaf cx={258} cy={22} rx={6} ry={2.4} rotate={-16} />
        <Rose cx={330} cy={30} r={4.5} opacity={0.55} />
        <Rose cx={242} cy={28} r={6} opacity={0.65} />
      </svg>
    </motion.div>
  )
}
