const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function flagUrl(flag: string): string {
  const cc = [...flag]
    .map(c => String.fromCharCode(c.codePointAt(0)! - 0x1F1E6 + 65))
    .join('')
    .toLowerCase()
  return `${BASE}/flags/${cc}.svg`
}
