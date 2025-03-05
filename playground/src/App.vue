<script lang="ts" setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="relative h-screen flex flex-col">
    <Navbar />
    <main class="h-[calc(100vh-var(--h-navbar))]">
      <div class="h-full flex-center">
        <div class="i-vscode-material-icons:vue text-5xl" />
      </div>
    </main>
  </div>
</template>
