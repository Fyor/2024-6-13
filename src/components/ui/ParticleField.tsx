'use client'
import { useEffect, useRef } from 'react'

const COLORS = ['#C41E3A', '#E63950', '#FF9DB2', '#D4A853', '#FFF8F066', '#FF9DB255']

interface Particle {
  x: number
  y: number
  tx: number
  ty: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  alphaDelta: number
  shape: 0 | 1 | 2
  rotation: number
  rotSpeed: number
}

function heartPoint(t: number, cx: number, cy: number, scale: number): [number, number] {
  const x = 16 * Math.pow(Math.sin(t), 3)
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
  return [cx + x * scale, cy + y * scale]
}

function drawShape(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)
  ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha))
  ctx.fillStyle = p.color

  if (p.shape === 0) {
    ctx.beginPath()
    ctx.arc(0, 0, p.size, 0, Math.PI * 2)
    ctx.fill()
  } else if (p.shape === 1) {
    const s = p.size * 0.9
    ctx.beginPath()
    ctx.moveTo(0, -s)
    ctx.lineTo(s * 0.6, 0)
    ctx.lineTo(0, s)
    ctx.lineTo(-s * 0.6, 0)
    ctx.closePath()
    ctx.fill()
  } else {
    ctx.beginPath()
    ctx.ellipse(0, 0, p.size * 0.35, p.size * 1.4, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}

interface ParticleFieldProps {
  count?: number
  className?: string
  heartSide?: 'left' | 'right' | 'center'
}

export default function ParticleField({
  count = 480,
  className = '',
  heartSide = 'right',
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<{ particles: Particle[]; raf: number; W: number; H: number }>({
    particles: [],
    raf: 0,
    W: 0,
    H: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const init = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
      stateRef.current.W = W
      stateRef.current.H = H

      const cx =
        heartSide === 'left' ? W * 0.3 : heartSide === 'right' ? W * 0.68 : W * 0.5
      const cy = H * 0.45
      const scale = Math.min(W, H) * 0.036

      const heartCount = Math.floor(count * 0.65)
      const freeCount = count - heartCount
      const particles: Particle[] = []

      for (let i = 0; i < heartCount; i++) {
        const t = (i / heartCount) * Math.PI * 2
        const [tx, ty] = heartPoint(t, cx, cy, scale)
        const jitter = scale * 0.6
        particles.push({
          x: tx + (Math.random() - 0.5) * W * 0.6,
          y: ty + (Math.random() - 0.5) * H * 0.6,
          tx: tx + (Math.random() - 0.5) * jitter,
          ty: ty + (Math.random() - 0.5) * jitter,
          vx: 0,
          vy: 0,
          size: Math.random() * 3.5 + 1.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: Math.random() * 0.55 + 0.15,
          alphaDelta: (Math.random() - 0.5) * 0.004,
          shape: ([0, 0, 1, 2] as (0 | 1 | 2)[])[Math.floor(Math.random() * 4)],
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.025,
        })
      }

      for (let i = 0; i < freeCount; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          tx: Math.random() * W,
          ty: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.8 + 0.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: Math.random() * 0.25 + 0.04,
          alphaDelta: (Math.random() - 0.5) * 0.003,
          shape: 0,
          rotation: 0,
          rotSpeed: 0,
        })
      }

      stateRef.current.particles = particles
    }

    const animate = () => {
      const { W, H, particles } = stateRef.current
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        const dx = p.tx - p.x
        const dy = p.ty - p.y
        const dist = Math.sqrt(dx * dx + dy * dy) + 1
        const force = Math.min(dist * 0.007, 0.35)
        p.vx += (dx / dist) * force + (Math.random() - 0.5) * 0.05
        p.vy += (dy / dist) * force + (Math.random() - 0.5) * 0.05
        p.vx *= 0.93
        p.vy *= 0.93
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotSpeed
        p.alpha += p.alphaDelta
        if (p.alpha < 0.04 || p.alpha > 0.72) p.alphaDelta *= -1
        drawShape(ctx, p)
      }

      stateRef.current.raf = requestAnimationFrame(animate)
    }

    init()
    animate()

    const onResize = () => init()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(stateRef.current.raf)
    }
  }, [count, heartSide])

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} aria-hidden="true" />
}
