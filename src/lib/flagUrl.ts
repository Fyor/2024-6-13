export function flagUrl(flag: string): string {
  const codePoints = [...flag].map(c => c.codePointAt(0)!.toString(16))
  return `https://cdn.jsdelivr.net/npm/twemoji@14.0.2/assets/svg/${codePoints.join('-')}.svg`
}
