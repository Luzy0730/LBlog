<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { type ShallowRef } from "vue";

const emit = defineEmits<{
  (event: "confirm", content: {
    html: string,
    length: number
  }): void;
}>();

const instance = getCurrentInstance()
const editorRef = shallowRef();
const toolbarConfig = {};

const valueHtml = ref("");
const valueHtmlPreview = ref("")
const editorConfig = { placeholder: "请输入内容..." };
const handleCreated = (editor: ShallowRef<any>) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const onSubmit = () => {
  let content = "";
  if (editorRef.value.getText().trim()) content = valueHtmlPreview.value;
  emit("confirm", {
    html: content,
    length: editorRef.value.getText().length
  });
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

watch(() => valueHtml.value, function (val) {
  valueHtmlPreview.value = val
  nextTick(() => {
    instance?.proxy?.$prism.highlightAll()
  })
})

defineExpose({
  open,
});
</script>
<template>
  <el-dialog v-model="dialogVisible" title="编辑器" width="90%" @close="close" destroy-on-close>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <Toolbar class="border-b-[1px] border-solid border-gray-400" :editor="editorRef" :defaultConfig="toolbarConfig"
            mode="default" />
          <Editor class="typo overflow-y-hidden h-[500px]" v-model="valueHtml" :defaultConfig="editorConfig"
            mode="default" @onCreated="handleCreated" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="overflow-y-auto">
          <div class="typo" v-html="valueHtmlPreview"></div>
        </el-card></el-col>
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
