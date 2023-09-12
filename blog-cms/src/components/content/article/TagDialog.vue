<script lang="ts" setup>
import { ref } from "vue";
import { type FormRules } from "element-plus";
import { addArticleTag, updateArticleTag } from "@/api/services/article";

const emit = defineEmits<{
  (event: "confirm"): void;
}>();

const instance = getCurrentInstance();

const dialogVisible = ref(false);

const ruleFormRef = ref();
const ruleForm = reactive({
  id: null,
  name: "",
  color: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  name: [{ required: true, trigger: "blur", message: "名称不能为空!" }],
  color: [{ required: true, trigger: "blur", message: "颜色不能为空!" }],
});

const create = () => {
  dialogVisible.value = true;
};

const update = (tag: IArticleTag) => {
  dialogVisible.value = true;
  nextTick(() => {
    Object.assign(ruleForm, tag);
  });
};

const close = () => {
  ruleFormRef.value.resetFields();
};

const onSubmit = () => {
  ruleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        if (ruleForm.id) {
          await updateArticleTag(ruleForm);
        } else {
          await addArticleTag(ruleForm);
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
  <el-dialog v-model="dialogVisible" title="Tips" width="30%" @close="close">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px">
      <el-form-item label="标签名称：" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="标签颜色：" prop="color">
        <el-input v-model="ruleForm.color" />
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
