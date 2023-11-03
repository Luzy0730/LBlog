<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { type IEditorConfig } from '@wangeditor/editor'
import { type ShallowRef } from "vue";
import { uploadOSS } from '@/api/services/oss'

const props = withDefaults(defineProps<{
  height: number,
  placeholder: string
}>(), { height: 500, placeholder: '请输入内容...' })

const editorRef = shallowRef();
const toolbarConfig = {};
const valueHtml = ref("");
const valueHtmlPreview = ref("")
// 初始化 MENU_CONF 属性
type InsertFnType = (url: string, alt: string, href: string) => void
const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {
    uploadImage: {
      async customUpload(file: File, insertFn: InsertFnType) {  // TS 语法
        const { data: url } = await uploadOSS({
          name: `image/${file.name}-${new Date().getTime()}`,
          file
        })
        insertFn(url, url, url)
      }
    },
  },
  placeholder: props.placeholder
}

const handleCreated = (editor: ShallowRef<any>) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

watch(() => valueHtml.value, function (val) {
  valueHtmlPreview.value = val
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
  <el-scrollbar :height="height">
    <Toolbar class="border-b-[1px] border-solid border-gray-400" :editor="editorRef" :defaultConfig="toolbarConfig"
      mode="default" />
    <Editor class="typo overflow-y-hidden " v-model="valueHtml" :defaultConfig="editorConfig" mode="default"
      @onCreated="handleCreated" />
  </el-scrollbar>
</template>

<style scoped>
.el-card {
  height: 100%;
}
</style>
