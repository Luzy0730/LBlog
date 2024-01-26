<script setup lang="ts">
const { pagination } = defineProps<{
  pagination: IPagination
}>();

const emit = defineEmits<{
  (event: "current-change", pageNum: number): void;
}>();

const onCurrentChange = (pageNum: number) => {
  emit('current-change', pageNum)
}
</script>
<template>
  <div class="ui bottom" style="display: flex;justify-content: center;">
    <el-pagination background layout="prev, pager, next" :current-page="pagination.pageSize" :page-size="pagination.pageSize" :total="pagination.total" @current-change="onCurrentChange" />
  </div>
</template>