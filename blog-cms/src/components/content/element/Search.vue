<script setup lang="ts">
import { ElInput, ElButton, ElUpload } from 'element-plus'
const emit = defineEmits<{
  (event: "update:value", searchForm: any): void;
}>();

export interface SearchItem {
  type: string;
  label?: string;
  filed?: string;
  value?: string;
  props?: { [key: string]: any };
  events?: { [key: string]: Function };
  children?: SearchItem[];
}

const props = withDefaults(defineProps<{
  searchList: Array<SearchItem>,
  searchForm?: { [key: string]: any },
}>(), {
  searchList: () => [] as SearchItem[],
})

const innerForm = computed({
  get() {
    return props.searchForm || {};
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
    case 'upload':
      return ElUpload
  }
})


</script>

<template>
  <el-form :inline="true" :model="innerForm">
    <el-form-item v-for="(searchItem, index) in searchList" :key="index" :label="searchItem.label">
      <component :is="renderComp(searchItem.type)" v-model="innerForm[`${searchItem.filed}`]" v-bind="searchItem?.props"
        v-on="searchItem.events || {}">
        {{ searchItem?.value }}
        <component v-for="elem in searchItem.children" :is="renderComp(elem.type)" v-model="innerForm[`${elem.filed}`]"
          v-bind="elem?.props" v-on="elem.events || {}">{{ elem?.value }}</component>
      </component>
    </el-form-item>
  </el-form>
</template>