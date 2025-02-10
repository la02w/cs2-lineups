<template>
  <div class="">
    <h2 class="text-2xl font-bold mb-2">{{ itemName }}</h2>
    <div class="columns-2">
      <img
        v-for="i in itemImage"
        :key="i"
        :src="i"
        class="w-full h-auto mb-4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  itemName: string
  itemImage: string[]
}>()
</script>

<style scoped>
/* 由于使用了Tailwind CSS，这里可能不需要额外的样式，除非你有特定的样式需求 */
</style>
