<template>
  <div class="h-screen relative overflow-hidden bg-white dark:bg-black flex flex-col">
    <div
      class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col flex-1 min-h-0"
    >
      <Header />
      <main class="flex-1 overflow-hidden mt-4 sm:mt-6 lg:mt-8">
        <div
          class="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 glow-effect h-full"
        >
          <ParticleSystem />
        </div>
      </main>
      <Footer class="mt-4 sm:mt-6 lg:mt-8" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ParticleSystem from '../components/ParticleSystem.vue'
</script>
