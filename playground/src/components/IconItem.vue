<script lang="ts" setup>
import { waitFor } from '@ntnyq/utils'
import { useClipboard } from '@vueuse/core'
import { shallowRef } from 'vue'

const props = defineProps<{
  icon: string
}>()

const { copy } = useClipboard({
  legacy: true,
})

const hasCopied = shallowRef(false)

async function handleCopy() {
  await copy(props.icon)
  hasCopied.value = true
  await waitFor(1e3)
  hasCopied.value = false
}
</script>

<template>
  <div
    @click="handleCopy"
    class="relative flex flex-col cursor-pointer items-center gap-4 rounded-lg p-4 text-5xl transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
  >
    <div :class="`i-vscode-material-icons:${icon}`" />
    <span
      v-if="hasCopied"
      class="absolute right-0 top-0 text-lg"
    >
      ✅
    </span>
  </div>
</template>
