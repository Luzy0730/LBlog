<script setup lang="ts">
import WangEditor from "./WangEditor.vue";

const emit = defineEmits<{
  (event: "confirm", content: {
    html: string,
    length: number
  }): void;
}>();

const wangEditorRef = ref()

const onSubmit = () => {
  const content = wangEditorRef.value.getContent()
  emit('confirm', content)
  dialogVisible.value = false;
};

const dialogVisible = ref(false);

const open = (html = "") => {
  dialogVisible.value = true;
  nextTick(() => {
    wangEditorRef.value.setContent(html)
  })
};

defineExpose({
  open,
});
</script>
<template>
  <el-dialog v-model="dialogVisible" title="编辑器" width="90%" destroy-on-close>
    <WangEditor ref="wangEditorRef" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>