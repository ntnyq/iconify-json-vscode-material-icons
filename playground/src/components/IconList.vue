<script lang="ts" setup>
import icons from '../assets/icons.json'
import IconItem from './IconItem.vue'
</script>

<template>
  <div
    class="relative mx-auto max-w-1200px flex flex-wrap justify-center gap-4"
  >
    <IconItem
      v-for="icon in icons"
      :key="icon"
      :icon="icon"
    />
  </div>
</template>
