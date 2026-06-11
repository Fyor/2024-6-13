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
    <div className="border border-blush/30 rounded-xl p-5 bg-parchment/60">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs uppercase tracking-widest text-blush font-body font-bold border border-blush/40 rounded px-2 py-0.5">
          {guide.language}
        </span>
        <span className="text-xs text-ink/40 font-body italic">Handy phrases</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <span className="text-sm text-ink/60 font-body min-w-[110px]">Gluten Free</span>
          <span className="text-sm font-display font-semibold text-ink text-right">
            {guide.glutenFree}
          </span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-sm text-ink/60 font-body min-w-[110px]">Without Nuts</span>
          <span className="text-sm font-display font-semibold text-ink text-right">
            {guide.withoutNuts}
          </span>
        </div>
      </div>

      {guide.phonetic && (
        <p className="mt-4 pt-3 border-t border-blush/20 text-xs italic text-ink/50 font-body">
          {guide.phonetic}
        </p>
      )}
    </div>
  )
}
