<script setup lang="ts">
import SearchItem from '@/components/content/element/SearchItem.vue';
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

const props = defineProps<{
  searchItem: SearchItem,
  searchForm?: { [key: string]: any },
}>()

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
  <component :is="renderComp(searchItem.type)" v-model="(innerForm[`${searchItem.filed}`] as any)"
    v-bind="searchItem?.props" v-on="searchItem.events || {}">
    {{ searchItem?.value }}
    <template v-for="child in searchItem.children">
      <SearchItem :search-item="child" :search-form="searchForm" />
    </template>
  </component>
</template>