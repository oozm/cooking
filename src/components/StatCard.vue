<template>
  <div
    class="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:scale-110 transition-transform duration-300 glow-effect"
  >
    <div class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-2">
      {{ stat.value }}
    </div>
    <div class="text-xs sm:text-sm lg:text-base text-gray-300">
      {{ stat.label }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  stat: {
    type: Object,
    required: true
  }
})
</script>

