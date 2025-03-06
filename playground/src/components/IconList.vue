<script lang="ts" setup>
import { computed, ref } from 'vue'
import icons from '../assets/icons.json'
import IconItem from './IconItem.vue'

const keyword = ref('')

const filteredIcons = computed(() => {
  if (!keyword.value) return icons
  return icons.filter(icon => icon.includes(keyword.value))
})
</script>

<template>
  <div class="relative mx-auto max-w-1200px">
    <div class="relative mx-auto max-w-720px py-8">
      <label
        class="relative block w-full select-none border border-base rounded pl-6 font-mono shadow transition-all"
        for="search_input"
      >
        <div
          class="i-ri:search-line absolute left-4 top-1/2 text-xl text-#aaa -translate-y-1/2 dark:text-#efefef"
        />
        <input
          v-model="keyword"
          id="search_input"
          type="text"
          class="w-full px-8 py-3 outline-none"
          placeholder="Enter to search ..."
        />
      </label>
    </div>

    <TransitionGroup
      name="fade-group"
      class="relative flex flex-wrap justify-center gap-4"
      tag="div"
    >
      <IconItem
        v-for="icon in filteredIcons"
        :key="icon"
        :icon="icon"
      />
    </TransitionGroup>
  </div>
</template>

<style lang="css">
.fade-group-enter-active,
.fade-group-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}

.fade-group-enter-from,
.fade-group-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-group-move {
  transition: transform 0.5s;
}
</style>
