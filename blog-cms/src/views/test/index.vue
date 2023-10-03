<script setup lang="ts">
import Search, { type SearchItem } from '@/components/content/element/Search.vue';

const searchForm = reactive<{ [key: string]: any }>({
  user: '',
  region: '',
  date: '',
})

const searchList = reactive<SearchItem[]>([
  { label: 'text', type: 'input', filed: 'user', props: { placeholder: 'fuck' } },
  { type: 'button', value: '搜索', events: { click: () => console.log(searchForm) } }
])

</script>
<template>
  <Search :searchForm="searchForm" :searchList="searchList" />
</template>