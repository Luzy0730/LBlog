<script setup lang="ts">
const { name, size, color } = defineProps<{
  name: string,
  size?: string | number,
  color?: string
}>()

const iconStyle = computed(() => {
  const fontSize = size ? `${size}px` : ''
  return { fontSize, color }
})

</script>

<template>
  <i :class="['remixicon', 'ri-1x', `ri-${name}`]" :style="iconStyle"></i>
</template>