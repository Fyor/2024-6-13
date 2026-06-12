'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import QuizQuestionCard from './QuizQuestion'
import { quizQuestions } from '@/data/quiz'
import dynamic from 'next/dynamic'

const ParticleField = dynamic(() => import('@/components/ui/ParticleField'), { ssr: false })

export default function QuizContainer() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  const handleAnswer = (value: string) => {
    setSelected(value)
    setTimeout(() => {
      setAnswers([...answers, value])
      setSelected(null)
      if (step < quizQuestions.length - 1) {
        setStep(step + 1)
      } else {
        router.push('/map')
      }
    }, 650)
  }

  const progress = (step / quizQuestions.length) * 100

  return (
    <div className="min-h-screen bg-void relative overflow-hidden">
      {/* Background particles — sparse and subtle */}
      <div className="absolute inset-0 opacity-20">
        <ParticleField count={160} heartSide="center" />
      </div>

      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-20 h-px bg-wine/30">
        <motion.div
          className="h-full bg-crimson"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Step dots */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {quizQuestions.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={{
              width: i === step ? 24 : 6,
              height: 6,
              backgroundColor: i <= step ? '#C41E3A' : '#3A0810',
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Questions with page slide transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 80, filter: 'blur(4px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -80, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <QuizQuestionCard
            question={quizQuestions[step]}
            onAnswer={handleAnswer}
            selected={selected}
            step={step}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
