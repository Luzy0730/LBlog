<script lang="ts" setup>
import { ref } from "vue";
import { type FormRules } from "element-plus";
import { queryCategorySimple } from "@/api/services/category";
import { queryTagsSimple } from "@/api/services/tag";
import { queryArticleDetail } from "@/api/services/article";

const emit = defineEmits<{
  (event: "confirm"): void;
}>();

const instance = getCurrentInstance();

const dialogVisible = ref(false);

const ruleFormRef = ref();

const title = ref("新增");

const ruleForm = reactive({
  id: -1,
  title: "",
  categoryId: undefined,
  description: "",
  content: "",
  tags: []
});

const rules = reactive<FormRules<typeof ruleForm>>({
  title: [{ required: true, trigger: "blur", message: "标题不能为空!" }],
  categoryId: [{ required: true, trigger: "blur", message: "请选择分类!" }],
});

const categoryOptions = ref<Pick<ICategory, "id" | "name">[]>([])
const tagOptions = ref<Pick<ITag, "id" | "name">[]>([])

const open = () => {
  dialogVisible.value = true;
  queryCategorySimple().then(res => {
    categoryOptions.value = res.data
  })
  queryTagsSimple().then(res => {
    tagOptions.value = res.data
  })
}

const close = () => {
  ruleFormRef.value.resetFields();
};

const create = () => {
  title.value = "新增";
  open()
};

const update = (category: ICategory) => {
  title.value = "编辑";
  open()
  nextTick(() => {
    Object.assign(ruleForm, category);
    queryArticleDetail({ id: ruleForm.id }).then(res => {
      Object.assign(ruleForm, res.data)
    })

  });
};


const onSubmit = () => {
  ruleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {

    }
  });
};

defineExpose({
  create,
  update,
});

</script>

<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="close">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <p v-html="ruleForm.content"></p>
      </el-form-item>
      <el-form-item label="分类：" prop="categoryId">
        <el-select v-model="ruleForm.categoryId" placeholder="请选择分类">
          <el-option v-for="category in categoryOptions" :key="category.id" :label="category.name" :value="category.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签：" prop="tags">
        <el-select v-model="ruleForm.tags" placeholder="请选择标签" multiple>
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