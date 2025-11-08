<template>
  <div class="min-h-screen relative overflow-hidden bg-white dark:bg-black">
    <!-- 主容器 -->
    <div
      class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
    >
      <Header />

      <!-- 主要内容区域 - 纯视觉化 -->
      <main class="space-y-6 sm:space-y-8 lg:space-y-12">
        <!-- 3D场景展示区域 -->
        <section
          class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
        >
          <div
            class="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 glow-effect h-64 sm:h-80 lg:h-96"
          >
            <Scene3D />
          </div>
          <div
            class="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 glow-effect h-64 sm:h-80 lg:h-96"
          >
            <Scene3D />
          </div>
        </section>

        <!-- SVG 科技图形展示 -->
        <section
          class="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 glow-effect"
        >
          <TechSVG />
        </section>

        <!-- Canvas 交互式图形 -->
        <section
          class="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 glow-effect"
        >
          <InteractiveCanvas />
        </section>
      </main>

      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Scene3D from '../components/Scene3D.vue'
import TechSVG from '../components/TechSVG.vue'
import InteractiveCanvas from '../components/InteractiveCanvas.vue'
import Footer from '../components/Footer.vue'
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.glass {
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>
