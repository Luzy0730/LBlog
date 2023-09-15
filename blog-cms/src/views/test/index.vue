<script setup lang="ts">
const html = ref('<pre><code class="language-go">console.log(1)</code></pre><p><br></p>')

const codeRef = ref()
const instance = getCurrentInstance()
onMounted(() => {
  // instance?.proxy?.$prism.highlightElement(codeRef.value)
})
</script>
<template>
  <el-card>
    <div ref="codeRef" class="line-numbers" v-html="html"></div>
  </el-card>
</template>
