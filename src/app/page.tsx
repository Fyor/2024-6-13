import HeroSection from '@/components/anniversary/HeroSection'
import MemorySection from '@/components/anniversary/MemorySection'
import DecideButton from '@/components/anniversary/DecideButton'
import { photos } from '@/data/photos'

// Edit these captions to match your photos.
// They pair in order with photos sorted by date.
// Add more entries here as you upload more photos.
const CAPTIONS = [
  {
    caption: 'The morning we decided to make it official',
    subcaption:
      'Some decisions feel impossible until suddenly they feel inevitable. That was one of those.',
  },
  {
    caption: "That corner café we said we'd always go back to",
    subcaption:
      'We were there two hours longer than we planned. It felt like exactly the right amount of time.',
  },
  {
    caption: 'When everything felt like it was exactly right',
    subcaption:
      'There are moments you recognize only in hindsight. I recognized this one in real time.',
  },
  {
    caption: 'The little routines we built without noticing',
    subcaption: 'Somehow the smallest rituals became the things I look forward to most.',
  },
  {
    caption: "Two years. And I'd choose every single moment again.",
    subcaption: 'Happy anniversary, Adelin.',
  },
]

const GRADIENTS = [
  { from: 'from-deep-wine', via: 'via-wine/60',      to: 'to-void'     },
  { from: 'from-wine/80',   via: 'via-crimson/20',   to: 'to-void'     },
  { from: 'from-crimson/30',via: 'via-wine/50',      to: 'to-void'     },
  { from: 'from-deep-wine', via: undefined,           to: 'to-midnight' },
  { from: 'from-crimson/40',via: 'via-rose-red/20',  to: 'to-void'     },
]

export default function HomePage() {
  const count = Math.max(photos.length, CAPTIONS.length)

  return (
    <main className="bg-void">
      <HeroSection />

      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="h-px bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto">
        {Array.from({ length: count }, (_, i) => {
          const caption = CAPTIONS[i]
          const photo   = photos[i]
          const grad    = GRADIENTS[i % GRADIENTS.length]
          return (
            <MemorySection
              key={i}
              index={i}
              caption={caption?.caption ?? ''}
              subcaption={caption?.subcaption}
              align={i % 2 === 0 ? 'left' : 'right'}
              gradientFrom={grad.from}
              gradientVia={grad.via}
              gradientTo={grad.to}
              imageSrc={photo?.src}
              dateLabel={photo?.label}
            />
          )
        })}
      </div>

      <DecideButton />
    </main>
  )
}
