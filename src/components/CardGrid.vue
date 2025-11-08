<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
    <FeatureCard
      v-for="(card, index) in cards"
      :key="index"
      :card="card"
      :index="index"
    />
  </section>
</template>

<script setup>
import FeatureCard from './FeatureCard.vue'

defineProps({
  cards: {
    type: Array,
    required: true
  }
})
</script>

