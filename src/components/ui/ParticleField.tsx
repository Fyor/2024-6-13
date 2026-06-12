'use client'
import { useEffect, useRef } from 'react'

const COLORS = ['#C41E3A', '#E63950', '#FF9DB2', '#D4A853', '#FF9DB2BB', '#C41E3ABB', '#FFF8F044']

interface Particle {
  x: number; y: number
  tx: number; ty: number
  origTx: number; origTy: number
  vx: number; vy: number
  size: number; color: string
  alpha: number; alphaDelta: number
  shape: 0 | 1 | 2
  rotation: number; rotSpeed: number
}

function heartPoint(t: number, cx: number, cy: number, scale: number): [number, number] {
  const x =  16 * Math.pow(Math.sin(t), 3)
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
  return [cx + x * scale, cy + y * scale]
}

function drawShape(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)
  ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha))
  ctx.fillStyle = p.color
  // Glow effect for heart particles (larger shapes)
  if (p.size > 2.5) {
    ctx.shadowBlur = p.size * 3.5
    ctx.shadowColor = p.color
  }
  if (p.shape === 0) {
    ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 2); ctx.fill()
  } else if (p.shape === 1) {
    const s = p.size * 0.9
    ctx.beginPath(); ctx.moveTo(0,-s); ctx.lineTo(s*0.6,0); ctx.lineTo(0,s); ctx.lineTo(-s*0.6,0); ctx.closePath(); ctx.fill()
  } else {
    ctx.beginPath(); ctx.ellipse(0, 0, p.size*0.35, p.size*1.4, 0, 0, Math.PI*2); ctx.fill()
  }
  ctx.restore()
}

interface ParticleFieldProps {
  count?: number
  className?: string
  heartSide?: 'left' | 'right' | 'center'
  scrollContainer?: React.RefObject<HTMLElement | null>
}

export default function ParticleField({
  count = 520,
  className = '',
  heartSide = 'right',
}: ParticleFieldProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const stateRef   = useRef<{
    particles: Particle[]
    raf: number
    W: number; H: number
    cx: number; cy: number
    scattered: boolean
    scatterProg: number   // 0 = heart, 1 = fully scattered (smooth lerp)
  }>({ particles: [], raf: 0, W: 0, H: 0, cx: 0, cy: 0, scattered: false, scatterProg: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const init = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      canvas.width  = W * window.devicePixelRatio
      canvas.height = H * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      stateRef.current.W = W
      stateRef.current.H = H

      const cx = heartSide === 'left' ? W * 0.3 : heartSide === 'right' ? W * 0.68 : W * 0.5
      const cy = H * 0.44
      stateRef.current.cx = cx
      stateRef.current.cy = cy
      const scale = Math.min(W, H) * 0.038

      const heartCount = Math.floor(count * 0.68)
      const freeCount  = count - heartCount
      const particles: Particle[] = []

      for (let i = 0; i < heartCount; i++) {
        const t = (i / heartCount) * Math.PI * 2
        const [tx, ty] = heartPoint(t, cx, cy, scale)
        const jitter = scale * 0.5
        const origTx = tx + (Math.random() - 0.5) * jitter
        const origTy = ty + (Math.random() - 0.5) * jitter
        particles.push({
          x: origTx + (Math.random() - 0.5) * W * 0.5,
          y: origTy + (Math.random() - 0.5) * H * 0.5,
          tx: origTx, ty: origTy,
          origTx, origTy,
          vx: 0, vy: 0,
          size: Math.random() * 4 + 1.4,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: Math.random() * 0.65 + 0.2,
          alphaDelta: (Math.random() - 0.5) * 0.005,
          shape: ([0, 0, 0, 1, 2] as (0|1|2)[])[Math.floor(Math.random() * 5)],
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.022,
        })
      }

      for (let i = 0; i < freeCount; i++) {
        particles.push({
          x: Math.random() * W, y: Math.random() * H,
          tx: Math.random() * W, ty: Math.random() * H,
          origTx: 0, origTy: 0,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.6 + 0.4,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: Math.random() * 0.2 + 0.03,
          alphaDelta: (Math.random() - 0.5) * 0.003,
          shape: 0, rotation: 0, rotSpeed: 0,
        })
      }

      stateRef.current.particles = particles
    }

    // Store scatter targets per particle (assigned once on scatter trigger)
    const scatterTargets = new WeakMap<Particle, { tx: number; ty: number }>()

    const triggerScatter = () => {
      const { particles, cx, cy } = stateRef.current
      stateRef.current.scattered = true
      particles.forEach(p => {
        const angle = Math.atan2(p.y - cy, p.x - cx) + (Math.random() - 0.5) * 1.2
        const dist  = 900 + Math.random() * 1200
        scatterTargets.set(p, { tx: p.x + Math.cos(angle) * dist, ty: p.y + Math.sin(angle) * dist })
        // Immediate velocity burst
        p.vx += Math.cos(angle) * (6 + Math.random() * 8)
        p.vy += Math.sin(angle) * (6 + Math.random() * 8)
      })
    }

    const triggerReform = () => {
      stateRef.current.scattered = false
      // Restore heart targets
      stateRef.current.particles.forEach(p => {
        if (p.origTx !== 0 || p.origTy !== 0) {
          p.tx = p.origTx
          p.ty = p.origTy
        }
      })
    }

    // Scroll handler
    const onScroll = () => {
      const sy = window.scrollY
      const threshold = window.innerHeight * 0.15
      if (sy > threshold && !stateRef.current.scattered) triggerScatter()
      if (sy < 20 && stateRef.current.scattered) triggerReform()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const animate = () => {
      const { W, H, particles, scattered } = stateRef.current
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        let targetX = p.tx
        let targetY = p.ty

        if (scattered) {
          const st = scatterTargets.get(p)
          if (st) { targetX = st.tx; targetY = st.ty }
          // High-speed chase when scattered
          const dx = targetX - p.x
          const dy = targetY - p.y
          const dist = Math.sqrt(dx*dx + dy*dy) + 1
          const force = Math.min(dist * 0.012, 1.2)
          p.vx += (dx/dist) * force
          p.vy += (dy/dist) * force
          p.vx *= 0.88   // less damping → faster movement
          p.vy *= 0.88
          // Fade out as they scatter
          if (dist > 400) p.alpha = Math.max(0, p.alpha - 0.01)
        } else {
          // Normal spring toward target
          const dx = targetX - p.x
          const dy = targetY - p.y
          const dist = Math.sqrt(dx*dx + dy*dy) + 1
          const force = Math.min(dist * 0.007, 0.38)
          p.vx += (dx/dist) * force + (Math.random() - 0.5) * 0.04
          p.vy += (dy/dist) * force + (Math.random() - 0.5) * 0.04
          p.vx *= 0.93
          p.vy *= 0.93
          // Restore alpha
          if (p.alpha < (p.origTx !== 0 ? 0.2 : 0.04)) p.alpha = Math.min(1, p.alpha + 0.008)
        }

        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotSpeed

        if (!scattered) {
          p.alpha += p.alphaDelta
          if (p.alpha < 0.04 || p.alpha > 0.78) p.alphaDelta *= -1
        }

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
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(stateRef.current.raf)
    }
  }, [count, heartSide])

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} aria-hidden="true" />
}
