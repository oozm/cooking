<template>
  <section class="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 glow-effect">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
      <div class="space-y-4 sm:space-y-6">
        <h3 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient">
          {{ title }}
        </h3>
        <p class="text-sm sm:text-base lg:text-lg text-gray-300">
          {{ description }}
        </p>
        <ul class="space-y-3 sm:space-y-4">
          <li 
            v-for="(feature, index) in features"
            :key="index"
            class="flex items-center gap-3 sm:gap-4 text-sm sm:text-base"
          >
            <span class="text-2xl animate-spin-slow">✨</span>
            <span>{{ feature }}</span>
          </li>
        </ul>
      </div>
      <div class="relative">
        <div class="aspect-square rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-600/20 flex items-center justify-center animate-pulse-slow">
          <div class="w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-spin-slow opacity-80"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '创新科技'
  },
  description: {
    type: String,
    default: '融合前沿技术与优雅设计，打造极致用户体验。每一个细节都经过精心雕琢，每一处交互都充满惊喜。'
  },
  features: {
    type: Array,
    required: true
  }
})
</script>

