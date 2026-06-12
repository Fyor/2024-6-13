import { flagUrl } from '@/lib/flagUrl'

interface Props {
  flag: string
  size: number
  className?: string
}

export default function FlagEmoji({ flag, size, className = '' }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={flagUrl(flag)}
      alt={flag}
      width={size}
      height={size}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    />
  )
}
