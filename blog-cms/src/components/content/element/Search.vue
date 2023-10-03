<script setup lang="ts">
import { ElInput, ElButton } from 'element-plus'
const emit = defineEmits<{
  (event: "update:value", searchForm: any): void;
}>();

export interface SearchItem {
  type: string;
  label?: string;
  filed?: string;
  value?: string;
  props?: { [key: string]: any };
  events?: { [key: string]: Function }
}

const props = withDefaults(defineProps<{
  searchList: Array<SearchItem>,
  searchForm: { [key: string]: any },
}>(), {
  searchList: () => [],
})

const innerForm = computed({
  get() {
    return props.searchForm;
  },
  set(val) {
    emit('update:value', val);
  },
});


const renderComp = computed(() => (type: string) => {
  switch (type) {
    case 'input':
      return ElInput
    case 'button':
      return ElButton
  }
})


</script>

<template>
  <el-form :inline="true" :model="innerForm">
    <el-form-item v-for="(searchItem, index) in searchList" :key="index" :label="searchItem.label">
      <component :is="renderComp(searchItem.type)" v-model="innerForm[`${searchItem.filed}`]" v-bind="searchItem?.props"
        v-on="searchItem.events || {}">
        {{ searchItem?.value }}</component>
    </el-form-item>
  </el-form>
</template>