'use client'
import { motion } from 'framer-motion'

interface SimsBarProps {
  label: string
  value: number
  colorClass?: string
  delay?: number
}

const colorMap: Record<string, string> = {
  food: 'bg-gold',
  culture: 'bg-crimson',
  activities: 'bg-rose-red',
  romance: 'bg-petal',
  ease: 'bg-ember',
}

export default function SimsBar({ label, value, colorClass, delay = 0 }: SimsBarProps) {
  const barColor = colorClass ?? colorMap[label.toLowerCase().split(' ')[0]] ?? 'bg-crimson'

  return (
    <div className="mb-4">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-xs font-body text-ash/80 tracking-[0.08em] uppercase">{label}</span>
        <span className="text-xs font-body text-dusk tabular-nums">{value}/100</span>
      </div>
      <div className="h-2 bg-midnight rounded-full overflow-hidden border border-wine/30">
        <motion.div
          className={`h-full ${barColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.3, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}
