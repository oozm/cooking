<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import LegendaryCursor from 'legendary-cursor'
import { createBackground } from './utils/background'

// 在组件挂载后初始化
onMounted(() => {
  // 初始化传奇光标
  LegendaryCursor.init({
    lineSize: 0.15,
    opacityDecrement: 0.55,
    speedExpFactor: 0.8,
    lineExpFactor: 0.6,
    sparklesCount: 65,
    maxOpacity: 0.99,
  })

  // 创建背景粒子效果
  createBackground({
    containerId: 'app',
    particleSize: 90,
    rotationSpeed: 0.003,
    timeSpeed: 0.5,
  })
})
</script>
