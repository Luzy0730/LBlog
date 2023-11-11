<script setup lang="ts">
import SearchItem, { type SearchItem as ISearchItem } from '@/components/content/element/SearchItem.vue';
const emit = defineEmits<{
  (event: "update:value", searchForm: any): void;
}>();


const props = withDefaults(defineProps<{
  searchList: Array<ISearchItem>,
  searchForm?: { [key: string]: any },
}>(), {
  searchList: () => [] as ISearchItem[],
})

const innerForm = computed({
  get() {
    return props.searchForm || {};
  },
  set(val) {
    emit('update:value', val);
  },
});

</script>

<template>
  <el-form :inline="true" :model="innerForm">
    <el-form-item v-for="(searchItem, index) in searchList" :key="index" :label="searchItem.label">
      <SearchItem :search-form="searchForm" :search-item="searchItem" />
    </el-form-item>
  </el-form>
</template>