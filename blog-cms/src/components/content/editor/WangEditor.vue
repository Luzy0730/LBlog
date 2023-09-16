<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { type ShallowRef } from "vue";

const instance = getCurrentInstance()
const editorRef = shallowRef();
const toolbarConfig = {};
const valueHtml = ref("");
const valueHtmlPreview = ref("")
const editorConfig = { placeholder: "请输入内容..." };
const handleCreated = (editor: ShallowRef<any>) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

watch(() => valueHtml.value, function (val) {
  valueHtmlPreview.value = val
  nextTick(() => {
    instance?.proxy?.$prism.highlightAll()
  })
})

const getContent = () => {
  let html = "";
  let length = 0
  if (editorRef.value.getText().trim()) {
    html = valueHtmlPreview.value;
    length = editorRef.value.getText().length
  }
  return { html, length }
}

const setContent = (html: string) => {
  valueHtml.value = html
}

defineExpose({
  setContent,
  getContent
})

</script>
<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <Toolbar class="border-b-[1px] border-solid border-gray-400" :editor="editorRef" :defaultConfig="toolbarConfig"
          mode="default" />
        <Editor class="typo overflow-y-hidden h-[500px]" v-model="valueHtml" :defaultConfig="editorConfig" mode="default"
          @onCreated="handleCreated" />
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="overflow-y-auto">
        <div class="typo h-[500px]" v-html="valueHtmlPreview"></div>
      </el-card></el-col>
  </el-row>
</template>

<style scoped>
.el-card {
  height: 100%;
}
</style>
