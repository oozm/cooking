<template>
  <div
    ref="containerRef"
    class="fixed inset-0 w-full h-full pointer-events-none"
    :style="{ zIndex: 0 }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { createBackground } from '../utils/background'
import type { BackgroundInstance } from '../utils/background'

const containerRef = ref<HTMLDivElement | null>(null)
let backgroundInstance: BackgroundInstance | null = null

onMounted(() => {
  if (!containerRef.value) return

  // 创建一个唯一的容器ID
  const containerId = `background-${Date.now()}`
  containerRef.value.id = containerId

  // 使用 background.ts 创建背景
  backgroundInstance = createBackground({
    containerId,
    particleSize: 90,
    rotationSpeed: 0.003,
    timeSpeed: 0.5,
  })

  // 确保渲染器DOM元素有正确的样式
  if (backgroundInstance && containerRef.value) {
    const canvas = backgroundInstance.renderer.domElement
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
  }
})

onUnmounted(() => {
  if (backgroundInstance) {
    backgroundInstance.cleanup()
    backgroundInstance = null
  }
})
</script>
