'use client'
import { motion } from 'framer-motion'
import type { QuizQuestion } from '@/lib/types'

interface QuizQuestionProps {
  question: QuizQuestion
  onAnswer: (value: string) => void
  selected: string | null
}

export default function QuizQuestionCard({ question, onAnswer, selected }: QuizQuestionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        <motion.p
          className="text-xs uppercase tracking-[0.3em] text-blush/60 font-body text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {question.subtext}
        </motion.p>

        <motion.h2
          className="font-display text-3xl md:text-4xl text-ink text-center leading-snug mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {question.question}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {question.options.map((option, i) => {
            const isSelected = selected === option.value
            return (
              <motion.button
                key={option.value}
                onClick={() => onAnswer(option.value)}
                className={`
                  relative p-5 rounded-xl border text-left font-body text-base transition-all duration-200
                  ${
                    isSelected
                      ? 'border-gold bg-gold/10 text-ink shadow-md'
                      : 'border-parchment bg-parchment/60 text-ink/70 hover:border-blush/40 hover:bg-blossom/10 hover:text-ink'
                  }
                `}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.07 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-gold"
                    layoutId="selection"
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className="relative z-10">{option.label}</span>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
