<script setup lang="ts">
import { useFormDialog } from '@/hooks/useDialog'
import { updatePassword, type UpdatePasswordParmas } from '@/api/services/user'

const { dialogVisible, title, ruleFormRef, ruleForm, rules, close, create, update } = useFormDialog<UpdatePasswordParmas>({
  formData: {
    id: -1,
    password: "",
    newPassword: "",
  },
  formRule: {
    password: [{ required: true, trigger: "blur", message: "旧密码不能为空!" }],
    newPassword: [{ required: true, trigger: "blur", message: "新密码不能为空!" }],
  }
})

const instance = getCurrentInstance();
const onSubmit = async () => {
  ruleFormRef.value.validate().then(async (valid: boolean) => {
    if (valid) {
      try {
        await updatePassword(ruleForm)
        instance?.proxy?.$message({
          type: "success",
          message: "操作成功",
        });
        close()
      } catch (error) {
        instance?.proxy?.$message({
          type: "error",
          message: "操作失败",
        });
      }

    }
  })
}

defineExpose({
  create, update
})
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="close" width="300px">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
      <el-form-item label="旧密码" prop="password">
        <el-input @keydown.enter="onSubmit" type="password" placeholder="请输入旧密码" v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input @keydown.enter="onSubmit" type="password" placeholder="请输入新密码" v-model="ruleForm.newPassword" />
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