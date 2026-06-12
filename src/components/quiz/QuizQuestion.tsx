'use client'
import { motion } from 'framer-motion'
import type { QuizQuestion } from '@/lib/types'

interface QuizQuestionProps {
  question: QuizQuestion
  onAnswer: (value: string) => void
  selected: string | null
  step: number
}

export default function QuizQuestionCard({ question, onAnswer, selected, step }: QuizQuestionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative">
      {/* Subtle top eyebrow */}
      <motion.div
        className="mb-12 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.6 }}
      >
        <div className="w-5 h-px bg-crimson/40" />
        <p className="text-[11px] uppercase tracking-[0.25em] text-dusk font-body font-semibold">
          {question.subtext}
        </p>
        <div className="w-5 h-px bg-crimson/40" />
      </motion.div>

      {/* Question */}
      <motion.h2
        className="font-display text-3xl md:text-5xl text-cream text-center leading-snug mb-14 max-w-xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.6 }}
      >
        {question.question}
      </motion.h2>

      {/* Options */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.22, duration: 0.5 }}
      >
        {question.options.map((option, i) => {
          const isSelected = selected === option.value
          return (
            <motion.button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className={`
                relative p-5 rounded-2xl border text-left font-body text-sm font-medium tracking-wide
                transition-all duration-250 overflow-hidden
                ${
                  isSelected
                    ? 'border-crimson bg-crimson/10 text-cream'
                    : 'border-wine/50 bg-midnight/50 text-ash hover:border-crimson/50 hover:bg-midnight hover:text-cream'
                }
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 + i * 0.07 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Glow on selected */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{ boxShadow: '0 0 20px #C41E3A44 inset' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <span className="relative z-10">{option.label}</span>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Step hint for increasing tension */}
      {step >= 2 && (
        <motion.p
          className="mt-10 text-xs text-crimson/40 font-body italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {step === 2 ? '...are you starting to see it?' : 'something is definitely happening.'}
        </motion.p>
      )}
    </div>
  )
}
