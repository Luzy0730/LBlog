<script setup lang="ts">
// document.title = '未找到页面'
const props = defineProps({
  loading: Boolean
})
</script>

<template>
  <div class="ui segment m-box">
    <h2 class="ui header m-center">{{ props.loading ? '加载中' : '未找到' }}</h2>
    <span>{{ props.loading ? '加载中，请耐心等待...' : '抱歉，没有你要找的文章。' }}</span>
  </div>
</template>