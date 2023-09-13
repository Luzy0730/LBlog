<script lang="ts" setup>
import { ref } from "vue";
import { type FormRules } from "element-plus";
import { createCategory, updateCategory } from "@/api/services/category";
import IconDialog from "@/components/content/icon/IconDialog.vue";

const emit = defineEmits<{
  (event: "confirm"): void;
}>();

const instance = getCurrentInstance();

const dialogVisible = ref(false);

const ruleFormRef = ref();

const title = ref("新增");
const ruleForm = reactive({
  id: -1,
  name: "",
  color: "",
  icon: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  name: [{ required: true, trigger: "blur", message: "名称不能为空!" }],
  color: [{ required: true, trigger: "blur", message: "颜色不能为空!" }],
  icon: [{ required: true, trigger: "blur", message: "图标不能为空!" }],
});

const create = () => {
  title.value = "新增";
  dialogVisible.value = true;
};

const update = (category: ICategory) => {
  title.value = "编辑";
  dialogVisible.value = true;
  nextTick(() => {
    Object.assign(ruleForm, category);
  });
};

const close = () => {
  ruleFormRef.value.resetFields();
};

const onSubmit = () => {
  ruleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        if (ruleForm.id !== -1) {
          await updateCategory(ruleForm);
        } else {
          await createCategory(ruleForm);
        }
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

defineExpose({
  create,
  update,
});
</script>
<template>
  <el-dialog v-model="dialogVisible" :title="title" width="30%" @close="close">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="分类颜色：" prop="color">
        <el-input v-model="ruleForm.color" />
      </el-form-item>
      <el-form-item label="分类图标：" prop="icon">
        <div class="flex">
          <el-input v-model="ruleForm.icon" class="mr-4" />
          <IconDialog />
        </div>
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
