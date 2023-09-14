<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { type ShallowRef } from "vue";

const emit = defineEmits<{
  (event: "confirm", html: string): void;
}>();

const editorRef = shallowRef();
const toolbarConfig = {};

const valueHtml = ref("");
const editorConfig = { placeholder: "请输入内容..." };
const handleCreated = (editor: ShallowRef<any>) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const onSubmit = () => {
  let content = "";
  if (editorRef.value.getText().trim()) content = editorRef.value.getHtml();
  emit("confirm", content);
  dialogVisible.value = false;
};

const dialogVisible = ref(false);

const open = (html = "") => {
  valueHtml.value = html;
  dialogVisible.value = true;
};

const close = () => {
  valueHtml.value = "";
};

defineExpose({
  open,
});
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    title="编辑器"
    width="90%"
    @close="close"
    destroy-on-close
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            mode="default" />
          <Editor
            style="height: 500px; overflow-y: hidden"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            mode="default"
            @onCreated="handleCreated"
        /></el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="overflow-y-auto"
          ><div class="typo" v-html="valueHtml"></div></el-card
      ></el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-card {
  height: 600px;
}
</style>
