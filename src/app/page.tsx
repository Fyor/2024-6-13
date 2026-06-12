import HeroSection from '@/components/anniversary/HeroSection'
import MemorySection from '@/components/anniversary/MemorySection'
import DecideButton from '@/components/anniversary/DecideButton'
import { photos } from '@/data/photos'

// Edit these captions to match your photos.
// They pair in order with photos sorted by date.
// Add more entries here as you upload more photos.
const CAPTIONS = [
  {
    caption: 'Our first surprise adventure together!',
    subcaption:
      'I will for always remember cutting up your korv, hihihihi. It was the best start of our time together.',
  },
  {
    caption: 'The emo party at KB when I still lived in Skövde',
    subcaption:
      'It was so fun going out with you as my girl and WOW you looked so gorgeous that evening. That kiss on my neck I can still feel to this day.',
  },
  {
    caption: 'We have had a loooot of fun together!',
  },
  {
    caption: 'When we went to Liseberg',
    subcaption:
      'I will never be able to forget that haunted house, walking behind you scared out of my mind. And I still have your drivers license.',
  },
  {
    caption: 'Oink oink, we did a lot of horsing around. All over Sweden!!',
    subcaption:
      'This was our trip when I finally asked you to be my girlfriend! Sexdrega will for ever be ours. And that bridge will be where our love will be locked forever!!!',
  },
  {
    caption: 'Our Amsterdam time together to the museum',
    subcaption:
      'Even in this format I can still see us soo clearly and even here you are STUNNING',
  },
  {
    caption: 'Bzzzzz doing some beekeeping together',
    subcaption:
      'I am still so happy you came with to my first try out of the bee game app and doing this together was super fun.',
  },
  {
    caption: 'Our first "Sinterklaas dag" together hihihihi. AND our first christmas.',
    subcaption:
      'Christmas time with you was super special! Picking out the tree together and then taking it home on the bike. WE ARE SOOO DUTCH',
  },
  {
    caption: "Stockholm trip at Daniela's place",
    subcaption:
      'That coffee together, exploring the city and that sushi mhmmmm soo good! Even the time we spend inside together was only lovely.',
  },
  {
    caption: 'Going to Netherlands for Christmas with my family!',
    subcaption:
      'Our first flight together (I think) and from Linköping of all places. Then we got to do so much in the Netherlands.',
  },
  {
    caption:
      "Our first anniversary together, recreating our trip from that year before. And now we are in the wonky cat house. I can't wait for even more adventures together.",
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
