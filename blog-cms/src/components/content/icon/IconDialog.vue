<script setup lang="ts">
const icons = ref<string[]>([])

const regex = /\.ri-(.*)::before/;
for (let i = 0; i < document.styleSheets.length; i++) {
  const styleSheet = document.styleSheets[i]
  for (let j = 0; j < styleSheet.cssRules.length; j++) {
    const classRule = styleSheet.cssRules[j] as CSSStyleRule
    const match = classRule.selectorText?.match(regex)
    if (match) {
      const middlePart = match[1]
      icons.value.push(middlePart)
    }
  }
}

</script>

<template>
  <el-button type="primary">图标</el-button>
</template>