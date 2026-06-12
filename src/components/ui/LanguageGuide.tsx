interface LanguageGuideProps {
  guide: {
    language: string
    glutenFree: string
    withoutNuts: string
    phonetic?: string
  }
}

export default function LanguageGuide({ guide }: LanguageGuideProps) {
  return (
    <div className="border border-crimson/20 rounded-2xl p-5 bg-midnight/60 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] uppercase tracking-[0.15em] text-crimson font-body font-semibold border border-crimson/40 rounded-full px-3 py-1">
          {guide.language}
        </span>
        <span className="text-xs text-dusk font-body italic">Allergy phrases</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <span className="text-sm text-ash/70 font-body min-w-[110px] tracking-wide">Gluten Free</span>
          <span className="text-sm font-display font-semibold text-cream text-right">{guide.glutenFree}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-sm text-ash/70 font-body min-w-[110px] tracking-wide">Without Nuts</span>
          <span className="text-sm font-display font-semibold text-cream text-right">{guide.withoutNuts}</span>
        </div>
      </div>

      {guide.phonetic && (
        <p className="mt-4 pt-3 border-t border-wine/30 text-xs italic text-dusk font-body">
          {guide.phonetic}
        </p>
      )}
    </div>
  )
}
