<template>
  <div class="w-full h-full min-h-[400px] relative">
    <svg
      ref="svgRef"
      class="w-full h-full"
      viewBox="0 0 800 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 渐变定义 -->
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #00ffff; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #ff00ff; stop-opacity: 1" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color: #00ffff; stop-opacity: 0.8" />
          <stop offset="50%" style="stop-color: #ff00ff; stop-opacity: 0.8" />
          <stop offset="100%" style="stop-color: #00ffff; stop-opacity: 0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- 网格线 -->
      <g opacity="0.3">
        <line
          v-for="i in 20"
          :key="'h' + i"
          :x1="0"
          :y1="(i * 400) / 20"
          :x2="800"
          :y2="(i * 400) / 20"
          stroke="url(#grad1)"
          stroke-width="0.5"
        />
        <line
          v-for="i in 40"
          :key="'v' + i"
          :x1="(i * 800) / 40"
          :y1="0"
          :x2="(i * 800) / 40"
          :y2="400"
          stroke="url(#grad1)"
          stroke-width="0.5"
        />
      </g>

      <!-- 中心六边形 -->
      <polygon
        :points="hexagonPoints"
        fill="none"
        stroke="url(#grad1)"
        stroke-width="3"
        filter="url(#glow)"
        class="animate-spin-slow"
        transform-origin="400 200"
      />

      <!-- 旋转的圆环 -->
      <circle
        cx="400"
        cy="200"
        :r="radius1"
        fill="none"
        stroke="url(#grad2)"
        stroke-width="2"
        opacity="0.6"
        class="animate-spin-slow"
        style="animation-duration: 10s"
      />
      <circle
        cx="400"
        cy="200"
        :r="radius2"
        fill="none"
        stroke="url(#grad2)"
        stroke-width="2"
        opacity="0.4"
        class="animate-spin-slow"
        style="animation-duration: 15s; animation-direction: reverse"
      />

      <!-- 动态点 -->
      <circle
        v-for="(point, index) in points"
        :key="index"
        :cx="point.x"
        :cy="point.y"
        :r="point.radius"
        :fill="point.color"
        filter="url(#glow)"
        :opacity="point.opacity"
      >
        <animate
          attributeName="r"
          :values="point.radius + ';' + point.radius * 1.5 + ';' + point.radius"
          :dur="point.duration + 's'"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          :values="
            point.opacity + ';' + point.opacity * 1.5 + ';' + point.opacity
          "
          :dur="point.duration + 's'"
          repeatCount="indefinite"
        />
      </circle>

      <!-- 连接线 -->
      <line
        v-for="(line, index) in lines"
        :key="'line' + index"
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
        stroke="url(#grad1)"
        stroke-width="1"
        opacity="0.3"
      >
        <animate
          attributeName="opacity"
          values="0.1;0.5;0.1"
          :dur="2 + Math.random() * 2 + 's'"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const svgRef = ref<SVGSVGElement | null>(null)
const radius1 = ref(80)
const radius2 = ref(120)

interface Point {
  x: number
  y: number
  radius: number
  color: string
  opacity: number
  duration: number
}

const points = ref<Point[]>([])

const hexagonPoints = computed(() => {
  const centerX = 400
  const centerY = 200
  const radius = 60
  const points: string[] = []

  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    points.push(`${x},${y}`)
  }

  return points.join(' ')
})

const lines = ref<Array<{ x1: number; y1: number; x2: number; y2: number }>>([])

onMounted(() => {
  // 生成随机点
  for (let i = 0; i < 30; i++) {
    points.value.push({
      x: Math.random() * 800,
      y: Math.random() * 400,
      radius: 2 + Math.random() * 3,
      color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff',
      opacity: 0.4 + Math.random() * 0.6,
      duration: 1 + Math.random() * 2,
    })
  }

  // 生成连接线
  for (let i = 0; i < 20; i++) {
    lines.value.push({
      x1: Math.random() * 800,
      y1: Math.random() * 400,
      x2: Math.random() * 800,
      y2: Math.random() * 400,
    })
  }
})
</script>
