import type { QuizQuestion } from '@/lib/types'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which weekend do you have free?',
    subtext: 'Just asking for a friend 😇',
    options: [
      { label: '26–28 June', value: 'jun-26' },
      { label: '3–5 July', value: 'jul-3' },
      { label: '17–19 July', value: 'jul-17' },
      { label: '31 July – 2 August', value: 'jul-31' },
    ],
  },
  {
    id: 2,
    question: 'What cuisine do you love most?',
    subtext: 'Your answer may or may not be used as research 🔍',
    options: [
      { label: 'French & European', value: 'french' },
      { label: 'Italian & Mediterranean', value: 'italian' },
      { label: 'Local & Traditional', value: 'local' },
      { label: 'Asian & Fusion', value: 'asian' },
    ],
  },
  {
    id: 3,
    question: "What's your ideal weekend activity?",
    subtext: "I'm asking for a very specific reason I can't tell you yet.",
    options: [
      { label: 'Exploring a new city', value: 'city' },
      { label: 'Nature & the outdoors', value: 'nature' },
      { label: 'Museums & culture', value: 'culture' },
      { label: 'Romantic dinners & cafés', value: 'romance' },
    ],
  },
  {
    id: 4,
    question: 'How far would you go... for adventure?',
    subtext: 'Totally normal question. Nothing suspicious here.',
    options: [
      { label: 'Close to home', value: 'short' },
      { label: 'A short flight away', value: 'medium' },
      { label: 'Far and beyond', value: 'long' },
      { label: 'Distance is irrelevant', value: 'any' },
    ],
  },
]
