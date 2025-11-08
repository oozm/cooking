<template>
  <div
    class="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:scale-105 transition-all duration-300 glow-effect group"
    :style="{ animationDelay: index * 0.1 + 's' }"
  >
    <div class="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {{ card.icon }}
    </div>
    <h3 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gradient">
      {{ card.title }}
    </h3>
    <p class="text-sm sm:text-base text-gray-300">
      {{ card.description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  card: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})
</script>

