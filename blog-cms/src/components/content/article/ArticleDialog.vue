<script lang="ts" setup>
import { ref } from "vue";
import { useFormDialog } from '@/hooks/useDialog'
import { queryCategorySimple } from "@/api/services/category";
import { queryTagsSimple } from "@/api/services/tag";
import { queryArticleDetail, createArticle, updateArticle, type IUpdateArticleData } from "@/api/services/article";
import WangEditorDialog from "@/components/content/editor/WangEditorDialog.vue";

const emit = defineEmits<{
  (event: "confirm"): void;
}>();

const wangEditorDialogRef = ref();

const instance = getCurrentInstance();

const categoryOptions = ref<Pick<ICategory, "id" | "name">[]>([]);
const tagOptions = ref<Pick<ITag, "id" | "name">[]>([]);
const requestOptions = () => {
  queryCategorySimple().then((res) => {
    categoryOptions.value = res.data;
  });
  queryTagsSimple().then((res) => {
    tagOptions.value = res.data;
  });
}
const { dialogVisible, title, ruleFormRef, ruleForm, rules, close, create, update } = useFormDialog<IUpdateArticleData>({
  formData: {
    id: -1,
    title: "",
    categoryId: undefined,
    description: "",
    content: "",
    tagIds: [],
    words: 0
  },
  formRule: {
    title: [{ required: true, trigger: "blur", message: "标题不能为空!" }],
    categoryId: [{ required: true, trigger: "blur", message: "请选择分类!" }],
  },
  afterCreated() {
    requestOptions()
  },
  afterUpdated() {
    requestOptions()
    queryArticleDetail({ id: ruleForm.id }).then((res) => {
      Object.assign(ruleForm, res.data);
      nextTick(() => {
        instance?.proxy?.$prism.highlightAll();
      });
    });
  }
})

// 提交
const onSubmit = () => {
  ruleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const api = ruleForm.id === -1 ? createArticle : updateArticle
      try {
        await api({
          ...ruleForm,
          tagIds: (ruleForm.tagIds as number[]).join(',')
        })
        instance?.proxy?.$message({
          type: "success",
          message: "操作成功",
        });
        emit("confirm");
        dialogVisible.value = false;
      } catch (error) {
        instance?.proxy?.$message({
          type: "error",
          message: "操作失败",
        });
      }
    }
  });
};

// 修改文本
let propEditing: "content" | "description";
const onEditContent = (prop: "content" | "description") => {
  propEditing = prop;
  wangEditorDialogRef.value.open(ruleForm[propEditing]);
};

// 获取WangEditor返回的html内容
const onGetHtml = (content: { html: string, length: number }) => {
  ruleForm[propEditing] = content.html;
  if (propEditing === 'content') {
    ruleForm.words = content.length
  }
};

defineExpose({
  create,
  update,
});
</script>

<template>
  <WangEditorDialog ref="wangEditorDialogRef" @confirm="onGetHtml" />
  <el-dialog v-model="dialogVisible" :title="title" @close="close">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="cursor-pointer max-w-full" @click="onEditContent('content')">
          <el-button type="primary" v-if="!ruleForm.content">新建</el-button>
          <el-card v-else class="typo p-2 overflow-y-auto max-h-[600px] max-w-full" v-html="ruleForm.content"></el-card>
        </div>
      </el-form-item>
      <el-form-item label="文章描述" prop="description">
        <div class="cursor-pointer max-w-full" @click="onEditContent('description')">
          <el-button type="primary" v-if="!ruleForm.description">新建</el-button>
          <el-card v-else class="typo p-2 overflow-y-auto max-h-[300px] max-w-full"
            v-html="ruleForm.description"></el-card>
        </div>
      </el-form-item>
      <el-form-item label="分类：" prop="categoryId">
        <el-select v-model="ruleForm.categoryId" placeholder="请选择分类">
          <el-option v-for="category in categoryOptions" :key="category.id" :label="category.name" :value="category.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签：" prop="tagIds">
        <el-select class="w-full" v-model="ruleForm.tagIds" placeholder="请选择标签" multiple>
          <el-option v-for="tag in tagOptions" :key="tag.id" :label="tag.name" :value="tag.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
