<template>
  <footer class="mt-12 sm:mt-16 lg:mt-20 text-center text-sm sm:text-base text-gray-400">
    <p>{{ copyright }}</p>
  </footer>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  copyright?: string
}>(), {
  copyright: '© 2024 Tech Space. 探索无限可能'
})
</script>

