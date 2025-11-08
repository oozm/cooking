<template>
  <section class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
    <StatCard
      v-for="(stat, index) in stats"
      :key="index"
      :stat="stat"
    />
  </section>
</template>

<script setup>
import StatCard from './StatCard.vue'

defineProps({
  stats: {
    type: Array,
    required: true
  }
})
</script>

