<script setup lang="ts">
import { updateUser, createUser, type UpdateUserParmas } from '@/api/services/user'
import { useFormDialog } from '@/hooks/useDialog'
import { type UploadFile } from 'element-plus'

const emit = defineEmits<{
  (event: "success"): void;
}>()

const { dialogVisible, title, isEdit, ruleFormRef, ruleForm, rules, close, create, update } = useFormDialog<UpdateUserParmas>({
  formData: {
    id: -1,
    avatar: "",
    nickname: "",
    username: "",
    password: ""
  },
  formRule: {
    username: [{ required: true, trigger: "blur", message: "用户名不能为空!" }],
    password: [{ required: true, trigger: "blur", message: "密码不能为空!" }],
    nickname: [{ required: true, trigger: "blur", message: "昵称不能为空!" }],
    avatar: [{ required: true, trigger: "blur", message: "头像不能为空!" }],
  }
})

const onChange = (uploadFile: UploadFile) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    const srcData = fileReader.result as string;
    ruleForm.avatar = srcData
  }
  fileReader.readAsDataURL(uploadFile.raw as File)
}

const instance = getCurrentInstance();
const onSubmit = async () => {
  ruleFormRef.value.validate().then(async (valid: boolean) => {
    if (valid) {
      try {
        if (isEdit.value) {
          await updateUser(ruleForm)
        } else {
          await createUser(ruleForm)
        }
        instance?.proxy?.$message({
          type: "success",
          message: "操作成功",
        });
        close()
        emit('success')
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
      <el-form-item label="头像" prop="avatar">
        <el-upload action="" :auto-upload="false" class="avatar-uploader" :show-file-list="false" :on-change="onChange">
          <img v-if="ruleForm.avatar" :src="ruleForm.avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname" />
      </el-form-item>
      <template v-if="!isEdit">
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>