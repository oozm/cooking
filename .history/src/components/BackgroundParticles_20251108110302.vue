<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <div
      v-for="i in 50"
      :key="i"
      class="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-600/20 animate-float"
      :style="{
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        width: Math.random() * 20 + 5 + 'px',
        height: Math.random() * 20 + 5 + 'px',
        animationDelay: Math.random() * 6 + 's',
        animationDuration: Math.random() * 4 + 4 + 's',
      }"
    ></div>
  </div>
</template>

<script setup>
// 背景粒子动画组件
</script>
