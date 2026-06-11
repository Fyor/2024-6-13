export interface Destination {
  id: string
  name: string
  city: string
  flag: string
  tagline: string
  description: string
  ratings: {
    food: number
    culture: number
    activities: number
    romance: number
    ease: number
  }
  activities: string[]
  foodHighlights: string[]
  languageGuide: {
    language: string
    glutenFree: string
    withoutNuts: string
    phonetic?: string
  }
  mapCoords: { x: string; y: string }
  coverColor: string
}

export interface QuizQuestion {
  id: number
  question: string
  subtext: string
  options: { label: string; value: string }[]
}
