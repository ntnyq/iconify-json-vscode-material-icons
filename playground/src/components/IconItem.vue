<script lang="ts" setup>
import { waitFor } from '@ntnyq/utils'
import { useClipboard } from '@vueuse/core'
import { pascalCase } from 'uncase'
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
  <div class="relative flex flex-col gap-2 pb-6">
    <div
      @click="handleCopy"
      role="button"
      class="relative cursor-pointer rounded-lg p-4 text-5xl transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
    >
      <div
        :aria-label="`VSCodeMaterialIcon: ${pascalCase(icon)}`"
        :title="pascalCase(icon)"
        :class="`i-vscode-material-icons:${icon}`"
      />

      <span
        v-if="hasCopied"
        class="absolute right-0 top-0 text-lg"
      >
        ✅
      </span>
    </div>

    <h3
      :title="icon"
      class="absolute bottom-0 left-0 w-full truncate text-center text-sm font-medium"
    >
      {{ icon }}
    </h3>
  </div>
</template>
