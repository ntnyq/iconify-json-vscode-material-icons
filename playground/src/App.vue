<script lang="ts" setup>
import IconList from './components/IconList.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="relative h-screen flex flex-col">
    <Navbar />
    <main class="h-[calc(100vh-var(--h-navbar))] of-y-auto p-4">
      <IconList />
    </main>
  </div>
</template>
