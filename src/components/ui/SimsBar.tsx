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
  culture: 'bg-blush',
  activities: 'bg-amber',
  romance: 'bg-wine',
  ease: 'bg-champagne',
}

export default function SimsBar({ label, value, colorClass, delay = 0 }: SimsBarProps) {
  const barColor = colorClass ?? colorMap[label.toLowerCase().split(' ')[0]] ?? 'bg-blush'

  return (
    <div className="mb-4">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm font-body text-ink/70 tracking-wide uppercase">{label}</span>
        <span className="text-xs font-body text-ink/40 tabular-nums">{value}/100</span>
      </div>
      <div className="h-2.5 bg-parchment rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${barColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}
