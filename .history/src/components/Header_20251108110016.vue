<template>
  <header class="mb-8 sm:mb-12 lg:mb-16">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl sm:text-4xl lg:text-6xl font-bold text-gradient animate-glow">
        TECH SPACE
      </h1>
      <button
        @click="toggleDarkMode"
        class="glass px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:scale-110 transition-transform duration-300 glow-effect"
      >
        <span class="text-xl sm:text-2xl">{{ isDark ? '🌙' : '☀️' }}</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDarkMode, initDarkMode } = useDarkMode()

onMounted(() => {
  initDarkMode()
})
</script>

