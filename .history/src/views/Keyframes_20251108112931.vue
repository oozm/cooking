<template>
  <div class="min-h-screen relative overflow-hidden bg-white dark:bg-black">
    <WaveBackground />
    <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <Header />
      <main class="mt-8">
        <div class="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 glow-effect h-[600px] sm:h-[700px] lg:h-[800px]">
          <KeyframesAnimation />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import WaveBackground from '../components/WaveBackground.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import KeyframesAnimation from '../components/KeyframesAnimation.vue'
</script>

