'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import QuizQuestionCard from './QuizQuestion'
import { quizQuestions } from '@/data/quiz'

export default function QuizContainer() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  const currentQuestion = quizQuestions[step]

  const handleAnswer = (value: string) => {
    setSelected(value)

    setTimeout(() => {
      const newAnswers = [...answers, value]
      setAnswers(newAnswers)
      setSelected(null)

      if (step < quizQuestions.length - 1) {
        setStep(step + 1)
      } else {
        router.push('/map')
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-cream relative">
      {/* Progress dots */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
        {quizQuestions.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === step
                ? 'w-6 h-2 bg-gold'
                : i < step
                  ? 'w-2 h-2 bg-gold/60'
                  : 'w-2 h-2 bg-parchment border border-gold/20'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <QuizQuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            selected={selected}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
