<template>
  <header class="mb-8 sm:mb-12 lg:mb-16">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
      <h1
        class="text-3xl sm:text-4xl lg:text-6xl font-bold text-gradient animate-glow"
      >
        TECH SPACE
      </h1>
      <div class="flex items-center gap-4">
        <!-- 导航菜单 -->
        <nav class="flex flex-wrap gap-2 sm:gap-4">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="glass px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base hover:scale-110 transition-transform duration-300 glow-effect"
            :class="{ 'bg-gradient-to-r from-cyan-500 to-blue-600': $route.path === item.path }"
          >
            {{ item.name }}
          </router-link>
        </nav>
        <!-- 暗黑模式切换 -->
        <button
          @click="toggleDarkMode"
          class="glass px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:scale-110 transition-transform duration-300 glow-effect"
        >
          <span class="text-xl sm:text-2xl">{{ isDark ? '🌙' : '☀️' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDarkMode, initDarkMode } = useDarkMode()

const menuItems = [
  { path: '/', name: 'Home' },
  { path: '/keyframes', name: 'Keyframes' },
  { path: '/particles', name: 'Particles' },
  { path: '/geometry', name: 'Geometry' },
  { path: '/shaders', name: 'Shaders' },
]

onMounted(() => {
  initDarkMode()
})
</script>
