import HeroSection from '@/components/anniversary/HeroSection'
import MemorySection from '@/components/anniversary/MemorySection'
import DecideButton from '@/components/anniversary/DecideButton'

const memories = [
  {
    caption: 'The morning we decided to make it official',
    subcaption:
      'Some decisions feel impossible until suddenly they feel inevitable. That was one of those.',
    gradientFrom: 'from-deep-wine',
    gradientVia: 'via-wine/60',
    gradientTo: 'to-void',
    align: 'left' as const,
  },
  {
    caption: "That corner café we said we'd always go back to",
    subcaption:
      'We were there two hours longer than we planned. It felt like exactly the right amount of time.',
    gradientFrom: 'from-wine/80',
    gradientVia: 'via-crimson/20',
    gradientTo: 'to-void',
    align: 'right' as const,
  },
  {
    caption: 'When everything felt like it was exactly right',
    subcaption:
      'There are moments you recognize only in hindsight. I recognized this one in real time.',
    gradientFrom: 'from-crimson/30',
    gradientVia: 'via-wine/50',
    gradientTo: 'to-void',
    align: 'left' as const,
  },
  {
    caption: 'The little routines we built without noticing',
    subcaption: 'Somehow the smallest rituals became the things I look forward to most.',
    gradientFrom: 'from-deep-wine',
    gradientTo: 'to-midnight',
    align: 'right' as const,
  },
  {
    caption: "Two years. And I'd choose every single moment again.",
    subcaption: 'Happy anniversary, Adelin.',
    gradientFrom: 'from-crimson/40',
    gradientVia: 'via-rose-red/20',
    gradientTo: 'to-void',
    align: 'left' as const,
  },
]

export default function HomePage() {
  return (
    <main className="bg-void">
      <HeroSection />

      {/* Section divider */}
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="h-px bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto">
        {memories.map((memory, i) => (
          <MemorySection
            key={i}
            index={i}
            caption={memory.caption}
            subcaption={memory.subcaption}
            align={memory.align}
            gradientFrom={memory.gradientFrom}
            gradientVia={memory.gradientVia}
            gradientTo={memory.gradientTo}
          />
        ))}
      </div>

      <DecideButton />
    </main>
  )
}
