<script lang="ts" setup>
import { useFormDialog } from '@/hooks/useDialog'
import { createTag, updateTag } from "@/api/services/tag";

const emit = defineEmits<{
  (event: "confirm"): void;
}>();

const { dialogVisible, title, ruleFormRef, isEdit, ruleForm, rules, close, create, update } = useFormDialog<{
  id: number;
  name: string;
  color: string;
}>({
  formData: {
    id: -1,
    name: "",
    color: "",
  },
  formRule: {
    name: [{ required: true, trigger: "blur", message: "名称不能为空!" }],
    color: [{ required: true, trigger: "blur", message: "颜色不能为空!" }],
  },
})

const instance = getCurrentInstance();


const onSubmit = () => {
  ruleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const api = isEdit.value ? updateTag : createTag
        await api(ruleForm)
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
