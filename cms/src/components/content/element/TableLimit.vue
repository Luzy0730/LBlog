<script lang="ts" setup>
const emit = defineEmits<{
  (event: "update:pagination", pagination: IPagination | undefined): void;
  (event: "pagination-change", pagination: IPagination): void;
}>();

const props = withDefaults(defineProps<{
  tableField?: Array<any>,
  tableData?: Array<any>,
  pagination?: IPagination,
  loading?:Boolean
}>(), {
  tableField: () => [],
  tableData: () => [],
})

const innerPagination = computed({
  get() {
    return props.pagination;
  },
  set(val) {
    emit('update:pagination', val);
  },
});

const handleSizeChange = () => {
  innerPagination.value!.page = 1;
  emit('pagination-change', innerPagination.value as IPagination);
}
const handleCurrentChange = () => {
  emit('pagination-change', innerPagination.value as IPagination);
}
</script>
<template>
  <div class="flex flex-col h-full">
    <slot name="search"></slot>
    <el-table :data="tableData" class="grow" v-loading="loading">
      <el-table-column :prop="field.prop" :label="field.label" v-bind="field.args" :class="field.classNameList"
        v-for="field in tableField">
        <template #default="data" v-if="field.slotKey">
          <slot :name="field.slotKey" v-bind="data"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="innerPagination" class="mt-3 ml-auto" v-model:current-page="innerPagination.page"
      v-model:page-size="innerPagination.pageSize" :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper" :total="innerPagination.total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>