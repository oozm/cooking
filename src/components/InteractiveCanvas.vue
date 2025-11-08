<template>
  <canvas
    ref="canvasRef"
    class="w-full h-full rounded-xl"
    :style="{ minHeight: '400px' }"
  ></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let time = 0

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

const particles: Particle[] = []
const particleCount = 100

const initParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  particles.length = 0

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: 2 + Math.random() * 3,
      color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff',
    })
  }
}

const getColor = (ratio: number): string => {
  // 从青色渐变到洋红色
  const r = Math.floor(ratio * 255)
  const g = Math.floor((1 - ratio) * 255)
  const b = 255
  return `rgb(${r}, ${g}, ${b})`
}

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.clientWidth
  const height = canvas.clientHeight

  canvas.width = width
  canvas.height = height

  ctx.clearRect(0, 0, width, height)

  time += 0.01

  // 更新和绘制粒子
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    // 更新位置
    p.x += p.vx
    p.y += p.vy

    // 边界反弹
    if (p.x < 0 || p.x > width) p.vx *= -1
    if (p.y < 0 || p.y > height) p.vy *= -1

    // 限制在画布内
    p.x = Math.max(0, Math.min(width, p.x))
    p.y = Math.max(0, Math.min(height, p.y))

    // 绘制粒子
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3)
    gradient.addColorStop(0, p.color)
    gradient.addColorStop(0.5, p.color + '80')
    gradient.addColorStop(1, p.color + '00')

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
    ctx.fill()

    // 绘制连接线
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      const dx = p2.x - p.x
      const dy = p2.y - p.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 150) {
        const opacity = (1 - distance / 150) * 0.3
        const ratio = distance / 150
        ctx.strokeStyle = getColor(ratio) + Math.floor(opacity * 255).toString(16).padStart(2, '0')
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }
  }

  // 绘制中心波形
  const centerY = height / 2
  ctx.strokeStyle = getColor(0.5)
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let x = 0; x < width; x += 2) {
    const y = centerY + Math.sin((x / width) * Math.PI * 4 + time * 2) * 30
    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()

  animationId = requestAnimationFrame(draw)
}

const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.clientWidth
  const height = canvas.clientHeight

  initParticles(ctx, width, height)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.clientWidth
  const height = canvas.clientHeight

  initParticles(ctx, width, height)
  draw()

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

