import { Suspense } from 'react'
import RevealScreen from '@/components/reveal/RevealScreen'

export default function RevealPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <p className="font-body text-ink/30 animate-pulse">A moment...</p>
        </div>
      }
    >
      <RevealScreen />
    </Suspense>
  )
}
