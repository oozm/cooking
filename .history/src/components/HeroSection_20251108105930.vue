<template>
  <section class="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 glow-effect">
    <div class="text-center space-y-4 sm:space-y-6">
      <h2 class="text-2xl sm:text-3xl lg:text-5xl font-bold text-gradient">
        {{ title }}
      </h2>
      <p class="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto">
        {{ description }}
      </p>
      <div class="flex flex-wrap justify-center gap-4 mt-6 sm:mt-8">
        <button 
          v-for="(btn, index) in buttons"
          :key="index"
          :class="btn.class"
          @click="btn.onClick"
        >
          {{ btn.text }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '未来科技体验'
  },
  description: {
    type: String,
    default: '探索无限可能，感受科技魅力。这是一个充满动感与创新的数字空间。'
  },
  buttons: {
    type: Array,
    default: () => [
      {
        text: '开始探索',
        class: 'px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-cyan-500/50',
        onClick: () => {}
      },
      {
        text: '了解更多',
        class: 'px-6 sm:px-8 py-3 sm:py-4 glass rounded-full font-semibold hover:scale-105 transition-transform duration-300',
        onClick: () => {}
      }
    ]
  }
})
</script>

